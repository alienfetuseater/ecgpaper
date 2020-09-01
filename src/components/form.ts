import { stateObject, FormFeatures, Lead } from 'interfaces'

export default function sideForm(
	store: stateObject[],
	formFeatures: FormFeatures[],
): { init: void } {
	const main = document.querySelector('main')

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
					target.leadName = 'undefined'
					target.leadIndex = 'undefined'
					legend.textContent = 'lead: undefined'
					break

				case 'global':
					target.leadName = 'global'
					target.leadIndex = 'global'
					legend.textContent = 'lead: global'
					break
				default:
					target.leadName = store[value].lead
					target.leadIndex = value
					legend.textContent = `lead: ${target.leadName}`
					break
			}
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

				input.addEventListener('change', (e: Event) => {
					switch (leadProxy.leadName) {
						case 'undefined':
							console.log(
								'must pick a lead first',
								String(leadProxy.leadName),
							)
							break
						case 'global':
							console.log('global lead selected and changed')
							store.forEach((stateObject) => {
								for (const property in stateObject) {
									if (property === input.id) {
										stateObject[property] = input.value
									}
								}
							})
							break
						default:
							for (const property in store[
								Number(leadProxy.leadIndex)
							]) {
								if (property === input.id) {
									store[Number(leadProxy.leadIndex)][
										property
									] = input.value
								}
							}
							break
					}
				})

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
