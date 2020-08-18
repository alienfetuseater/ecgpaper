import Aside from '@/components/form'
import Data from '@/assets/rhythms.json'
import Section from '@/components/section'
import Store from '@/store/main'
import { formFeatureInterface } from 'interfaces'

export default function main2WB(): { init: void } {
	const constructor = () => {
		const store = Store(Data).init
		Section(store)
		const featureToManipulateArray: formFeatureInterface[] = [
			{ feature: 'p-wave amplitude', min: 0, max: 5, increment: 0.1 },
			{ feature: 'p-wave duration', min: 0, max: 5, increment: 0.1 },
			{
				feature: 'pr segment length',
				min: 0,
				max: 5,
				increment: 0.1,
			},
			{
				feature: 'qrs-wave amplitude',
				min: 0,
				max: 5,
				increment: 0.1,
			},
			{
				feature: 'qrs-wave duration',
				min: 0,
				max: 5,
				increment: 0.1,
			},
			{
				feature: 'st segment length',
				min: 0,
				max: 5,
				increment: 0.1,
			},
			{ feature: 't wave amplitude', min: 0, max: 5, increment: 0.1 },
			{ feature: 't wave duration', min: 0, max: 5, increment: 0.1 },
			{
				feature: 'tp interval length',
				min: 0,
				max: 5,
				increment: 0.1,
			},
		]
		Aside(store, featureToManipulateArray)
	}

	return {
		init: constructor(),
	}
}
