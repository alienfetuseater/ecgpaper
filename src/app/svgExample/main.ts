import leadData from '@/store/ecgState/rhythms/nsr'
import formData from '@/store/formState/formFeaturesState'
import ECGpaper from '@/components/ECGpaper'
import Processor from './Processor'
import Form from '@/components/form/Form'
import Store from '@/store/ecgState/main'

export default function mainSVG(): { init: void } {
	const xmlns = 'http://www.w3.org/2000/svg'
	const canvasHeight = window.innerHeight * (13 / 16)
	const canvasWidth = canvasHeight * (11.69 / 8.27)
	const NMBRHORIZSMLBXS = 275
	const NMBRVERTSMLBXS = 212
	const horizontalMM = canvasWidth / NMBRHORIZSMLBXS
	const verticalMM = canvasHeight / NMBRVERTSMLBXS

	const constructor = function (): void {
		ECGpaper(canvasWidth, canvasHeight)
		const svg = document.querySelector('svg')

		const processor = Processor(
			svg,
			xmlns,
			canvasHeight,
			canvasWidth,
			horizontalMM,
			verticalMM,
		)
		const leadStore = Store(leadData, processor).init
		Form(leadStore, formData)
	}

	return {
		init: constructor(),
	}
}
