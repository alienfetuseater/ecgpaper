import { FormStateProxy, formFeatureObject, leadStateObject } from 'interfaces'

export default function formPopulator(
	formStateProxy: FormStateProxy,
	leadStore: leadStateObject[],
	fieldSet: HTMLFieldSetElement,
): void {
	;((formStateProxy: FormStateProxy): void => {
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
			label.setAttribute('for', `${el.feature.concat(el.characteristic)}`)
			const input = document.createElement('input')
			input.setAttribute('type', 'range')
			input.setAttribute('name', `${el.feature}.${el.characteristic}`)
			input.setAttribute('id', `${el.feature.concat(el.characteristic)}`)
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
								leadStoreObject[property] = Number(input.value)
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
}
