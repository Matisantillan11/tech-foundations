import { slides } from '../data/slides.js';

/** Slide position and navigation events shared by audience and presenter. */
export function createNavigation() {
  const clamp = (index) => Math.max(0, Math.min(slides.length - 1, index));
  const fromHash = () => clamp((parseInt(location.hash.slice(1), 10) || 1) - 1);
  let current = fromHash();
  const listeners = new Set();
  const notify = (sync) => listeners.forEach((listener) => listener(current, sync));
  const navigation = {
    get current() { return current; },
    get total() { return slides.length; },
    go(index, sync = true) {
      current = clamp(index);
      history.replaceState(null, '', `${location.pathname}${location.search}#${current + 1}`);
      notify(sync);
    },
    next() { navigation.go(current + 1); },
    previous() { navigation.go(current - 1); },
    subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener); },
  };
  window.addEventListener('hashchange', () => { current = fromHash(); notify(true); });
  document.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button || button.disabled) return;
    if (button.dataset.action === 'next') navigation.next();
    if (button.dataset.action === 'prev') navigation.previous();
    if (button.dataset.go !== undefined) {
      document.querySelectorAll('dialog[open]').forEach((dialog) => dialog.close());
      navigation.go(Number(button.dataset.go));
      if (!document.getElementById('audience').hidden) document.getElementById('stage').focus({ preventScroll: true });
    }
  });
  return navigation;
}

export function setupSwipe(stage, navigation) {
  let start = null;
  stage.addEventListener('touchstart', (event) => {
    if (event.target.closest('button,a,input,pre')) return;
    const touch = event.touches[0]; start = [touch.clientX, touch.clientY];
  }, { passive: true });
  stage.addEventListener('touchend', (event) => {
    if (!start) return;
    const touch = event.changedTouches[0];
    const dx = touch.clientX - start[0], dy = touch.clientY - start[1];
    start = null;
    if (Math.abs(dx) > 70 && Math.abs(dx) > Math.abs(dy) * 1.5) navigation.go(navigation.current + (dx < 0 ? 1 : -1));
  }, { passive: true });
  stage.addEventListener('touchcancel', () => { start = null; }, { passive: true });
}
