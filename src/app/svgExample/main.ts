import data from '@/assets/rhythms.json'
import ECGpaper from '@/components/ECGpaper'
import Processor from './Processor'
// import Aside from '@/components/form'
// import Store from '@/store/main'
import { leadObject } from 'interfaces'

export default function mainSVG(): { init: void } {
	const height = window.innerHeight * (13 / 16)
	const width = height * (11.69 / 8.27)

	const constructor = function (): void {
		ECGpaper(width, height)
		// const store = Store(data).init
		// Aside(store)

		data.forEach((el: leadObject) => {
			const processor = Processor(el, width, height)
			processor.init
		})
	}

	return {
		init: constructor(),
	}
}
