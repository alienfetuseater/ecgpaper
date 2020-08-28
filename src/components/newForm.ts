import { stateObject } from 'interfaces'

export default function sideForm(store: stateObject[]): { init: void } {
	const main = document.querySelector('main')

	let lead: number | string | undefined = undefined
	let feature: string | undefined = undefined
	let characteristic: string | undefined = undefined

	const LeadSelect = (): HTMLSelectElement => {
		// let lead: number | string | undefined = undefined

		const select = document.createElement('select')
		select.setAttribute('id', 'lead-select')

		const option = document.createElement('option')
		option.setAttribute('value', undefined)
		option.textContent = '--Please Select A Lead--'
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

	const FeatureSelect = (): HTMLSelectElement => {
		// let feature: string | undefined = undefined

		const select = document.createElement('select')
		select.setAttribute('id', 'feature-select')

		const option = document.createElement('option')
		option.setAttribute('value', undefined)
		option.textContent = '--Select Wave Feature--'
		select.appendChild(option)

		const featuresArray = [
			'pwave',
			'printerval',
			'qrs',
			'stinterval',
			'twave',
		]

		for (let i = 0; i < featuresArray.length; i++) {
			const option = document.createElement('option')
			option.setAttribute('value', featuresArray[i])
			option.textContent = featuresArray[i]
			select.appendChild(option)
		}
		select.addEventListener('change', (e: Event) => {
			feature = (e.target as HTMLSelectElement).value
		})
		return select
	}

	const CharacteristicSelect = (): HTMLSelectElement => {
		const select = document.createElement('select')
		select.setAttribute('id', 'characteristic-select')

		const option = document.createElement('option')
		option.setAttribute('value', undefined)
		option.textContent = '--Select characteristic Feature--'
		select.appendChild(option)

		const characteristicArray = ['amplitude', 'width']

		for (let i = 0; i < characteristicArray.length; i++) {
			const option = document.createElement('option')
			option.setAttribute('value', characteristicArray[i])
			option.textContent = characteristicArray[i]
			select.appendChild(option)
		}
		select.addEventListener('change', (e: Event) => {
			characteristic = (e.target as HTMLSelectElement).value
		})
		return select
	}

	// actual form for inputs and sliders to adjust things
	const form = (): HTMLFormElement => {
		const form = document.createElement('form')

		const leadLabel = document.createElement('label')
		leadLabel.setAttribute('for', 'lead-select')
		leadLabel.textContent = 'select lead you wish to edit'
		form.appendChild(leadLabel)
		const leadSelect = LeadSelect()
		form.appendChild(leadSelect)

		const featureLabel = document.createElement('label')
		featureLabel.setAttribute('for', 'feature-select')
		featureLabel.textContent = 'select feature you wish to edit'
		form.appendChild(featureLabel)
		const featureSelect = FeatureSelect()
		form.appendChild(featureSelect)

		const characteristiclabel = document.createElement('label')
		characteristiclabel.setAttribute('for', 'characteristic-select')
		characteristiclabel.textContent =
			'select characteristic you wish to edit'
		form.appendChild(characteristiclabel)
		const characteristicSelect = CharacteristicSelect()
		form.appendChild(characteristicSelect)

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
