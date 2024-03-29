import leadData from '@/stateAndReactivity/ecgState/rhythms/nsr'
import formData from '@/stateAndReactivity/ecgFeaturesFormState/state'
import ECGpaper from '@/components/ECGpaper'
import Processor from './Processor'
import Form from '@/components/ecgFeaturesForm/main'
import EcgStore from '@/stateAndReactivity/ecgState/main'
import FormStore from '@/stateAndReactivity/ecgFeaturesFormState/main'
import ClinicalFeaturesForm from '@/components/clinicalMetricsForm/main'
import ClinicalFeaturesStore from '@/stateAndReactivity/clinicalMetricsForm/main'
import ClinicalFeaturesData from '@/stateAndReactivity/clinicalMetricsForm/state'

export default function mainSVG(): { init: void } {
	const xmlns = 'http://www.w3.org/2000/svg'
	const height = window.innerHeight * (13 / 16)
	const width = height * (11.69 / 8.27)
	const NMBRHORIZSMLBXS = 275
	const NMBRVERTSMLBXS = 212
	const horizontalMM = width / NMBRHORIZSMLBXS
	const verticalMM = height / NMBRVERTSMLBXS

	const constructor = function (): void {
		const main = document.querySelector('main')
		const section = document.createElement('section')
		main.appendChild(section)
		const svg = document.createElementNS(xmlns, 'svg')

		ECGpaper(width, height, svg)
		const processor = Processor(
			svg,
			xmlns,
			height,
			width,
			horizontalMM,
			verticalMM,
		)
		const leadStore = EcgStore(leadData, processor).init
		const formStore = FormStore(formData).init
		Form(leadStore, formStore)

		const clinicalFeaturesStore = ClinicalFeaturesStore(
			ClinicalFeaturesData,
		).init
		ClinicalFeaturesForm(clinicalFeaturesStore)
	}

	return {
		init: constructor(),
	}
}
