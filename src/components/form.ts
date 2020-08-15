// this component creates the markup for the form and takes user input and sends it to state
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

	const asideForm = () => {
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

	const constructor = () => {
		asideForm()
		// after creating the aside and form we have to listen to changes in the values of inputs
	}
	return {
		init: constructor(),
	}
}
