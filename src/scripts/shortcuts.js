/** Delegate keyboard actions without owning navigation or UI state. */
export function setupShortcuts(navigation, actions) {
  document.addEventListener('keydown', (event) => {
    if (event.ctrlKey || event.metaKey || event.altKey ||
        event.target.closest('input,textarea,select,[contenteditable="true"]') || document.querySelector('dialog[open]')) return;
    const key = event.key.toLowerCase();
    if (key === ' ' && event.target.closest('button,a,summary')) return;
    if (['arrowright', 'pagedown', ' '].includes(key)) { event.preventDefault(); navigation.next(); }
    else if (['arrowleft', 'pageup'].includes(key)) { event.preventDefault(); navigation.previous(); }
    else if (key === 'home') { event.preventDefault(); navigation.go(0); }
    else if (key === 'end') { event.preventDefault(); navigation.go(navigation.total - 1); }
    else if (key === 'g') actions.overview();
    else if (key === 'f') actions.fullscreen();
    else if (key === 'p') actions.presenter?.();
    else if (key === '?') actions.help();
  });
}
