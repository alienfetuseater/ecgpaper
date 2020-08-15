import Aside from '@/components/form'
import data from '@/assets/rhythms.json'
import Section from '@/components/section'

export default function main2WB(): { init: void } {
	const store = () => {
		// store
	}

	const constructor = () => {
		const section = Section()
		const aside = Aside()
		section
		aside
	}

	return {
		init: constructor(),
	}
}
