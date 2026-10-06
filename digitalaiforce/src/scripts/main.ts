/**
 * Site-wide interactions. Everything here is progressive enhancement:
 * the HTML works and reads correctly without JavaScript.
 */
import { initHeader } from './header';
import { initReveal, initCounters, initProcess } from './scroll';
import { initRotator, initSpotlight, initTilt, initChat } from './effects';
import { initTabs, initAccordions, initToc } from './widgets';
import { initContactForms } from './form';

initHeader();
initReveal();
initCounters();
initProcess();
initRotator();
initSpotlight();
initTilt();
initChat();
initTabs();
initAccordions();
initToc();
initContactForms();
