import { stateObject } from 'interfaces'

export default function section(data: stateObject[]): { init: void } {
	const section = () => {
		const main = document.querySelector('main')
		const section = document.createElement('section')
		section.style.position = 'relative'
		section.style.top = section.style.left = '50%'

		const ul = document.createElement('ul')
		for (let i = 0; i < data.length; i++) {
			const li = document.createElement('li')
			li.textContent = `pwave amplitude is: ${String(
				data[i].pWaveAmplitude,
			)} for lead: ${data[i].Lead}`
			ul.appendChild(li)
		}
		section.appendChild(ul)
		main.appendChild(section)
	}
	const constructor = () => {
		section()
	}
	return {
		init: constructor(),
	}
}
