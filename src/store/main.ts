import { leadObject, stateObject } from 'interfaces'
import State from '@/store/state'

export default function Store(
	leads: leadObject[],
	processor: (lead: stateObject) => void,
): { init: stateObject[] } {
	const createProxies = (stateObject: stateObject) => {
		return new Proxy(stateObject, {
			set(target, property, value) {
				const g = document.querySelector(`#${target.Lead}`)
				while (g.firstChild) {
					g.removeChild(g.firstChild)
				}
				target[String(property)] = value
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
