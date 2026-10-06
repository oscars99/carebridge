import { prefersReducedMotion, hasFinePointer } from './motion';

/** Hero word rotator: cycles .rotator__word elements. */
export function initRotator() {
  const rotators = document.querySelectorAll<HTMLElement>('[data-rotator]');
  if (!rotators.length || prefersReducedMotion()) return;

  rotators.forEach((rotator) => {
    const words = Array.from(rotator.querySelectorAll<HTMLElement>('.rotator__word'));
    if (words.length < 2) return;
    let index = 0;
    let timer: number | undefined;

    const next = () => {
      const current = words[index];
      index = (index + 1) % words.length;
      const upcoming = words[index];
      current.classList.remove('is-active');
      current.classList.add('is-leaving');
      upcoming.classList.remove('is-leaving');
      upcoming.classList.add('is-active');
      window.setTimeout(() => current.classList.remove('is-leaving'), 650);
    };

    const start = () => {
      window.clearInterval(timer);
      timer = window.setInterval(next, 2600);
    };
    const stop = () => window.clearInterval(timer);

    // Pause when off-screen or the tab is hidden to save battery.
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(rotator);
    document.addEventListener('visibilitychange', () => (document.hidden ? stop() : start()));
  });
}

/** Cursor-following glow on .spotlight cards. */
export function initSpotlight() {
  if (!hasFinePointer()) return;
  document.addEventListener(
    'pointermove',
    (e) => {
      const card = (e.target as Element | null)?.closest?.<HTMLElement>('.spotlight');
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - r.left}px`);
      card.style.setProperty('--my', `${e.clientY - r.top}px`);
    },
    { passive: true },
  );
}

/** Subtle 3D tilt + parallax layers for the hero visual. */
export function initTilt() {
  if (!hasFinePointer() || prefersReducedMotion()) return;

  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    const zone = el.closest('section') ?? el;
    const layers = Array.from(el.querySelectorAll<HTMLElement>('[data-parallax]'));
    let frame = 0;

    zone.addEventListener(
      'pointermove',
      (e) => {
        const event = e as PointerEvent;
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          const r = el.getBoundingClientRect();
          const x = (event.clientX - (r.left + r.width / 2)) / r.width; // -0.5…0.5-ish
          const y = (event.clientY - (r.top + r.height / 2)) / r.height;
          const cx = Math.max(-1, Math.min(1, x));
          const cy = Math.max(-1, Math.min(1, y));
          el.style.setProperty('--ry', `${(cx * 6).toFixed(2)}deg`);
          el.style.setProperty('--rx', `${(-cy * 6).toFixed(2)}deg`);
          for (const layer of layers) {
            const depth = Number(layer.dataset.parallax) || 0;
            layer.style.translate = `${(cx * depth).toFixed(1)}px ${(cy * depth).toFixed(1)}px`;
          }
        });
      },
      { passive: true },
    );

    zone.addEventListener('pointerleave', () => {
      cancelAnimationFrame(frame);
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
      for (const layer of layers) layer.style.translate = '';
    });
  });
}

/** Plays the AI chat demo like a live conversation when it scrolls into view, then loops. */
export function initChat() {
  const chats = document.querySelectorAll<HTMLElement>('[data-chat]');
  if (!chats.length || prefersReducedMotion() || !('IntersectionObserver' in window)) return;

  const wait = (ms: number) => new Promise((resolve) => window.setTimeout(resolve, ms));

  chats.forEach((chat) => {
    const messages = Array.from(chat.querySelectorAll<HTMLElement>('[data-chat-msg]'));
    const typing = chat.querySelector<HTMLElement>('[data-chat-typing]');
    if (!messages.length || !typing) return;

    let visible = false;
    let running = false;

    const reset = () => {
      for (const m of messages) {
        m.classList.add('is-hidden');
        m.classList.remove('is-in');
      }
    };

    const play = async () => {
      if (running) return;
      running = true;
      while (visible) {
        reset();
        await wait(500);
        for (const m of messages) {
          if (!visible) break;
          const isUser = m.classList.contains('chat__msg--user');
          const isSystem = m.classList.contains('chat__msg--system');
          if (!isSystem) {
            typing.classList.toggle('is-user', isUser);
            typing.classList.add('is-active');
            m.after(typing);
            await wait(isUser ? 700 : 1100);
            typing.classList.remove('is-active');
          }
          m.classList.remove('is-hidden');
          m.classList.add('is-in');
          await wait(isSystem ? 600 : 900);
        }
        await wait(4200);
      }
      // Leave the full conversation visible when paused.
      for (const m of messages) m.classList.remove('is-hidden');
      typing.classList.remove('is-active');
      running = false;
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible) play();
      },
      { threshold: 0.35 },
    );
    io.observe(chat);
  });
}
