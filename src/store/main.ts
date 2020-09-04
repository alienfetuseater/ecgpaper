import { leadObject, stateObject } from 'interfaces'
import State from '@/store/state'

export default function Store(
	leads: leadObject[],
	processor: (lead: stateObject) => void,
): { init: stateObject[] } {
	const createProxies = (stateObject: stateObject) => {
		processor(stateObject)

		return new Proxy(stateObject, {
			get: function (target, property: string | number) {
				return target[property]
			},

			set: function (target, property: string | number, value) {
				console.log(value)
				target[property] = value
				const g: SVGElement = document.querySelector(`#${target.lead}`)
				g.remove()
				processor(target)
				return true
			},
		})
	}

	const constructor = (): stateObject[] => {
		const stateArray: stateObject[] = []

		leads.forEach((lead) => {
			const stateObject = State(lead)
			const proxiedStateObject = createProxies(stateObject)
			stateArray.push(proxiedStateObject)
		})
		return stateArray
	}

	return {
		init: constructor(),
	}
}
