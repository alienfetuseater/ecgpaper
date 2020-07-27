import ECGpaper from './ECGpaper'
import data from '@/assets/rhythms.json'
import Processor from './Processor'
import { componentObject, leadObject } from 'myLib'

export default function mainSVG(): componentObject {
	const height = window.innerHeight * (13 / 16)
	const width = height * (11.69 / 8.27)

	const constructor = function (): void {
		const ecgPaper = ECGpaper(width, height)
		ecgPaper

		// processor adds ecg leads to svg document created above
		data.forEach((el: leadObject) => {
			const processor = Processor(el, width, height)
			processor.init()
		})
	}

	return {
		init: constructor(),
	}
}
