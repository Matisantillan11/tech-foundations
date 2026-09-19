import { createPhysicsExercise } from './physics-exercise.js'
import { code } from '../data/formatters.js'

const typeData = [
	['TEXTO', '"Hola"', 'String', 'Una cadena de caracteres. La escribimos entre comillas.'],
	['NÚMERO', '28', 'Number', 'Para cantidades, edades o medidas. También puede representar decimales, como 2.5.'],
	[
		'VERDADERO O FALSO',
		'true / false',
		'Boolean',
		'Solo dos valores posibles. Como la respuesta a una pregunta de sí o no.',
	],
	[
		'ENTERO DE GRAN PRECISIÓN',
		'9007199254740993n',
		'BigInt',
		'Para trabajar con enteros más allá del rango de precisión segura de Number.',
	],
	[
		'SIN VALOR DEFINIDO',
		'undefined',
		'Undefined',
		'Por ejemplo, una variable declarada a la que todavía no asignamos un valor.',
	],
	[
		'AUSENCIA INTENCIONAL',
		'null',
		'Null',
		'Indicamos explícitamente que no hay un valor. Una caja que dejamos vacía a propósito.',
	],
]

export function createExercises(stage) {
	const $ = (selector) => stage.querySelector(selector)
	let dynamicIndex = 0
	const physics = createPhysicsExercise(stage)
	function pulse(element) {
		element.classList.remove('pop')
		void element.offsetWidth
		element.classList.add('pop')
	}
	const actions = {
		variable: physics.increase,
		constant: physics.rejectGravityChange,
		'reset-speed': physics.reset,
		dynamic: () => {
			dynamicIndex = (dynamicIndex + 1) % 3
			const values = [
				['28', 'Number'],
				['"Hola"', 'String'],
				['true', 'Boolean'],
			]
			$('#dynamic-value').textContent = values[dynamicIndex][0]
			$('#dynamic-type').textContent = values[dynamicIndex][1]
			pulse($('#dynamic-value'))
		},
		reveal: () => {
			const answer = $('#constant-answer')
			answer.hidden = !answer.hidden
			const btn = $('[data-action="reveal"]')
			btn.setAttribute('aria-expanded', String(!answer.hidden))
			btn.textContent = answer.hidden ? 'Revelar respuesta +' : 'Ocultar respuesta −'
		},
	}
	return (btn) => {
		if (btn.dataset.action) actions[btn.dataset.action]?.()
		if (btn.dataset.type !== undefined) {
			const data = typeData[Number(btn.dataset.type)]
			;['#type-category', '#type-value', '#type-name', '#type-description'].forEach(
				(id, i) => ($(id).textContent = data[i]),
			)
			stage.querySelectorAll('[data-type]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)))
		}
		if (btn.dataset.name) {
			stage.querySelectorAll('[data-name]').forEach((b) => b.classList.remove('correct', 'wrong'))
			const good = btn.dataset.name === 'good'
			btn.classList.add(good ? 'correct' : 'wrong')
			$('#name-feedback').textContent = good
				? 'Exacto. edad es válido y describe el dato que guarda.'
				: btn.dataset.name === 'bad'
					? 'Un nombre no puede empezar con un número. Probá otra opción.'
					: 'let es una palabra reservada del lenguaje. Probá otra opción.'
			$('#name-feedback').classList.toggle('success', good)
			$('#name-feedback').classList.toggle('incorrect', !good)
		}
		if (btn.dataset.day) {
			const day = btn.dataset.day === 'true'
			stage.querySelectorAll('[data-day]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)))
			$('#phone-preview').classList.toggle('dark', !day)
			$('#mode-icon').textContent = day ? '☀' : '☾'
			$('#mode-greeting').textContent = day ? '¡Buen día!' : '¡Buenas noches!'
			$('#mode-pill').textContent = day ? 'Modo claro' : 'Modo oscuro'
			$('#day-branch').classList.toggle('active-line', day)
			$('#night-branch').classList.toggle('active-line', !day)
			$('#mode-feedback').textContent = day
				? 'La condición es verdadera → modo claro.'
				: 'La condición es falsa → modo oscuro.'
		}
		if (btn.dataset.condition) {
			const three = btn.dataset.condition === 'three'
			stage.querySelectorAll('[data-condition]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)))
			$('#condition-prose').innerHTML = three
				? '<span class="large-step block [font:27px_monospace] text-[#7b96ad] mb-[20px] mobile:text-[21px] mobile:mb-[10px]">01 → 02 → 03</span><h3>Más condiciones.<br>Un camino elegido.</h3><p>Se ejecuta la primera que se cumple. Si ninguna se cumple, se usa else.</p>'
				: '<span class="large-step block [font:27px_monospace] text-[#7b96ad] mb-[20px] mobile:text-[21px] mobile:mb-[10px]">01 → 02</span><h3>Una condición.<br>Dos alternativas.</h3><p>Se ejecuta la rama que corresponde.</p>'
			$('#condition-code').innerHTML = code(
				three
					? '<em>if</em> (esDeDia) {\n  modo = <q>"claro"</q>;\n} <em>else if</em> (esDeNoche) {\n  modo = <q>"oscuro"</q>;\n} <em>else</em> {\n  modo = <q>"automático"</q>;\n}'
					: '<em>if</em> (esDeDia) {\n  modo = <q>"claro"</q>;\n} <em>else</em> {\n  modo = <q>"oscuro"</q>;\n}',
			)
		}
		if (btn.dataset.answer) {
			const good = btn.dataset.answer === 'empty'
			stage.querySelectorAll('[data-answer]').forEach((b) => b.classList.remove('correct', 'wrong'))
			btn.classList.add(good ? 'correct' : 'wrong')
			$('#exercise-feedback').textContent = good
				? '¡Exacto! quedaCafe guarda false. La condición no se cumple y se ejecuta else: se terminó el café.'
				: 'Mirá el valor de quedaCafe: es false. La primera rama no se ejecuta. Probá de nuevo.'
			$('#exercise-feedback').classList.toggle('success', good)
			$('#exercise-feedback').classList.toggle('incorrect', !good)
		}
	}
}
