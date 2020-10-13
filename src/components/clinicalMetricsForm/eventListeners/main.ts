import { CFradioInput, CFrangeInput } from 'interfaces'
import HeartRate from './heartRate'
import AxisDeviation from './axisDeviation'
import QtInterval from './qtInterval'
import RwaveProgression from './rWaveProgression'

export default function inputEventListener(
	input: HTMLInputElement,
	formState: Map<string, CFrangeInput | CFradioInput>,
): void {
	input.addEventListener('change', (e: Event) => {
		formState.get(input.id).value = (e.target as HTMLInputElement).value

		switch ((e.target as HTMLInputElement).name) {
			case 'heart rate':
				HeartRate()
				break
			case 'qt c':
				QtInterval()
				break
			case 'axis deviation':
				AxisDeviation()
				break
			case 'r wave progression':
				RwaveProgression()
				break

			default:
				break
		}
	})
}
