import Aside from '@/components/form'
import Data from '@/assets/rhythms.json'
import Section from '@/components/section'
import Store from '@/store/main'

export default function main2WB(): { init: void } {
	const constructor = () => {
		Section()
		Aside()
		Store(Data)
	}

	return {
		init: constructor(),
	}
}
