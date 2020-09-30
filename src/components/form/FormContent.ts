import { FormLeadProxy, formFeatureObject, leadStateObject } from 'interfaces'
import InputEvenListener from './eventListeners/inputEventListener'

export default function formPopulator(
	formLeadProxy: FormLeadProxy,
	leadStore: leadStateObject[],
	fieldSet: HTMLFieldSetElement,
	formStore: Map<string, formFeatureObject[]>,
): void {
	;((formLeadProxy: FormLeadProxy): void => {
		let featureName: string | undefined = undefined

		formStore
			.get(formLeadProxy.leadKey)
			.forEach((el: formFeatureObject) => {
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

				InputEvenListener(input, formLeadProxy, leadStore, formStore)

				label.appendChild(input)
				p.appendChild(label)
				fieldSet.appendChild(p)
				featureName = el.feature
			})
	})(formLeadProxy)
}
