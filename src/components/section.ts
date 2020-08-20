import { stateObject } from 'interfaces'

export default function section(data: stateObject[]): { init: void } {
	const section = () => {
		const main = document.querySelector('main')
		const section = document.createElement('section')

		data.forEach((lead) => {
			const ul = document.createElement('ul')
			for (const property in lead) {
				const li = document.createElement('li')
				li.setAttribute(
					'data-model',
					`${lead.Lead}-${String(property)}`,
				)
				li.textContent = `${String(property)}: ${String(
					lead[property],
				)}`
				ul.appendChild(li)
			}
			section.appendChild(ul)
		})

		main.appendChild(section)
	}
	const constructor = () => {
		section()
	}
	return {
		init: constructor(),
	}
}
