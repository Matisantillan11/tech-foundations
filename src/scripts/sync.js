/** Communicate only with the window opened by this presentation. */
export function connectPresenter(navigation, { isPresenter, showToast }) {
	let presenterWindow = null
	const targetOrigin = location.protocol === 'file:' ? '*' : location.origin
	const transmit = (index) => {
		const target = isPresenter ? window.opener : presenterWindow
		if (target && !target.closed) target.postMessage({ type: 'tech-foundations-slide', index }, targetOrigin)
	}
	navigation.subscribe((index, sync) => {
		if (sync) transmit(index)
	})
	window.addEventListener('message', (event) => {
		const trusted = isPresenter ? event.source === window.opener : event.source === presenterWindow
		if (!trusted || (location.protocol !== 'file:' && event.origin !== location.origin)) return
		if (event.data?.type === 'tech-foundations-ready') transmit(navigation.current)
		if (
			event.data?.type === 'tech-foundations-slide' &&
			Number.isInteger(event.data.index) &&
			event.data.index >= 0 &&
			event.data.index < navigation.total
		)
			navigation.go(event.data.index, false)
	})
	return {
		openPresenter() {
			const url = new URL(location.href)
			url.searchParams.set('presenter', '1')
			presenterWindow = window.open(url.href, 'tech-foundations-presenter', 'popup,width=1200,height=850')
			if (!presenterWindow) showToast('Permití ventanas emergentes para abrir las notas del docente.')
			else presenterWindow.focus()
		},
		ready() {
			if (isPresenter && window.opener) window.opener.postMessage({ type: 'tech-foundations-ready' }, targetOrigin)
		},
	}
}
