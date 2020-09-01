import { stateObject, FormFeatures } from 'interfaces'

export default function sideForm(
	store: stateObject[],
	formFeatures: FormFeatures[],
): { init: void } {
	const main = document.querySelector('main')

	interface Lead {
		[index: string]: string | undefined
		leadIndex: string | undefined
		leadName: string | undefined
	}
	const lead: Lead = {
		leadIndex: undefined,
		leadName: undefined,
	}

	const leadProxy = new Proxy(lead, {
		get(target, property: string | undefined) {
			return target[property]
		},
		set(target, property: string | undefined, value) {
			const legend = document.querySelector('legend')
			switch (value) {
				case 'undefined':
					legend.textContent = 'lead: undefined'
					break

				case 'global':
					legend.textContent = 'lead: global'
					break
				default:
					target.leadName = store[value].lead
					legend.textContent = `lead: ${target.leadName}`
					break
			}
			target[property] = value
			return true
		},
	})

	const LeadSelect = (): HTMLSelectElement => {
		const select = document.createElement('select')
		select.setAttribute('id', 'lead-select')

		const option = document.createElement('option')
		option.setAttribute('value', undefined)
		option.setAttribute('label', '--Please Select A Lead--')
		select.appendChild(option)

		const optionTwo = document.createElement('option')
		optionTwo.setAttribute('value', 'global')
		optionTwo.setAttribute('label', 'global')
		select.appendChild(optionTwo)

		store.forEach((lead, index) => {
			const option = document.createElement('option')
			option.setAttribute('value', String(index))
			option.setAttribute('label', lead.lead)
			select.appendChild(option)
		})
		select.addEventListener('change', (e: Event) => {
			leadProxy.leadIndex = (e.target as HTMLSelectElement).value
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

		const fieldSet = document.createElement('fieldset')
		const legend = document.createElement('legend')
		legend.textContent = 'lead: undefined'
		fieldSet.appendChild(legend)
		// iife
		;((formFeatures: FormFeatures[]) => {
			let featureName: string | undefined = undefined
			formFeatures.forEach((el: FormFeatures) => {
				const p = document.createElement('p')
				if (featureName != el.feature) {
					const h4 = document.createElement('h4')
					h4.textContent = el.feature
					p.appendChild(h4)
				}
				const label = document.createElement('label')
				label.textContent = el.characteristic
				label.setAttribute(
					'for',
					`${el.feature.concat(el.characteristic)}`,
				)
				const input = document.createElement('input')
				input.setAttribute('type', 'range')
				input.setAttribute('name', `${el.feature}.${el.characteristic}`)
				input.setAttribute(
					'id',
					`${el.feature.concat(el.characteristic)}`,
				)
				input.setAttribute('max', String(el.max))
				input.setAttribute('min', String(el.min))
				input.setAttribute('value', String(el.value))
				switch (leadProxy.leadName) {
					case 'undefined':
						console.log('must pick a lead first')
						break
					case 'global':
						// handle global here
						break
					default:
						input.addEventListener('change', (e: Event) => {
							const stateObject =
								store[Number(leadProxy.leadIndex)]
							for (const property in stateObject) {
								if (property === input.id) {
									stateObject[property] = input.value
								}
							}
						})
						break
				}

				label.appendChild(input)
				p.appendChild(label)
				fieldSet.appendChild(p)
				featureName = el.feature
			})
		})(formFeatures)
		form.appendChild(fieldSet)

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
