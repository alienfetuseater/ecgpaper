import { stateObject } from 'interfaces'

export default function section(data: stateObject[]): { init: void } {
	// const createProxies = () => {
	// 	// create proxies for each object in data, this will be where the view is updated
	// 	data.forEach((lead) => {
	// 		return new Proxy(lead, {
	// 			set(target, property, value) {
	// 				console.log('attempt to set new value')
	// 				target[String(property)] = value
	// 				console.log(value)
	// 				// here we will have to set the new text content
	// 				const li = document.querySelector(
	// 					'[data-model=`${target.Lead}-${String(property)}`]',
	// 				)
	// 				li.textContent = String(value)
	// 				return true
	// 			},
	// 		})
	// 	})
	// }

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
		// createProxies()
	}
	return {
		init: constructor(),
	}
}
