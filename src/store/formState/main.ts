import { formFeatureObject } from 'interfaces'

export default function formStore(
	formFeatureMap: Map<string, formFeatureObject>,
): { init: Map<string, formFeatureObject> } {
	const createProxies = (formFeature: formFeatureObject) => {
		return new Proxy(formFeature, {
			get: function (target, property: number | string) {
				return target[property]
			},
			set: function (target, property: number | string, value) {
				target[property] = value
				return true
			},
		})
	}
	const constructor = () => {
		const formFeatureStateMap: Map<string, formFeatureObject> = new Map()
		formFeatureMap.forEach((value, key) => {
			const proxiedFeature = createProxies(value)
			formFeatureStateMap.set(key, proxiedFeature)
		})
		return formFeatureStateMap
	}
	return {
		init: constructor(),
	}
}
