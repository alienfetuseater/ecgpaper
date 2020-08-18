import Aside from '@/components/form'
import Data from '@/assets/rhythms.json'
import Section from '@/components/section'
import Store from '@/store/main'
import { stateObject } from 'interfaces'

export default function main2WB(): { init: void } {
	const constructor = () => {
		const store = Store(Data).init
		Section(store)
		Aside(store)
	}

	return {
		init: constructor(),
	}
}
