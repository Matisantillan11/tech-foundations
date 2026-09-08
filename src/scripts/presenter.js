import { slides } from '../data/slides.js';
import originalSlides from '../data/original-slides.json';
import { speakerNotes } from '../data/speaker-notes.js';
import { escapeHTML } from './html.js';
import { setupTimer } from './timer.js';

export function setupPresenter(navigation) {
  const $ = (id) => document.getElementById(id);
  $('audience').hidden = true; $('presenter').hidden = false;
  document.body.classList.add('presenter-mode');
  function render(index) {
    const slide = slides[index];
    document.title = `${String(index + 1).padStart(2, '0')} · ${slide.title} · Tech Foundations`;
    $('presenter-counter').textContent = `${String(index + 1).padStart(2, '0')} / ${navigation.total} · ${slide.chapter}`;
    $('presenter-title').textContent = slide.title; $('presenter-summary').textContent = slide.summary;
    $('next-title').textContent = slides[index + 1]?.title || 'Fin del bloque';
    $('teaching-notes').innerHTML = speakerNotes[index].map((note) => `<p>${escapeHTML(note)}</p>`).join('');
    $('original-notes').innerHTML = slide.source.map((number) => {
      const original = originalSlides.find((item) => item.slide === number);
      return `<h4>Diapositiva original ${number}</h4><p>${escapeHTML(original?.notes || 'Sin notas del presentador en el original.')}</p>`;
    }).join('');
    document.querySelectorAll('[data-action="prev"]').forEach((button) => { button.disabled = index === 0; });
    document.querySelectorAll('[data-action="next"]').forEach((button) => { button.disabled = index === navigation.total - 1; });
  }
  navigation.subscribe(render); render(navigation.current);
  setupTimer();
}
