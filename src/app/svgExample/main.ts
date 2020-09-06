import data from '@/store/rhythms/nsr'
import ECGpaper from '@/components/ECGpaper'
import Processor from './Processor'
import Form from '@/components/form/Form'
import Store from '@/store/main'
import { FormFeatures } from 'interfaces'

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
			feature: 'pwave',
			characteristic: 'amplitude',
			min: 1,
			max: 15,
			value: 2,
			increment: 0.1,
		},
		{
			feature: 'pwave',
			characteristic: 'width',
			min: 1,
			max: 10,
			value: 3,
			increment: 0.1,
		},
		{
			feature: 'printerval',
			characteristic: 'width',
			min: 1,
			max: 13,
			value: 1,
			increment: 0.1,
		},
		{
			feature: 'qrswave',
			characteristic: 'amplitude',
			min: -10,
			max: 15,
			value: 10,
			increment: 0.1,
		},
		{
			feature: 'qrswave',
			characteristic: 'width',
			min: 2,
			max: 5,
			value: 3,
			increment: 0.1,
		},
		{
			feature: 'stinterval',
			characteristic: 'width',
			min: 1,
			max: 13,
			value: 1,
			increment: 0.1,
		},
		{
			feature: 'twave',
			characteristic: 'amplitude',
			min: -3,
			max: 10,
			value: 5,
			increment: 0.1,
		},
		{
			feature: 'twave',
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
			horizontalMM,
			verticalMM,
		)
		const store = Store(data, processor).init
		Form(store, formFeatures)
	}

	return {
		init: constructor(),
	}
}
