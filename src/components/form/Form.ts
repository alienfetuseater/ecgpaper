import { FormStateProxy, formFeatureObject, leadStateObject } from 'interfaces'
import Select from './Select'

export default function Form(
	leadStore: leadStateObject[],
	formStore: Map<string, formFeatureObject[]>,
	formStateProxy: FormStateProxy,
): {
	init: HTMLFormElement
} {
	const Form = (): HTMLFormElement => {
		const form = document.createElement('form')

		const leadSelectLabel = document.createElement('label')
		leadSelectLabel.setAttribute('for', 'lead-select')
		leadSelectLabel.textContent = 'select lead you wish to edit'
		form.appendChild(leadSelectLabel)

		const leadSelect = Select(formStore, formStateProxy)
		leadSelect.addEventListener('change', (e: Event) => {
			const leadSelected = (e.target as HTMLSelectElement).value

			const inputs = document.querySelectorAll('input')
			inputs.forEach((input, index) => {
				input.value = String(formStore.get(leadSelected)[index].value)
			})
		})
		form.appendChild(leadSelect)

		const fieldSet = document.createElement('fieldset')
		const legend = document.createElement('legend')
		legend.textContent = 'lead: undefined'

		fieldSet.appendChild(legend)
		;((formStateProxy: FormStateProxy) => {
			let featureName: string | undefined = undefined

			formStateProxy.leadValue.forEach((el: formFeatureObject) => {
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
					const leadStoreObject = leadStore.find((el) => {
						return el.lead === formStateProxy.leadKey
					})
					switch (formStateProxy.leadKey) {
						case 'global':
							leadStore.forEach((leadStateObject) => {
								for (const property in leadStateObject) {
									if (property === input.id) {
										leadStateObject[property] = input.value
									}
								}
							})
							break
						default:
							for (const property in leadStoreObject) {
								if (property === input.id) {
									leadStoreObject[property] = Number(
										input.value,
									)
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
		})(formStateProxy)
		form.appendChild(fieldSet)

		return form
	}
	return {
		init: Form(),
	}
}
