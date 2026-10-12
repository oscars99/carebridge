import Lenis from 'lenis';
import { prefersReducedMotion, hasFinePointer } from './motion';

let lenis: Lenis | null = null;

/** The active Lenis instance (null when smooth scrolling is off). */
export const getLenis = () => lenis;

/**
 * Inertia smooth scrolling for mouse wheel/trackpad. Touch devices keep native scrolling
 * (Lenis is never started there), and reduced-motion visitors are skipped entirely.
 */
export function initSmoothScroll() {
  if (prefersReducedMotion() || !hasFinePointer()) return;

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  const raf = (time: number) => {
    lenis?.raf(time);
    requestAnimationFrame(raf);
  };
  requestAnimationFrame(raf);

  // Smooth in-page links (table of contents, back-to-top) while keeping focus management.
  document.addEventListener('click', (e) => {
    const link = (e.target as Element | null)?.closest?.<HTMLAnchorElement>('a[href^="#"]');
    if (!link || link.classList.contains('skip-link') || e.defaultPrevented) return;
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const id = decodeURIComponent(link.hash.slice(1));
    const target = id ? document.getElementById(id) : null;
    if (!target || !lenis) return;

    e.preventDefault();
    // Lenis honours CSS scroll-padding-top / scroll-margin-top, so no manual header offset is needed.
    lenis.scrollTo(target.id === 'main' ? 0 : target);
    history.pushState(null, '', `#${id}`);
    if (!target.hasAttribute('tabindex') && !/^(A|BUTTON|INPUT|SELECT|TEXTAREA)$/.test(target.tagName)) {
      target.setAttribute('tabindex', '-1');
    }
    target.focus({ preventScroll: true });
  });
}
