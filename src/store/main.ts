import { leadObject, stateObject } from 'interfaces'

export default function Store(leads: leadObject[]): { init: stateObject[] } {
	const constructor = (): stateObject[] => {
		const stateArray: stateObject[] = []
		/**
		 * here we take the lead object array were given,
		 * call the stateObject function to populate stateObject with relevant data from leadObject
		 * then push that object to stateArray.
		 * this is to initialize the state onload, does not account for chanes from
		 * user input
		 */
		return stateArray
	}
	return {
		init: constructor(),
	}
}
