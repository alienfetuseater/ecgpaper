import { stateObject, formFeatureInterface } from 'interfaces'

export default function sideForm(
	store: stateObject[],
	featureToManipulateArray: formFeatureInterface[],
): { init: void } {
	const main = document.querySelector('main')
	const form = document.createElement('form')

	let lead: number | string | undefined = undefined

	// function defining drop down menu for selecting which lead to edit
	const Select = (): HTMLSelectElement => {
		const select = document.createElement('select')
		select.setAttribute('id', 'lead-select')

		const option = document.createElement('option')
		option.setAttribute('value', undefined)
		option.textContent = '--Please Select A Value--'
		select.appendChild(option)

		const optionTwo = document.createElement('option')
		optionTwo.setAttribute('value', 'global')
		optionTwo.textContent = 'global'
		select.appendChild(optionTwo)

		store.forEach((lead, index) => {
			const option = document.createElement('option')
			option.setAttribute('value', String(index))
			option.textContent = lead.lead
			select.appendChild(option)
		})
		select.addEventListener('change', (e: Event) => {
			lead = (e.target as HTMLSelectElement).value
		})
		return select
	}

	const leadSelect = (): HTMLSelectElement => {
		let lead: number | string | undefined = undefined

		const label = document.createElement('label')
		label.setAttribute('for', 'lead-select')
		label.textContent = 'select lead you wish to edit'
		form.appendChild(label)

		const select = document.createElement('select')
		select.setAttribute('id', 'lead-select')

		const option = document.createElement('option')
		option.setAttribute('value', undefined)
		option.textContent = '--Please Select A Value--'
		select.appendChild(option)

		const optionTwo = document.createElement('option')
		optionTwo.setAttribute('value', 'global')
		optionTwo.textContent = 'global'
		select.appendChild(optionTwo)

		store.forEach((lead, index) => {
			const option = document.createElement('option')
			option.setAttribute('value', String(index))
			option.textContent = lead.lead
			select.appendChild(option)
		})
		select.addEventListener('change', (e: Event) => {
			lead = (e.target as HTMLSelectElement).value
		})
		return select
	}

	const featureSelect = (): HTMLSelectElement => {
		let feature: string
		return feature
	}

	const characteristicSelect = (): HTMLSelectElement => {
		let characteristic: string
		return characteristic
	}

	// actual form for inputs and sliders to adjust things
	const form = (): HTMLFormElement => {
		const form = document.createElement('form')
		const label = document.createElement('label')
		label.setAttribute('for', 'lead-select')
		label.textContent = 'which lead do you want to edit?'

		// invocation for select menu function and appending to form
		const select = Select()
		form.appendChild(label)
		form.appendChild(select)

		featureToManipulateArray.forEach((el) => {
			const label = document.createElement('label')
			label.setAttribute('for', el.feature)
			label.textContent = el.feature

			const input = document.createElement('input')
			input.setAttribute('type', 'range')
			input.setAttribute('id', el.feature)
			input.setAttribute('min', String(el.min))
			input.setAttribute('max', String(el.max))
			input.setAttribute('value', String(el.value))
			input.setAttribute('increment', String(el.increment))
			input.setAttribute('data-wave-feature', el.feature)

			input.addEventListener('change', (e: Event) => {
				if (lead === 'global') {
					console.log('global was selected')
					store.forEach((lead) => {
						lead.complex.forEach((featureObject) => {
							for (const property in featureObject) {
								if (property === el.feature) {
									featureObject[property] = input.value
								}
							}
						})
					})
				} else if (lead === undefined) {
					console.log('you need to choose a lead first')
				} else {
					const stateObject = store[Number(lead)]
					console.log('feature: ', el.feature)
					stateObject.complex.forEach((featureObject) => {
						for (const property in featureObject) {
							console.log(featureObject[property])
							if (property === el.feature) {
								// console.log('feature: ', featureObject.feature)
								// console.log('property: ', property)
								featureObject[property] = input.value
							}
						}
					})
				}
			})

			form.appendChild(label)
			form.appendChild(input)
		})
		return form
	}

	// layout section for form on side
	const aside = (form: HTMLFormElement) => {
		const aside = document.createElement('aside')
		aside.appendChild(form)
		main.appendChild(aside)
	}

	return {
		init: aside(form()),
	}
}
