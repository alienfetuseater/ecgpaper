import { formFeatureObject } from 'interfaces'

export default function formStore(
	formDataMap: Map<string, formFeatureObject[]>,
): { init: Map<string, formFeatureObject[]> } {
	/**
	 *
	 * part of the problem is the data has not been proxied,
	 * this script isnt being called any where yet
	 * we need to fix these errors and then figure out where to call this script
	 * probably in svgExample/main.
	 */

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
			/**
			 * so 'value' here is an formfeatureObject array, which is an array of objects
			 * and just like with the ecg state, we will have to proxy each object in the array,
			 * we cant just proxy the array itself
			 */
			const proxiedFeature = createProxies(value)
			formStateMap.set(key, proxiedFeature)
		})
		return formStateMap
	}
	return {
		init: constructor(),
	}
}
