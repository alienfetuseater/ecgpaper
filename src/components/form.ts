import { stateObject, formFeatureInterface } from 'interfaces'

export default function sideForm(
	store: stateObject[],
	featureToManipulateArray: formFeatureInterface[],
): { init: void } {
	const main = document.querySelector('main')

	const aside = (form: HTMLFormElement) => {
		const aside = document.createElement('aside')
		aside.appendChild(form)
		main.appendChild(aside)
	}

	const form = (): HTMLFormElement => {
		const form = document.createElement('form')

		featureToManipulateArray.forEach((el) => {
			const label = document.createElement('label')
			label.setAttribute('for', el.feature)
			label.textContent = el.feature

			const input = document.createElement('input')
			input.setAttribute('type', 'range')
			input.setAttribute('id', el.feature)
			input.setAttribute('min', String(el.min))
			input.setAttribute('max', String(el.max))
			input.setAttribute('increment', String(el.increment))
			input.setAttribute('data-wave-feature', el.feature)

			const datalist = document.createElement('datalist')
			datalist.setAttribute('id', 'tickmarks')

			const incrementer = (el.max - el.min) / 10
			for (let i = el.min; i < el.max; i += incrementer) {
				const option = document.createElement('option')
				option.setAttribute('value', String(i))
				datalist.appendChild(option)
			}
			input.setAttribute('list', 'tickmarks')

			form.appendChild(label)
			form.appendChild(input)
			form.appendChild(datalist)
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
