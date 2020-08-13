export default function sideForm(): { init: void } {
	// create an array of data defining buttons and purposess
	const featureToManipulateArray: string[] = [
		'pwave',
		'printerval',
		'qrs',
		'st',
		'twave',
	]
	const constructor = () => {
		// create forms and buttons, place absolutely so doesnt mess with placement of ecg paper
		const main = document.querySelector('main')
		const aside = document.createElement('aside')
		main.appendChild(aside)
		const form = document.createElement('form')
		// parse array from above and create input fields for each of those and then lets get style worked out
		aside.appendChild(form)
	}
	return {
		init: constructor(),
	}
}
