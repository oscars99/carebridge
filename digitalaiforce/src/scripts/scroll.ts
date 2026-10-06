import { prefersReducedMotion } from './motion';

const root = document.documentElement;

/**
 * Scroll-triggered reveals. Elements already on screen are marked visible
 * *before* the hiding class is applied, so nothing flashes on load and
 * content stays visible if JavaScript never runs.
 */
export function initReveal() {
  const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
  if (!items.length || prefersReducedMotion() || !('IntersectionObserver' in window)) return;

  let ready = false;
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      }
      // The first callback reports every element's initial state: anything already on
      // screen is now marked visible, so it's safe to start hiding the rest.
      if (!ready) {
        ready = true;
        root.classList.add('reveal-ready');
      }
    },
    { rootMargin: '0px 0px -6% 0px', threshold: 0.08 },
  );

  for (const el of items) io.observe(el);
}

/** Count-up numbers. The final value is in the HTML for crawlers and no-JS visitors. */
export function initCounters() {
  const counters = Array.from(document.querySelectorAll<HTMLElement>('[data-count]'));
  if (!counters.length || prefersReducedMotion() || !('IntersectionObserver' in window)) return;

  const run = (el: HTMLElement) => {
    const target = Number(el.dataset.count);
    const suffix = el.dataset.suffix ?? '';
    const duration = 1600;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - p, 4);
      el.textContent = `${Math.round(target * eased)}${suffix}`;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          io.unobserve(entry.target);
          run(entry.target as HTMLElement);
        }
      }
    },
    { threshold: 0.5 },
  );

  for (const el of counters) {
    el.textContent = `0${el.dataset.suffix ?? ''}`;
    io.observe(el);
  }
}

/** Fills the process timeline as the visitor scrolls through it. */
export function initProcess() {
  const blocks = Array.from(document.querySelectorAll<HTMLElement>('[data-process]'));
  if (!blocks.length) return;

  const reduce = prefersReducedMotion();
  let ticking = false;

  const update = () => {
    const vh = window.innerHeight;
    for (const block of blocks) {
      const steps = Array.from(block.querySelectorAll<HTMLElement>('[data-step]'));
      const rect = block.getBoundingClientRect();
      const progress = reduce ? 1 : Math.min(1, Math.max(0, (vh * 0.7 - rect.top) / (rect.height || 1)));
      block.style.setProperty('--progress', progress.toFixed(3));
      steps.forEach((step, i) => {
        const threshold = steps.length > 1 ? i / (steps.length - 1) : 0;
        step.classList.toggle('is-active', progress >= threshold * 0.9 && progress > 0);
      });
    }
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  update();
}
