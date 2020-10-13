export default function qtInterval(): { init: void } {
	const constructor = () => {
		// stuff
		console.log('qt interval')
	}

	return {
		init: constructor(),
	}
}
