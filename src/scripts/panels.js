import { slides } from '../data/slides.js';
import { escapeHTML } from './html.js';

let toastTimer;
export function showToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = message; toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 4200);
}
export async function toggleFullscreen() {
  try {
    if (document.fullscreenElement) await document.exitFullscreen();
    else if (document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
    else showToast('Usá la opción de pantalla completa del navegador.');
  } catch { showToast('No se pudo activar pantalla completa. Usá la opción del navegador.'); }
}
export function setupPanels(navigation) {
  const overview = document.getElementById('overview'), help = document.getElementById('help');
  function openOverview() {
    document.getElementById('slide-grid').innerHTML = slides.map((slide, index) =>
      `<button data-go="${index}" aria-current="${index === navigation.current}"><span>${String(index + 1).padStart(2, '0')} · ${escapeHTML(slide.chapter)}</span><b>${escapeHTML(slide.title)}</b></button>`
    ).join('');
    overview.showModal(); overview.querySelector('[aria-current="true"]').focus();
  }
  const openHelp = () => help.showModal();
  const actions = {
    overview: openOverview, help: openHelp, fullscreen: toggleFullscreen,
    close: () => document.querySelectorAll('dialog[open]').forEach((dialog) => dialog.close()),
  };
  document.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    if (button && !button.disabled) actions[button.dataset.action]?.();
  });
  document.querySelectorAll('dialog').forEach((dialog) => dialog.addEventListener('click', (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
  }));
  return { openOverview, openHelp };
}
