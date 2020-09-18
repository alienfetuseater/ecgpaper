import { leadStateObject, formFeatureStateObject, Lead } from 'interfaces'
import Select from './Select'

export default function sideForm(
	leadStore: leadStateObject[],
	formStore: Map<string, formFeatureStateObject>,
): { init: void } {
	const main = document.querySelector('main')

	// this proxy needs to be reconfigured to hold the formStateObject for the lead selected
	const leadProxy = new Proxy(
		{
			leadIndex: undefined,
			leadName: undefined,
		},
		{
			get(target: Lead, property: string | undefined) {
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
						target.leadName = leadStore[value].lead
						target.leadIndex = value
						legend.textContent = `lead: ${target.leadName}`
						break
				}
				return true
			},
		},
	)

	const form = (): HTMLFormElement => {
		const form = document.createElement('form')

		const leadSelectLabel = document.createElement('label')
		leadSelectLabel.setAttribute('for', 'lead-select')
		leadSelectLabel.textContent = 'select lead you wish to edit'
		form.appendChild(leadSelectLabel)

		const leadSelect = Select(formStore, leadProxy)
		leadSelect.addEventListener('change', (e: Event) => {
			const leadSelected = (e.target as HTMLSelectElement).value

			// when changing a lead, this resets the value to the native value of that lead
			const inputs = document.querySelectorAll('input')
			inputs.forEach((input, index) => {
				input.value = String(formStore.get(leadSelected)[index].value)
				// load diffs from formState for selected leads values
			})
		})
		form.appendChild(leadSelect)

		const fieldSet = document.createElement('fieldset')
		const legend = document.createElement('legend')
		legend.textContent = 'lead: undefined'

		fieldSet.appendChild(legend)
			/**
			 * iife for generating form fields
			 * 
			 * need to reconfigure to generate formFields on load
			 * with respect to lead 1
			 * and then the event listener will change the values of the 
			 * fields when new leads are selected
			 */
			; ((formStore: Map<string, formFeatureStateObject>) => {
				let featureName: string | undefined = undefined

				formStore.forEach((el: formFeatureObject) => {
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
								console.log('must pick a lead first')
								break
							case 'global':
								leadStore.forEach((stateObject) => {
									for (const property in stateObject) {
										if (property === input.id) {
											stateObject[property] = input.value
										}
									}
								})
								break
							default:
								for (const property in leadStore[
									Number(leadProxy.leadIndex)
								]) {
									if (property === input.id) {
										leadStore[Number(leadProxy.leadIndex)][
											property
										] = Number(input.value)
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
			})(formStore) // so here formStore will be an array and we will need to pass an index based on the selected lead
		form.appendChild(fieldSet)

		return form
	}

	const aside = (form: HTMLFormElement) => {
		const aside = document.createElement('aside')
		aside.appendChild(form)
		main.appendChild(aside)
	}

	return {
		init: aside(form()),
	}
}
