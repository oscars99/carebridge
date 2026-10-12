/**
 * Site-wide interactions. Everything here is progressive enhancement:
 * the HTML works and reads correctly without JavaScript.
 */
import { initSmoothScroll } from './smooth';
import { initSplit, initLit, initParallax, initVelocity } from './kinetic';
import { initHeader } from './header';
import { initReveal, initCounters } from './scroll';
import { initRotator, initChat } from './effects';
import { initTabs, initAccordions, initToc } from './widgets';
import { initContactForms } from './form';

// Above-the-fold and interaction-critical first…
initHeader();
initSplit();
initReveal();
initTabs();
initAccordions();
initContactForms();

// …then scroll-linked effects once the browser is idle, to keep the main thread free during load.
const idle = (fn: () => void) =>
  typeof window.requestIdleCallback === 'function' ? window.requestIdleCallback(fn, { timeout: 1200 }) : setTimeout(fn, 200);

idle(() => {
  initSmoothScroll();
  initLit();
  initParallax();
  initVelocity();
  initCounters();
  initRotator();
  initChat();
  initToc();
});
