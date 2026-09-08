/** Only the presenter imports the clock. Measure elapsed time, not interval ticks. */
export function setupTimer() {
  let elapsed = 0, running = true, lastTick = Date.now();
  const display = document.getElementById('elapsed');
  document.getElementById('timer-toggle').addEventListener('click', (event) => {
    if (running) elapsed += Date.now() - lastTick;
    running = !running; lastTick = Date.now();
    event.currentTarget.textContent = running ? 'Pausar' : 'Continuar';
  });
  document.querySelector('[data-action="reset-timer"]').addEventListener('click', () => {
    elapsed = 0; lastTick = Date.now(); display.textContent = '00:00';
  });
  setInterval(() => {
    const now = Date.now();
    if (running) elapsed += now - lastTick;
    lastTick = now;
    const seconds = Math.floor(elapsed / 1000);
    display.textContent = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
  }, 500);
}
