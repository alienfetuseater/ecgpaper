import { stateObject } from 'interfaces'

// this component creates the markup for the form and takes user input and sends it to state
export default function sideForm(store: stateObject[]): { init: void } {
	const main = document.querySelector('main')

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

	const aside = (form: HTMLFormElement) => {
		const aside = document.createElement('aside')
		aside.appendChild(form)
		main.appendChild(aside)
	}

	const form = (): HTMLFormElement => {
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
		return form
	}

	const constructor = () => {
		aside(form())
	}
	return {
		init: constructor(),
	}
}
