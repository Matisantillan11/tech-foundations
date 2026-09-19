import { createNavigation } from './navigation.js';
import { setupPanels, showToast, toggleFullscreen } from './panels.js';
import { setupShortcuts } from './shortcuts.js';
import { connectPresenter } from './sync.js';
import { setupEmailGate, isTeacher } from './teacher-gate.js';

// Compose features here; view-specific code is loaded only when needed.
async function start() {
  const isPresenter = new URLSearchParams(location.search).has('presenter');
  const navigation = createNavigation();
  const panels = setupPanels(navigation);
  const sync = connectPresenter(navigation, { isPresenter, showToast });
  if (isPresenter) {
    const { setupPresenter } = await import('./presenter.js');
    setupPresenter(navigation);
  } else {
    const { setupAudience } = await import('./audience.js');
    setupAudience(navigation);
  }
  document.addEventListener('click', (event) => {
    if (isTeacher() && event.target.closest('button[data-action="presenter"]')) sync.openPresenter();
  });
  setupEmailGate((teacher) => {
    document.querySelectorAll('.teacher-only').forEach((element) => { element.hidden = !teacher; });
    setupShortcuts(navigation, {
      overview: panels.openOverview, help: panels.openHelp, fullscreen: toggleFullscreen,
      presenter: !isPresenter && teacher ? sync.openPresenter : undefined,
    });
  });
  sync.ready();
}

start().catch(() => showToast('No se pudo cargar la presentación. Recargá la página para volver a intentar.'));
