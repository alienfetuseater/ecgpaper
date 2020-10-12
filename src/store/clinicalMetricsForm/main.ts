import { CFradioInput, CFrangeInput } from 'interfaces'

export default function clinicalMetricsState(
	formDataMap: Map<string, CFradioInput | CFrangeInput>,
): { init: Map<string, CFradioInput | CFrangeInput> } {
	// make proxy
	const createNewProxies = (formFeature: CFradioInput | CFrangeInput) => {
		return new Proxy(formFeature, {
			get: function (target, property: number | string) {
				return target[property]
			},
			set: function (target, property: number | string, value) {
				target[property] = value
				// console statement
				console.log((target[property], value))
				return true
			},
		})
	}

	const constructor = () => {
		const formStateMap: Map<string, CFradioInput | CFrangeInput> = new Map()
		formDataMap.forEach((value, key) => {
			// do stuff
			formStateMap.set(key, createNewProxies(value))
		})
		return formStateMap
	}

	return {
		init: constructor(),
	}
}
