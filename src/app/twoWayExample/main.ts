import Form from '@/components/Form'
import Data from '@/assets/rhythms.json'
import Section from '@/components/Section'
import Store from '@/store/main'
import { formFeatureInterface } from 'interfaces'

export default function main2WB(): { init: void } {
	const constructor = () => {
		const store = Store(Data).init
		Section(store)
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
	}

	return {
		init: constructor(),
	}
}
