import { stateObject, formFeatureInterface } from 'interfaces'

export default function sideForm(
	store: stateObject[],
	featureToManipulateArray: formFeatureInterface[],
): { init: void } {
	const main = document.querySelector('main')

	let lead: number | undefined = undefined

	const aside = (form: HTMLFormElement) => {
		const aside = document.createElement('aside')
		aside.appendChild(form)
		main.appendChild(aside)
	}

	const form = (): HTMLFormElement => {
		const form = document.createElement('form')

		const label = document.createElement('label')
		label.setAttribute('for', 'lead-select')
		label.textContent = 'which lead do you want to edit?'

		const select = document.createElement('select')
		select.setAttribute('id', 'lead-select')

		const option = document.createElement('option')
		option.setAttribute('value', '')
		option.textContent = '--Please Select A Value--'
		select.appendChild(option)

		store.forEach((lead, index) => {
			const option = document.createElement('option')
			option.setAttribute('value', String(index))
			option.textContent = lead.Lead
			select.appendChild(option)
		})
		select.addEventListener('change', (e: Event) => {
			lead = Number((e.target as HTMLSelectElement).value)
		})
		form.appendChild(label)
		form.appendChild(select)

		featureToManipulateArray.forEach((el) => {
			/**
			 * el just comes from the array thats used to populate structure of form, not from the store or state
			 */
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

			input.addEventListener('input', (e: Event) => {
				if (typeof lead === 'number') {
					const stateObject = store[lead]

					for (const key in stateObject) {
						if (key === el.feature) {
							stateObject[key] = input.value
							console.log(stateObject[key])
						}
					}
				} else {
					console.log('you need to choose a lead first')
				}
			})

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
