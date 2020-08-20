import { leadObject, stateObject } from 'interfaces'
import State from '@/store/state'

export default function Store(leads: leadObject[]): { init: stateObject[] } {
	//

	const createProxies = (stateObject: leadObject) => {
		return new Proxy(stateObject, {
			set(target, property, value) {
				console.log('attempt to set new value')
				target[property] = value
				console.log(value)
				const li = document.querySelector(
					'[data-model=`${target.Lead}-${String(property)}`]',
				)
				li.textContent = String(value)
				return true
			},
		})
	}

	const constructor = (): stateObject[] => {
		const stateArray: stateObject[] = []

		leads.forEach((lead) => {
			const stateObject = createProxies(lead)
			stateArray.push(State(stateObject))
		})
		return stateArray
	}

	return {
		init: constructor(),
	}
}
