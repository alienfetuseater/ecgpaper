export default function heartRate(): { init: void } {
	const constructor = () => {
		// stuff
		console.log('heart rate')
	}

	return {
		init: constructor(),
	}
}
