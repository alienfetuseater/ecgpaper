export default function sideForm(): { init: void } {
	// create an array of data defining buttons and purposess
	const featureToManipulateArray: string[] = [
		'p-wave amplitude',
		'p-wave duration',
		'pr segment length',
		'qrs-wave amplitude',
		'qrs-wave duration',
		'st segment length',
		't wave amplitude',
		't wave duration',
		'tp interval length',
	]

	const constructor = () => {
		const main = document.querySelector('main')
		const aside = document.createElement('aside')
		const form = document.createElement('form')

		featureToManipulateArray.forEach((el) => {
			const label = document.createElement('label')
			label.setAttribute('for', el)
			label.innerHTML = el

			const input = document.createElement('input')
			input.setAttribute('type', 'range')
			input.setAttribute('id', el)
			input.setAttribute('data-wave-feature', el)

			form.appendChild(label)
			form.appendChild(input)
		})

		aside.appendChild(form)
		main.appendChild(aside)
	}
	return {
		init: constructor(),
	}
}
