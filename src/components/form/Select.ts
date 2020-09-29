import { formFeatureObject, FormLeadProxy } from 'interfaces'
import SelectEventListener from './eventListeners/selectEventListener'

export default function Select(
	formStore: Map<string, formFeatureObject[]>,
	formLeadProxy: FormLeadProxy,
): HTMLSelectElement {
	const select = document.createElement('select')
	select.setAttribute('id', 'lead-select')

	formStore.forEach((value, key) => {
		const option = document.createElement('option')
		option.setAttribute('value', key)
		option.setAttribute('label', key)
		select.appendChild(option)
	})

	SelectEventListener(select, formLeadProxy, formStore)

	return select
}
