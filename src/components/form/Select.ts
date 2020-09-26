import { formFeatureObject, FormLeadProxy } from 'interfaces'

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

	select.addEventListener('change', (e: Event) => {
		formLeadProxy.leadKey = (e.target as HTMLSelectElement).value

		const inputs = document.querySelectorAll('input')
		inputs.forEach((input, index) => {
			input.value = String(
				formStore.get((e.target as HTMLSelectElement).value)[index]
					.value,
			)
		})
	})
	return select
}
