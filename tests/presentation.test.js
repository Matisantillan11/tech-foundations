import test from 'node:test';
import assert from 'node:assert/strict';
import { createNavigation } from '../src/scripts/navigation.js';
import { setupShortcuts } from '../src/scripts/shortcuts.js';
import { connectPresenter } from '../src/scripts/sync.js';
import { createExercises } from '../src/scripts/exercises.js';

function events() {
  const listeners = new Map();
  return {
    addEventListener(name, listener) {
      if (!listeners.has(name)) listeners.set(name, []);
      listeners.get(name).push(listener);
    },
    dispatch(name, event) { listeners.get(name)?.forEach((listener) => listener(event)); },
  };
}

function environment() {
  const document = { ...events(), querySelector: () => null };
  const window = { ...events() };
  const location = { hash: '#1', pathname: '/', search: '', protocol: 'https:', origin: 'https://course.test', href: 'https://course.test/#1' };
  const history = { replaceState(_state, _title, url) { location.hash = url.slice(url.indexOf('#')); } };
  Object.assign(globalThis, { document, window, location, history });
  return { document, window, location };
}

test('navigation preserves limits, hashes and keyboard editing behavior', () => {
  const { document, window, location } = environment();
  const navigation = createNavigation();
  setupShortcuts(navigation, {});
  const press = (key, editing = false) => document.dispatch('keydown', {
    key, preventDefault() {}, target: { closest: () => editing ? {} : null },
  });
  press('ArrowLeft'); assert.equal(navigation.current, 0);
  press('ArrowRight'); assert.equal(location.hash, '#2');
  press('ArrowRight', true); assert.equal(navigation.current, 1);
  press('End'); assert.equal(navigation.current, navigation.total - 1);
  press('ArrowRight'); assert.equal(navigation.current, navigation.total - 1);
  press('Home'); assert.equal(navigation.current, 0);
  location.hash = '#5'; window.dispatch('hashchange'); assert.equal(navigation.current, 4);
});

test('presenter sync accepts only its connected window and does not echo remote navigation', () => {
  const { window } = environment();
  const sent = [];
  const popup = { closed: false, focus() {}, postMessage: (message) => sent.push(message) };
  window.open = () => popup;
  const navigation = createNavigation();
  const sync = connectPresenter(navigation, { isPresenter: false, showToast() {} });
  sync.openPresenter();
  navigation.next(); assert.equal(sent.at(-1).index, 1);
  const remote = (index, source = popup, origin = 'https://course.test') => window.dispatch('message', {
    source, origin, data: { type: 'tech-foundations-slide', index },
  });
  remote(7, {}); remote(7, popup, 'https://unrelated.test'); remote(900); remote(-1);
  assert.equal(navigation.current, 1);
  const count = sent.length;
  remote(4); assert.equal(navigation.current, 4); assert.equal(sent.length, count);
  window.dispatch('message', { source: popup, origin: 'https://course.test', data: { type: 'tech-foundations-ready' } });
  assert.equal(sent.at(-1).index, 4);
});

function element(dataset = {}) {
  const classes = new Set(['feedback', 'text-blue']);
  return {
    dataset, textContent: '', hidden: true, attributes: {},
    setAttribute(name, value) { this.attributes[name] = value; },
    classList: {
      add: (...names) => names.forEach((name) => classes.add(name)),
      remove: (...names) => names.forEach((name) => classes.delete(name)),
      contains: (name) => classes.has(name),
      toggle(name, enabled) { if (enabled) classes.add(name); else classes.delete(name); },
    },
  };
}

test('exercises update visible values, keep utility classes and reset when re-entering a slide', () => {
  const nodes = new Map();
  const get = (selector) => {
    if (!nodes.has(selector)) nodes.set(selector, element());
    return nodes.get(selector);
  };
  const stage = { querySelector: get, querySelectorAll: () => [] };
  let exercise = createExercises(stage);
  exercise(element({ action: 'variable' })); assert.equal(get('#variable-value').textContent, 8);
  assert.equal(get('#runner-scene').dataset.gait, 'trot');
  exercise(element({ action: 'variable' })); assert.equal(get('#variable-value').textContent, 12);
  assert.equal(get('#runner-scene').dataset.gait, 'run');
  exercise(element({ action: 'variable' })); assert.equal(get('#variable-value').textContent, 16);
  assert.equal(get('#runner-scene').dataset.gait, 'sprint');
  assert.equal(get('#increase-speed').disabled, true);
  get('#constant-value').textContent = '9,81';
  exercise(element({ action: 'constant' }));
  assert.equal(get('#constant-value').textContent, '9,81');
  assert.equal(get('#variable-value').textContent, 16);
  assert.match(get('#variable-feedback').textContent, /No podemos reasignar gravedad/);
  exercise(element({ action: 'reset-speed' }));
  assert.equal(get('#variable-value').textContent, 4);
  assert.equal(get('#runner-scene').dataset.gait, 'walk');
  assert.equal(get('#increase-speed').disabled, false);
  exercise = createExercises(stage);
  exercise(element({ action: 'variable' })); assert.equal(get('#variable-value').textContent, 8);
  exercise(element({ day: 'false' })); assert.equal(get('#mode-pill').textContent, 'Modo oscuro');
  assert.equal(get('#night-branch').classList.contains('active-line'), true);
  exercise(element({ day: 'true' })); assert.equal(get('#mode-pill').textContent, 'Modo claro');
  exercise(element({ name: 'good' }));
  assert.equal(get('#name-feedback').classList.contains('success'), true);
  assert.equal(get('#name-feedback').classList.contains('text-blue'), true);
  exercise(element({ name: 'bad' }));
  assert.equal(get('#name-feedback').classList.contains('success'), false);
  assert.equal(get('#name-feedback').classList.contains('incorrect'), true);
  exercise(element({ action: 'reveal' })); assert.equal(get('#constant-answer').hidden, false);
  exercise(element({ action: 'reveal' })); assert.equal(get('#constant-answer').hidden, true);
  exercise(element({ type: '3' })); assert.equal(get('#type-name').textContent, 'BigInt');
  exercise(element({ answer: 'empty' })); assert.match(get('#exercise-feedback').textContent, /¡Exacto!/);
});
