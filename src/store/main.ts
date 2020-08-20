import { leadObject, stateObject } from 'interfaces'
import State from '@/store/state'

export default function Store(leads: leadObject[]): { init: stateObject[] } {
	//

	const createProxies = (stateObject: stateObject) => {
		return new Proxy(stateObject, {
			set(target, property, value) {
				console.log('attempt to set new value')
				target[String(property)] = value
				console.log(value)
				const li = document.querySelector(
					`[data-model=${target.Lead}-${String(property)}]`,
				)
				li.textContent = `${String(property)}: ${String(value)}`
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
