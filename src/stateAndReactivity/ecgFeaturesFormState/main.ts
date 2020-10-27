import { formFeatureObject } from 'interfaces'

export default function formStore(
	formDataMap: Map<string, formFeatureObject[]>,
): { init: Map<string, formFeatureObject[]> } {
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
		const formStateMap: Map<string, formFeatureObject[]> = new Map()
		formDataMap.forEach((value, key) => {
			const formFeatureArray: formFeatureObject[] = []
			value.forEach((formFeature) => {
				formFeatureArray.push(createProxies(formFeature))
			})
			formStateMap.set(key, formFeatureArray)
		})
		return formStateMap
	}
	return {
		init: constructor(),
	}
}
