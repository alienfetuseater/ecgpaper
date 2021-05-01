import { leadObject, leadStateObject } from 'interfaces'
import State from '@/stateAndReactivity/ecgState/state'

export default function Store(
	leads: leadObject[],
	processor: (lead: leadStateObject) => void,
): { init: leadStateObject[] } {
	const createProxies = (leadStateObject: leadStateObject) => {
		processor(leadStateObject)

		return new Proxy(leadStateObject, {
			get: function (target, property: string | number) {
				return target[property]
			},

			set: function (target, property: string | number, value) {
				target[property] = value
				const g: SVGElement = document.querySelector(`#${target.lead}`)
				g.remove()
				processor(target)
				return true
			},
		})
	}

	const constructor = (): leadStateObject[] => {
		const stateArray: leadStateObject[] = []

		leads.forEach((lead) => {
			const leadStateObject = State(lead)
			const proxiedleadStateObject = createProxies(leadStateObject)
			stateArray.push(proxiedleadStateObject)
		})
		return stateArray
	}

	return {
		init: constructor(),
	}
}
