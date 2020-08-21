import { leadObject, stateObject } from 'interfaces'
import State from '@/store/state'
import Processor from '@/app/svgExample/Processor'

export default function Store(leads: leadObject[]): { init: stateObject[] } {
	//

	const createProxies = (stateObject: stateObject) => {
		return new Proxy(stateObject, {
			set(target, property, value) {
				console.log('attempt to set new value')
				target[String(property)] = value

				const g = document.querySelector(`#${target.Lead}`)
				while (g.firstChild) {
					g.removeChild(g.firstChild)
				}
				const processor = Processor(target)
				processor.init
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
