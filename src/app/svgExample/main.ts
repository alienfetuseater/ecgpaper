import data from '@/assets/rhythms.json'
import ECGpaper from '@/components/ECGpaper'
import Processor from './Processor'
import Form from '@/components/newForm'
// import Form from '@/components/Form'
import Store from '@/store/main'
import { stateObject, FormFeatures } from 'interfaces'

export default function mainSVG(): { init: void } {
	const xmlns = 'http://www.w3.org/2000/svg'
	const canvasHeight = window.innerHeight * (13 / 16)
	const canvasWidth = canvasHeight * (11.69 / 8.27)
	const NMBRHORIZSMLBXS = 275
	const NMBRVERTSMLBXS = 212
	const horizontalMM = canvasWidth / NMBRHORIZSMLBXS
	const verticalMM = canvasHeight / NMBRVERTSMLBXS
	const formFeatures: FormFeatures[] = [
		{
			feature: 'pWave',
			characteristic: 'amplitude',
			min: 1,
			max: 15,
			value: 2,
			increment: 0.1,
		},
		{
			feature: 'pWave',
			characteristic: 'width',
			min: 1,
			max: 3,
			value: 3,
			increment: 0.1,
		},
		{
			feature: 'prSegment',
			characteristic: 'width',
			min: 1,
			max: 3,
			value: 1,
			increment: 0.1,
		},
		{
			feature: 'qrsWave',
			characteristic: 'amplitude',
			min: -10,
			max: 15,
			value: 10,
			increment: 0.1,
		},
		{
			feature: 'qrsWave',
			characteristic: 'width',
			min: 2,
			max: 5,
			value: 3,
			increment: 0.1,
		},
		{
			feature: 'stSegment',
			characteristic: 'width',
			min: 1,
			max: 3,
			value: 1,
			increment: 0.1,
		},
		{
			feature: 'tWave',
			characteristic: 'amplitude',
			min: -3,
			max: 10,
			value: 5,
			increment: 0.1,
		},
		{
			feature: 'tWave',
			characteristic: 'width',
			min: 5,
			max: 10,
			value: 5,
			increment: 0.1,
		},
	]

	const constructor = function (): void {
		ECGpaper(canvasWidth, canvasHeight)
		const svg = document.querySelector('svg')

		const processor = Processor(
			svg,
			xmlns,
			canvasHeight,
			canvasWidth,
			NMBRHORIZSMLBXS,
			horizontalMM,
			verticalMM,
		)
		const store = Store(data, processor).init
		Form(store, formFeatures)
		// Form(store, featureToManipulateArray)

		// store.forEach((el: stateObject) => {
		// 	processor(el)
		// })
		// processor(store[3])
	}

	return {
		init: constructor(),
	}
}
