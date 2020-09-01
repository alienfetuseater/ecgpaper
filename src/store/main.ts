import { leadObject, stateObject } from 'interfaces'
import State from '@/store/state'

export default function Store(
	leads: leadObject[],
	processor: (lead: stateObject) => void,
): { init: stateObject[] } {
	// create proxies

	const createProxies = (stateObject: stateObject) => {
		processor(stateObject)

		return new Proxy(stateObject, {
			get(target, property: string | number) {
				// console.log('STORE PROPERTIES ACCESSED')
				return target[property]
			},

			set: function (target, property: string | number, value) {
				console.log('CHANGE DETECTED IN STORE')
				const g = document.querySelector(`#${target.lead}`)
				while (g.firstChild) {
					g.removeChild(g.firstChild)
				}
				target[property] = value
				processor(target)

				return true
			},
		})
	}

	const constructor = (): stateObject[] => {
		const stateArray: stateObject[] = []

		leads.forEach((lead) => {
			const stateObject = State(lead)
			const proxiedObject = createProxies(stateObject)
			stateArray.push(proxiedObject)
		})
		return stateArray
	}

	return {
		init: constructor(),
	}
}
