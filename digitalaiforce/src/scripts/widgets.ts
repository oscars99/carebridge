import { prefersReducedMotion } from './motion';

/** WAI-ARIA tabs with a sliding indicator and arrow-key navigation. */
export function initTabs() {
  document.querySelectorAll<HTMLElement>('[data-tabs]').forEach((root) => {
    const tabs = Array.from(root.querySelectorAll<HTMLButtonElement>('[data-tab]'));
    const panels = Array.from(root.querySelectorAll<HTMLElement>('[data-tab-panel]'));
    const indicator = root.querySelector<HTMLElement>('[data-tab-indicator]');
    if (!tabs.length) return;

    const moveIndicator = (tab: HTMLElement) => {
      if (!indicator) return;
      indicator.style.setProperty('--x', `${tab.offsetLeft}px`);
      indicator.style.setProperty('--w', `${tab.offsetWidth}px`);
    };

    const select = (index: number, focus = false) => {
      tabs.forEach((tab, i) => {
        const selected = i === index;
        tab.setAttribute('aria-selected', String(selected));
        tab.tabIndex = selected ? 0 : -1;
        const panel = panels[i];
        if (panel) panel.hidden = !selected;
      });
      moveIndicator(tabs[index]);
      if (focus) tabs[index].focus();
      // Newly shown cards may still be waiting for their scroll reveal.
      panels[index]?.querySelectorAll('[data-reveal]').forEach((el) => el.classList.add('is-visible'));
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(i));
      tab.addEventListener('keydown', (e) => {
        const last = tabs.length - 1;
        let next = -1;
        if (e.key === 'ArrowRight') next = i === last ? 0 : i + 1;
        if (e.key === 'ArrowLeft') next = i === 0 ? last : i - 1;
        if (e.key === 'Home') next = 0;
        if (e.key === 'End') next = last;
        if (next >= 0) {
          e.preventDefault();
          select(next, true);
        }
      });
    });

    const current = Math.max(0, tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true'));
    moveIndicator(tabs[current]);
    window.addEventListener('resize', () => {
      const active = tabs.find((t) => t.getAttribute('aria-selected') === 'true');
      if (active) moveIndicator(active);
    });
    // Fonts can change tab widths after load.
    document.fonts?.ready.then(() => {
      const active = tabs.find((t) => t.getAttribute('aria-selected') === 'true');
      if (active) moveIndicator(active);
    });
  });
}

/** Smooth open/close for native <details> accordions. */
export function initAccordions() {
  const items = document.querySelectorAll<HTMLDetailsElement>('details[data-accordion]');
  if (!items.length || prefersReducedMotion() || !('animate' in Element.prototype)) return;

  items.forEach((details) => {
    const summary = details.querySelector('summary');
    const content = details.querySelector<HTMLElement>('[data-accordion-content]');
    if (!summary || !content) return;
    let animation: Animation | null = null;

    summary.addEventListener('click', (e) => {
      e.preventDefault();
      animation?.cancel();

      if (details.open) {
        const start = content.offsetHeight;
        animation = content.animate(
          [
            { height: `${start}px`, opacity: 1 },
            { height: '0px', opacity: 0 },
          ],
          { duration: 240, easing: 'cubic-bezier(0.65, 0, 0.35, 1)' },
        );
        animation.onfinish = () => {
          details.open = false;
          animation = null;
        };
      } else {
        details.open = true;
        const end = content.offsetHeight;
        animation = content.animate(
          [
            { height: '0px', opacity: 0 },
            { height: `${end}px`, opacity: 1 },
          ],
          { duration: 360, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' },
        );
        animation.onfinish = () => {
          animation = null;
        };
      }
    });
  });
}

/** Highlights the table-of-contents link for the section currently being read. */
export function initToc() {
  const links = Array.from(document.querySelectorAll<HTMLAnchorElement>('.toc a[href^="#"]'));
  if (!links.length || !('IntersectionObserver' in window)) return;

  const targets = links
    .map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1))))
    .filter((el): el is HTMLElement => Boolean(el));

  const setCurrent = (id: string) => {
    for (const link of links) {
      const current = decodeURIComponent(link.hash.slice(1)) === id;
      link.classList.toggle('is-current', current);
      if (current) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    }
  };

  const io = new IntersectionObserver(
    (entries) => {
      const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
      if (visible[0]) setCurrent(visible[0].target.id);
    },
    { rootMargin: '-15% 0px -70% 0px' },
  );
  targets.forEach((t) => io.observe(t));
}
