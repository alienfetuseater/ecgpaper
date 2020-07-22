import ECGpaper from './ECGpaper'
import data from '@/assets/rhythms2.json'
import Processor from './CurveGenerator.js'

export default function mainSVG() {
	const height = window.innerHeight * (13 / 16)
	const width = height * (11.69 / 8.27)

	let constructor = function () {
		const ecgPaper = ECGpaper(width, height)
		ecgPaper

		// processor adds ecg leads to svg document created above
		data.forEach((el) => {
			let processor = Processor(el, width, height)
			processor.init()
		})
	}

	return {
		init: constructor(),
	}
}
