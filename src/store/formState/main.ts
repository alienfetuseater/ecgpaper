import { formFeatureObject, formStateObject } from 'interfaces'
import formFeatures from './formFeatures'

export default function formStore() {
	const constructor = () => {
		const formStateArray: formStateObject = []
		return formStateArray
	}
	return {
		init: constructor(),
	}
}
