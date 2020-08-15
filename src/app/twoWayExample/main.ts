import Aside from '@/components/form'
import Data from '@/assets/rhythms.json'
import Section from '@/components/section'
import State from '@/store/state'
import { leadObject } from 'interfaces'

export default function main2WB(): { init: void } {
	const initializeState = (data: leadObject[]) => {
		data.forEach((lead) => {
			// initialize state for each lead
		})
	}

	const constructor = () => {
		Section()
		Aside()
		initializeState(Data)
	}

	return {
		init: constructor(),
	}
}
