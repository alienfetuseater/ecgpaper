import { leadStateObject, formFeatureObject, Lead } from 'interfaces'
import Select from './Select'
export default function sideForm(
	leadStore: leadStateObject[],
	formStore: formFeatureObject[],
): { init: void } {
	const main = document.querySelector('main')
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

		const leadLabel = document.createElement('label')
		leadLabel.setAttribute('for', 'lead-select')
		leadLabel.textContent = 'select lead you wish to edit'
		form.appendChild(leadLabel)
		const leadSelect = Select(leadStore, leadProxy)
		leadSelect.addEventListener('change', (e: Event) => {
			const lead = (e.target as HTMLSelectElement).value
			const inputs = document.querySelectorAll('input')

			console.log(lead)
			inputs.forEach((input, index) => {
				if (lead === undefined) {
					input.setAttribute('disabled', '')
				} else {
					input.removeAttribute('disabled')
				}

				input.value = String(formStore[index].value)
				// load diffs from formState for selected leads values
			})
		})
		form.appendChild(leadSelect)

		const fieldSet = document.createElement('fieldset')
		const legend = document.createElement('legend')
		legend.textContent = 'lead: undefined'
		fieldSet.appendChild(legend)
		// iife
		;((formStore: formFeatureObject[]) => {
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
				input.setAttribute('disabled', '')

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
		})(formStore)
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
