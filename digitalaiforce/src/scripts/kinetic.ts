/**
 * Kinetic typography & scroll-linked motion:
 *  - [data-split]  headings reveal word by word through a mask
 *  - [data-lit]    paragraphs "light up" word by word as you scroll
 *  - [data-speed]  gentle parallax
 *  - [data-velocity] marquees skew with scroll speed
 * Text stays real text in the DOM, so SEO and screen readers are unaffected.
 */
import { prefersReducedMotion } from './motion';
import { getLenis } from './smooth';

/** Wraps every word inside `el` (recursing into child elements) and returns the created spans. */
function wrapWords(el: HTMLElement, make: (word: string, index: number) => HTMLElement) {
  const created: HTMLElement[] = [];
  const walk = (node: Node) => {
    for (const child of Array.from(node.childNodes)) {
      if (child.nodeType === Node.TEXT_NODE) {
        const text = child.textContent ?? '';
        if (!text.trim()) continue;
        const frag = document.createDocumentFragment();
        for (const part of text.split(/(\s+)/)) {
          if (!part) continue;
          if (/^\s+$/.test(part)) {
            frag.append(document.createTextNode(part));
          } else {
            const span = make(part, created.length);
            created.push(span);
            frag.append(span);
          }
        }
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && !(child as Element).matches('.sr-only, svg')) {
        walk(child);
      }
    }
  };
  walk(el);
  return created;
}

export function initSplit() {
  const items = Array.from(document.querySelectorAll<HTMLElement>('[data-split]'));
  if (!items.length) return;
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) {
    items.forEach((el) => el.classList.add('is-split', 'split-in'));
    return;
  }

  for (const el of items) {
    wrapWords(el, (word, i) => {
      const outer = document.createElement('span');
      outer.className = 'sw';
      const inner = document.createElement('span');
      inner.className = 'si';
      inner.style.setProperty('--wi', String(i));
      inner.textContent = word;
      outer.append(inner);
      return outer;
    });
    el.classList.add('is-split');
  }

  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('split-in');
          io.unobserve(entry.target);
        }
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );

  // Two frames so the hidden state paints before the transition starts.
  requestAnimationFrame(() => requestAnimationFrame(() => items.forEach((el) => io.observe(el))));
}

export function initLit() {
  const blocks = Array.from(document.querySelectorAll<HTMLElement>('[data-lit]'));
  if (!blocks.length || prefersReducedMotion()) return;

  const sets = blocks.map((el) => ({
    el,
    words: wrapWords(el, (word) => {
      const span = document.createElement('span');
      span.className = 'lw';
      span.textContent = word;
      return span;
    }),
  }));

  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    const rects = sets.map(({ el }) => el.getBoundingClientRect());
    sets.forEach(({ words }, b) => {
      const r = rects[b];
      if (r.bottom < -vh || r.top > vh * 2) return;
      // 0 when the block's top is at 85% of the viewport, 1 when its bottom reaches 45%.
      const p = Math.min(1, Math.max(0, (vh * 0.85 - r.top) / (r.height + vh * 0.4)));
      const n = words.length;
      words.forEach((w, i) => {
        const lit = Math.min(1, Math.max(0, p * n * 1.15 - i));
        w.style.setProperty('--lit', lit.toFixed(2));
      });
    });
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
}

export function initParallax() {
  const items = Array.from(document.querySelectorAll<HTMLElement>('[data-speed]'));
  if (!items.length || prefersReducedMotion()) return;

  let ticking = false;
  const update = () => {
    ticking = false;
    const vh = window.innerHeight;
    // Read all positions first, then write, to avoid forced reflows.
    const rects = items.map((el) => el.getBoundingClientRect());
    items.forEach((el, i) => {
      const r = rects[i];
      if (r.bottom < -200 || r.top > vh + 200) return;
      // Measure without the current offset so the effect doesn't feed back on itself.
      const current = parseFloat(el.style.translate.split(' ')[1] || '0') || 0;
      const center = r.top - current + r.height / 2;
      const offset = (center - vh / 2) * (Number(el.dataset.speed) || 0);
      el.style.translate = `0 ${offset.toFixed(1)}px`;
    });
  };
  const onScroll = () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', onScroll, { passive: true });
  onScroll();
}

/** Publishes a smoothed scroll velocity as --velocity on each [data-velocity] element (marquees). */
export function initVelocity() {
  const items = Array.from(document.querySelectorAll<HTMLElement>('[data-velocity]'));
  if (!items.length || prefersReducedMotion()) return;

  let lastY = window.scrollY;
  let current = 0;
  let written = '';
  const tick = () => {
    const lenis = getLenis();
    const y = window.scrollY;
    const raw = lenis ? lenis.velocity : y - lastY;
    lastY = y;
    current += (Math.max(-40, Math.min(40, raw)) - current) * 0.12;
    if (Math.abs(current) < 0.02) current = 0;
    const value = current.toFixed(2);
    if (value !== written) {
      written = value;
      for (const el of items) el.style.setProperty('--velocity', value);
    }
    requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
