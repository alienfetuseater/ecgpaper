export default function section(): { init: void } {
	const section = () => {
		const main = document.querySelector('main')
		const section = document.createElement('section')
		section.style.position = 'relative'
		section.style.top = section.style.left = '50%'
		section.innerHTML = 'sections inner html'
		main.appendChild(section)
	}
	const constructor = () => {
		section()
	}
	return {
		init: constructor(),
	}
}
