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

		console.log(
			`canvas height: ${canvas.height}, canvas width: ${canvas.width}`,
		)

		// set up ecg paper
		const ecgPaper = ECGpaper(ctx, canvas.height, canvas.width)
		ecgPaper

		// add all rhythms to ecg paper
		data.forEach((el) => {
			Processor(ctx, el, canvas.width, canvas.height)
		})

		// append canvas to main tag
		main.appendChild(canvas)
	}

	return {
		init: constructor(),
	}
}
