import ECGpaper from './ECGpaper'
import data from '@/assets/rhythms.json'
import Processor from './CurveGenerator.js'

export default function canvasECG() {
	const constructor = () => {
		// set up canvas
		const main = document.querySelector('main')
		const canvas = document.createElement('canvas')
		const ctx = canvas.getContext('2d')
		canvas.height = window.innerHeight * (7 / 8)
		canvas.width = canvas.height * (11.69 / 8.27)

		// ecg paper
		const ecgPaper = ECGpaper(ctx, canvas.height, canvas.width)
		ecgPaper
		main.appendChild(canvas)
		data.forEach((el) => {
			let processor = Processor(ctx, el, canvas.width, canvas.height)
			processor.init()
		})
	}

	return {
		init: constructor(),
	}
}
