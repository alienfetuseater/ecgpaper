// eslint-disable-next-line @typescript-eslint/no-var-requires
const data = require('../../assets/rhythms.json')
import ECGpaper from './ECGpaper'
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
11353039

7597

11353039
