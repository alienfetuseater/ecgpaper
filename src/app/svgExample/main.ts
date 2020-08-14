import data from '@/assets/rhythms.json'
import ECGpaper from './ECGpaper'
import Processor from './Processor'
import sideForm from './form'
import { leadObject } from 'myLib'

export default function mainSVG(): { init: void } {
	const height = window.innerHeight * (13 / 16)
	const width = height * (11.69 / 8.27)

	const constructor = function (): void {
		const ecgPaper = ECGpaper(width, height)
		ecgPaper

		const aside = sideForm()
		aside

		data.forEach((el: leadObject) => {
			const processor = Processor(el, width, height)
			processor.init
		})
	}

	return {
		init: constructor(),
	}
}
