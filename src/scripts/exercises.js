import { createPhysicsExercise } from './physics-exercise.js'
import { code, tag } from '../data/formatters.js'

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

const FOR_LIMIT = 3
const WHILE_START = 3
const SWITCH_PRICES = { chico: 800, mediano: 1000, grande: 1200 }
const COMBO_COMISION = 200
const COMBO_PRECIOS = { chico: 800, mediano: 1000, grande: 1500 }
const calcularPrecioCombo = (tamaño) => COMBO_COMISION + (COMBO_PRECIOS[tamaño] ?? 1300)

export function createExercises(stage) {
	const $ = (selector) => stage.querySelector(selector)
	let dynamicIndex = 0
	let forIndex = 0
	let whileCount = WHILE_START
	let comboQueue = []
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
		'for-step': () => {
			if (forIndex >= FOR_LIMIT) return
			forIndex += 1
			$('#for-i').textContent = String(forIndex)
			$('#for-condition').textContent = String(forIndex < FOR_LIMIT)
			$('#for-cups').textContent += '☕'
			pulse($('#for-i'))
			$('#for-feedback').textContent =
				forIndex >= FOR_LIMIT
					? `El bucle terminó: la condición i < ${FOR_LIMIT} ya es falsa.`
					: `Se sirvieron ${forIndex} de ${FOR_LIMIT} tazas.`
			if (forIndex >= FOR_LIMIT) $('[data-action="for-step"]').disabled = true
		},
		'for-reset': () => {
			forIndex = 0
			$('#for-i').textContent = '0'
			$('#for-condition').textContent = 'true'
			$('#for-cups').textContent = ''
			$('[data-action="for-step"]').disabled = false
			$('#for-feedback').textContent = 'Hacé clic para correr una vuelta del bucle.'
		},
		'while-step': () => {
			if (whileCount <= 0) return
			whileCount -= 1
			$('#while-count').textContent = String(whileCount)
			$('#while-condition').textContent = String(whileCount > 0)
			$('#while-people').textContent += '👤'
			pulse($('#while-count'))
			$('#while-feedback').textContent =
				whileCount <= 0
					? 'La fila se vació: la condición es falsa y el while se detiene solo.'
					: `Quedan ${whileCount} clientes por atender.`
			if (whileCount <= 0) $('[data-action="while-step"]').disabled = true
		},
		'while-reset': () => {
			whileCount = WHILE_START
			$('#while-count').textContent = String(WHILE_START)
			$('#while-condition').textContent = 'true'
			$('#while-people').textContent = ''
			$('[data-action="while-step"]').disabled = false
			$('#while-feedback').textContent = 'Hacé clic para atender al primer cliente de la fila.'
		},
		'combo-calculate': () => {
			if (!comboQueue.length) return
			const total = comboQueue.reduce((sum, size) => sum + calcularPrecioCombo(size), 0)
			const breakdown = comboQueue.map((size) => calcularPrecioCombo(size)).join(' + ')
			$('#combo-feedback').textContent = `Total: $${total} (${breakdown}).`
			$('#combo-feedback').classList.add('success')
			stage.querySelectorAll('[data-order]').forEach((b) => (b.disabled = true))
			$('[data-action="combo-calculate"]').disabled = true
		},
		'combo-reset': () => {
			comboQueue = []
			$('#combo-queue').innerHTML = ''
			$('#combo-feedback').textContent = 'Fila vacía. Sumá clientes con los botones de arriba.'
			$('#combo-feedback').classList.remove('success')
			stage.querySelectorAll('[data-order]').forEach((b) => (b.disabled = false))
			$('[data-action="combo-calculate"]').disabled = true
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
		if (btn.dataset.compare) {
			const strict = btn.dataset.compare === 'strict'
			stage.querySelectorAll('[data-compare]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)))
			$('#compare-op').textContent = strict ? '===' : '=='
			$('#compare-result').textContent = strict ? 'false' : 'true'
			$('#compare-result').classList.toggle('text-green-600', !strict)
			$('#compare-result').classList.toggle('text-orange-600', strict)
			$('#compare-feedback').textContent = strict
				? '=== también compara el tipo: "5" es un string y 5 es un number, así que son distintos.'
				: '== compara solo el valor y convierte el tipo antes de comparar.'
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
		if (btn.dataset.size) {
			const size = btn.dataset.size
			stage.querySelectorAll('[data-size]').forEach((b) => b.setAttribute('aria-pressed', String(b === btn)))
			const price = SWITCH_PRICES[size] ?? SWITCH_PRICES.mediano
			$('#switch-price').textContent = `$${price}`
			stage.querySelectorAll('[id^="case-"]').forEach((span) => span.classList.remove('active-line'))
			$(`#case-${SWITCH_PRICES[size] ? size : 'default'}`).classList.add('active-line')
			$('#switch-feedback').textContent = SWITCH_PRICES[size]
				? `Coincide con el case "${size}": precio ${price}.`
				: 'No coincide con ningún case: se ejecuta el default.'
		}
		if (btn.dataset.order) {
			comboQueue.push(btn.dataset.order)
			$('#combo-queue').innerHTML = comboQueue
				.map((size, i) => tag(`${i + 1} · ${size[0].toUpperCase()}${size.slice(1)}`))
				.join('')
			$('#combo-feedback').classList.remove('success')
			$('#combo-feedback').textContent = `Fila: ${comboQueue.length} cliente${comboQueue.length === 1 ? '' : 's'}. Sumá mentalmente antes de calcular.`
			$('[data-action="combo-calculate"]').disabled = false
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
