import { prefersReducedMotion } from './motion';

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
