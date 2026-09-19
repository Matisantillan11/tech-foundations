/** Client-side only: hides the teacher view for anyone but the configured email. Not a security boundary. */
const STORAGE_KEY = 'tf-viewer-email';
const teacherEmail = import.meta.env.PUBLIC_TEACHER_EMAIL?.trim().toLowerCase();

export function getViewerEmail() {
  try { return localStorage.getItem(STORAGE_KEY); } catch { return null; }
}

export function isTeacher() {
  const email = getViewerEmail();
  return Boolean(teacherEmail && email && email === teacherEmail);
}

export function setupEmailGate(onResolved) {
  const gate = document.getElementById('email-gate');
  const app = document.getElementById('app');
  const form = document.getElementById('email-gate-form');
  const input = document.getElementById('email-gate-input');

  function reveal() {
    gate.hidden = true;
    app.inert = false;
    onResolved(isTeacher());
  }

  if (getViewerEmail()) { reveal(); return; }

  app.inert = true;
  gate.hidden = false;
  input.focus();
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const email = input.value.trim().toLowerCase();
    if (!email) return;
    try { localStorage.setItem(STORAGE_KEY, email); } catch {}
    reveal();
  });
}
