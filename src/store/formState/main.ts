import { formFeatureObject, formFeatureStateObject } from 'interfaces'
import State from '@/store/formState/state'

export default function formStore(
	formFeatureMap: Map<string, formFeatureObject>,
) {
	const constructor = () => {
		const formFeatureStateMap: Map<
			string,
			formFeatureStateObject
		> = new Map()
		return formFeatureStateMap
	}
	return {
		init: constructor(),
	}
}
