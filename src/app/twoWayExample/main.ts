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
			{
				feature: 'pWaveAmplitude',
				min: 1,
				max: 5,
				value: 2,
				increment: 0.1,
			},
			{
				feature: 'pWaveDuration',
				min: 1,
				max: 3,
				value: 3,
				increment: 0.1,
			},
			{
				feature: 'prSegmentLength',
				min: 1,
				max: 3,
				value: 1,
				increment: 0.1,
			},
			{
				feature: 'qrsWaveAmplitude',
				min: -10,
				max: 15,
				value: 10,
				increment: 0.1,
			},
			{
				feature: 'qrsWaveDuration',
				min: 2,
				max: 5,
				value: 3,
				increment: 0.1,
			},
			{
				feature: 'stSegmentLength',
				min: 1,
				max: 3,
				value: 1,
				increment: 0.1,
			},
			{
				feature: 'tWaveAmplitude',
				min: -3,
				max: 10,
				value: 5,
				increment: 0.1,
			},
			{
				feature: 'tWaveDuration',
				min: 5,
				max: 10,
				value: 5,
				increment: 0.1,
			},
		]

		Form(store, featureToManipulateArray)
	}

	return {
		init: constructor(),
	}
}
