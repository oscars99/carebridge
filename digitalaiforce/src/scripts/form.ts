/**
 * Contact form: inline validation, URL prefill (?plan= / ?service=),
 * and delivery via (1) a JSON endpoint, (2) Supabase REST, or
 * (3) a pre-filled email as a no-backend fallback. Configure in src/config/site.ts.
 */

type Field = HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;

const messages: Record<string, Partial<Record<keyof ValidityState, string>>> = {
  name: { valueMissing: 'Please enter your name.' },
  email: {
    valueMissing: 'Please enter your email address.',
    typeMismatch: 'Please enter a valid email address, like name@example.com.',
  },
  message: {
    valueMissing: 'Please tell us a little about your business and goals.',
    tooShort: 'Please add a few more details (at least 10 characters).',
  },
};

function errorFor(field: Field): string {
  const v = field.validity;
  if (v.valid) return '';
  const custom = messages[field.name] ?? {};
  for (const key of ['valueMissing', 'typeMismatch', 'tooShort', 'tooLong'] as const) {
    if (v[key]) return custom[key] ?? field.validationMessage;
  }
  return field.validationMessage;
}

function validate(form: HTMLFormElement, field: Field): boolean {
  if (field.type === 'checkbox' || field.type === 'hidden') return true;
  if ('value' in field && typeof field.value === 'string' && field.tagName !== 'SELECT') {
    // Trim whitespace-only answers so "   " doesn't count as filled in.
    if (field.value.trim() === '' && field.value !== '') field.value = '';
  }
  const message = errorFor(field);
  const errorEl = form.querySelector<HTMLElement>(`[data-error-for="${field.name}"]`);
  if (message) field.setAttribute('aria-invalid', 'true');
  else field.removeAttribute('aria-invalid');
  if (errorEl) errorEl.textContent = message;
  return !message;
}

export function initContactForms() {
  document.querySelectorAll<HTMLFormElement>('form[data-contact-form]').forEach((form) => {
    const wrapper = form.parentElement as HTMLElement;
    const status = form.querySelector<HTMLElement>('[data-form-status]');
    const submit = form.querySelector<HTMLButtonElement>('button[type="submit"]');
    const submitLabel = form.querySelector<HTMLElement>('[data-submit-label]');
    const success = wrapper.querySelector<HTMLElement>('[data-form-success]');
    const fields = Array.from(form.querySelectorAll<Field>('input, textarea, select')).filter(
      (f) => f.name && f.name !== 'company_website',
    );

    const { endpoint = '', supabaseUrl = '', supabaseKey = '', supabaseTable = 'leads', email = '' } = form.dataset;

    /* ---------- Prefill from the URL ---------- */
    const params = new URLSearchParams(window.location.search);
    const plan = params.get('plan');
    if (plan) {
      const planField = form.querySelector<HTMLInputElement>('[data-plan-field]');
      const planNote = form.querySelector<HTMLElement>('[data-plan-note]');
      if (planField) planField.value = plan.slice(0, 80);
      if (planNote) {
        planNote.textContent = `You’re asking about: ${plan.slice(0, 80)}`;
        planNote.hidden = false;
      }
    }
    const service = params.get('service');
    if (service) {
      const box = form.querySelector<HTMLInputElement>(`input[data-service-slug="${CSS.escape(service)}"]`);
      if (box) box.checked = true;
    }

    /* ---------- Inline validation ---------- */
    for (const field of fields) {
      field.addEventListener('blur', () => {
        if (field.value) validate(form, field);
      });
      field.addEventListener('input', () => {
        if (field.getAttribute('aria-invalid') === 'true') validate(form, field);
      });
    }

    const setStatus = (text: string, isError = false) => {
      if (!status) return;
      status.textContent = text;
      status.classList.toggle('is-error', isError);
    };

    const setLoading = (loading: boolean) => {
      form.classList.toggle('is-loading', loading);
      if (submit) submit.disabled = loading;
      if (submitLabel) submitLabel.textContent = loading ? 'Sending…' : 'Send my request';
    };

    const showSuccess = (mode: 'sent' | 'mailto') => {
      if (!success) return;
      if (mode === 'mailto') {
        const title = success.querySelector('[data-success-title]');
        const text = success.querySelector('[data-success-text]');
        if (title) title.textContent = 'Almost done — just press send';
        if (text)
          text.textContent = `We opened your email app with your message ready to go. If nothing opened, email us directly at ${email}.`;
      }
      form.hidden = true;
      success.hidden = false;
      success.focus({ preventScroll: false });
    };

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      setStatus('');

      const invalid = fields.filter((f) => !validate(form, f));
      if (invalid.length) {
        setStatus(`Please check the ${invalid.length === 1 ? 'highlighted field' : `${invalid.length} highlighted fields`}.`, true);
        invalid[0].focus();
        return;
      }

      const data = new FormData(form);
      // Bots fill the hidden trap field; pretend everything worked.
      if (String(data.get('company_website') ?? '').trim()) {
        showSuccess('sent');
        return;
      }

      const lead = {
        name: String(data.get('name') ?? '').trim(),
        email: String(data.get('email') ?? '').trim(),
        phone: String(data.get('phone') ?? '').trim(),
        business: String(data.get('business') ?? '').trim(),
        website: String(data.get('website') ?? '').trim(),
        services: data.getAll('services').map(String),
        budget: String(data.get('budget') ?? ''),
        message: String(data.get('message') ?? '').trim(),
        plan: String(data.get('plan') ?? ''),
        page: window.location.pathname,
      };

      // No backend configured: hand off to the visitor's email app.
      if (!endpoint && !(supabaseUrl && supabaseKey)) {
        const details: [string, string][] = [
          ['Name', lead.name],
          ['Email', lead.email],
          ['Phone', lead.phone],
          ['Business', lead.business],
          ['Website', lead.website],
          ['Interested in', lead.services.join(', ')],
          ['Budget', lead.budget],
          ['Plan', lead.plan],
        ];
        const body = [...details.filter(([, value]) => value).map(([label, value]) => `${label}: ${value}`), '', lead.message].join(
          '\n',
        );
        const subject = `New project inquiry from ${lead.name}${lead.business ? ` (${lead.business})` : ''}`;
        window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        showSuccess('mailto');
        return;
      }

      setLoading(true);
      try {
        let response: Response;
        if (endpoint) {
          response = await fetch(endpoint, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ ...lead, services: lead.services.join(', '), _subject: `New inquiry from ${lead.name}` }),
          });
        } else {
          response = await fetch(`${supabaseUrl.replace(/\/$/, '')}/rest/v1/${supabaseTable}`, {
            method: 'POST',
            headers: {
              apikey: supabaseKey,
              Authorization: `Bearer ${supabaseKey}`,
              'Content-Type': 'application/json',
              Prefer: 'return=minimal',
            },
            body: JSON.stringify(lead),
          });
        }
        if (!response.ok) throw new Error(`Request failed with ${response.status}`);
        form.reset();
        showSuccess('sent');
      } catch (error) {
        console.error(error);
        setStatus(`Sorry — something went wrong sending your message. Please try again or email us at ${email}.`, true);
      } finally {
        setLoading(false);
      }
    });
  });
}
