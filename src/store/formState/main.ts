import { formFeatureObject, formStateObject } from 'interfaces'
import State from '@/store/formState/state'

/**
 *
 * main will import the state for all the leads, and use a foreach loop
 * to pass it to the store factory function
 * the the array that is returned from each call to the state store function
 * will be proxied, then put into the state array
 * that state array is what will be returned from main as the store
 */

export default function formStore(formFeatureArray: formFeatureObject[]) {
	const constructor = () => {
		const formStateArray: formStateObject = []
		return formStateArray
	}
	return {
		init: constructor(),
	}
}
