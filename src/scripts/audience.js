import { slides } from '../data/slides.js'
import { slideClasses } from '../ui/slide-classes.js'
import { escapeHTML } from './html.js'
import { setupSwipe } from './navigation.js'
import { showToast } from './panels.js'

export function setupAudience(navigation) {
	const stage = document.getElementById('stage')
	let exerciseHandler = null
	function render(index) {
		const slide = slides[index]
		document.title = `${String(index + 1).padStart(2, '0')} · ${slide.title} · Tech Foundations`
		stage.innerHTML = `<section class="${slideClasses.slide} ${slideClasses[slide.layout] || ''}" aria-label="${escapeHTML(slide.title)}">${slide.html}</section>`
		stage.scrollTop = 0
		document.getElementById('chapter-name').textContent = slide.chapter
		document.getElementById('counter').innerHTML =
			`${String(index + 1).padStart(2, '0')} <span>/ ${navigation.total}</span>`
		document.getElementById('progress').style.width = `${((index + 1) / navigation.total) * 100}%`
		document.getElementById('prev').disabled = index === 0
		document.getElementById('next').disabled = index === navigation.total - 1
		exerciseHandler = null
	}
	navigation.subscribe(render)
	render(navigation.current)
	setupSwipe(stage, navigation)
	// Download exercise behavior on first interaction, and reset its state per slide.
	stage.addEventListener('click', async (event) => {
		const button = event.target.closest('button')
		if (
			!button ||
			button.disabled ||
			!button.matches(
				'[data-type],[data-name],[data-day],[data-condition],[data-answer],[data-size],[data-order],[data-compare],[data-action="variable"],[data-action="reset-speed"],[data-action="constant"],[data-action="dynamic"],[data-action="reveal"],[data-action="for-step"],[data-action="for-reset"],[data-action="while-step"],[data-action="while-reset"],[data-action="combo-calculate"],[data-action="combo-reset"]',
			)
		)
			return
		const currentSlide = stage.firstElementChild
		try {
			const { createExercises } = await import('./exercises.js')
			if (stage.firstElementChild !== currentSlide) return
			exerciseHandler ??= createExercises(stage)
			exerciseHandler(button)
		} catch {
			showToast('No se pudo cargar el ejercicio. Volvé a intentarlo.')
		}
	})
}
