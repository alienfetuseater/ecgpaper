import leadData from '@/store/ecgState/rhythms/nsr'
import formData from '@/store/formState/formFeaturesState'
import ECGpaper from '@/components/ECGpaper'
import Processor from './Processor'
import Form from '@/components/form/main'
import EcgStore from '@/store/ecgState/main'
import FormStore from '@/store/formState/main'

export default function mainSVG(): { init: void } {
	const xmlns = 'http://www.w3.org/2000/svg'
	const canvasHeight = window.innerHeight * (13 / 16)
	const canvasWidth = canvasHeight * (11.69 / 8.27)
	const NMBRHORIZSMLBXS = 275
	const NMBRVERTSMLBXS = 212
	const horizontalMM = canvasWidth / NMBRHORIZSMLBXS
	const verticalMM = canvasHeight / NMBRVERTSMLBXS

	const constructor = function (): void {
		const main = document.querySelector('main')
		const section = document.createElement('section')
		main.appendChild(section)
		const svg = document.createElementNS(xmlns, 'svg')

		ECGpaper(canvasWidth, canvasHeight, svg)
		const processor = Processor(
			svg,
			xmlns,
			canvasHeight,
			canvasWidth,
			horizontalMM,
			verticalMM,
		)
		const leadStore = EcgStore(leadData, processor).init
		const formStore = FormStore(formData).init
		Form(leadStore, formStore)
		// ECGpaper(canvasWidth, canvasHeight, svg)
	}

	return {
		init: constructor(),
	}
}
