import { leadObject, stateObject } from 'interfaces'
import State from '@/store/state'

export default function Store(leads: leadObject[]): { init: stateObject[] } {
	const constructor = (): stateObject[] => {
		const stateArray: stateObject[] = []
		leads.forEach((lead) => {
			stateArray.push(State(lead))
		})
		// console.log(stateArray)
		return stateArray
	}
	return {
		init: constructor(),
	}
}
