import data from '@/assets/rhythms.json'
import ECGpaper from '@/components/ECGpaper'
import Processor from './Processor'
import Form from '@/components/Form'
import Store from '@/store/main'
import { stateObject, formFeatureInterface } from 'interfaces'

export default function mainSVG(): { init: void } {
	const height = window.innerHeight * (13 / 16)
	const width = height * (11.69 / 8.27)

	const constructor = function (): void {
		const store = Store(data).init
		ECGpaper(width, height)
		const featureToManipulateArray: formFeatureInterface[] = [
			{ feature: 'pWaveAmplitude', min: 0, max: 5, increment: 0.1 },
			{ feature: 'pWaveDuration', min: 0, max: 5, increment: 0.1 },
			{
				feature: 'prSegmentLength',
				min: 0,
				max: 5,
				increment: 0.1,
			},
			{
				feature: 'qrsWaveAmplitude',
				min: 0,
				max: 5,
				increment: 0.1,
			},
			{
				feature: 'qrsWaveDuration',
				min: 0,
				max: 5,
				increment: 0.1,
			},
			{
				feature: 'stSegmentLength',
				min: 0,
				max: 5,
				increment: 0.1,
			},
			{ feature: 'tWaveAmplitude', min: 0, max: 5, increment: 0.1 },
			{ feature: 'tWaveDuration', min: 0, max: 5, increment: 0.1 },
		]
		Form(store, featureToManipulateArray)

		store.forEach((el: stateObject) => {
			const processor = Processor(el)
			processor.init
		})
	}

	return {
		init: constructor(),
	}
}
