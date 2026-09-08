const speeds = [
  { value: 4, gait: 'walk', label: 'Caminando' },
  { value: 8, gait: 'trot', label: 'Trotando' },
  { value: 12, gait: 'run', label: 'Corriendo' },
  { value: 16, gait: 'sprint', label: 'Corriendo más rápido' },
];

export function createPhysicsExercise(stage) {
  const $ = (selector) => stage.querySelector(selector);
  let index = 0;
  const pulse = (element) => {
    element.classList.remove('pop');
    void element.offsetWidth;
    element.classList.add('pop');
  };
  function renderSpeed(message) {
    const speed = speeds[index];
    $('#variable-value').textContent = speed.value;
    $('#speed-code').textContent = speed.value;
    $('#speed-state').textContent = speed.label;
    $('#runner-scene').dataset.gait = speed.gait;
    $('#runner-scene').setAttribute('aria-label', `Una persona está ${speed.label.toLowerCase()} a ${speed.value} kilómetros por hora`);
    $('#increase-speed').disabled = index === speeds.length - 1;
    $('#variable-feedback').textContent = message;
    pulse($('#variable-value'));
  }
  return {
    increase() {
      if (index === speeds.length - 1) return;
      const previous = speeds[index].value;
      index++;
      renderSpeed(`velocidad pasó de ${previous} a ${speeds[index].value} km/h. Ahora está ${speeds[index].label.toLowerCase()}.`);
    },
    reset() {
      index = 0;
      renderSpeed('velocidad vuelve a 4 km/h. La persona vuelve a caminar.');
    },
    rejectGravityChange() {
      $('#variable-feedback').textContent = 'No podemos reasignar gravedad: usamos const. Sigue valiendo 9,81 m/s² y la manzana cae igual.';
      pulse($('#constant-value'));
    },
  };
}
