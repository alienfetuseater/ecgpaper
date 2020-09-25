import { formFeatureObject, FormStateProxy } from 'interfaces'

export default function Select(
	formStore: Map<string, formFeatureObject[]>,
	formStateProxy: FormStateProxy,
): HTMLSelectElement {
	const select = document.createElement('select')
	select.setAttribute('id', 'lead-select')

	formStore.forEach((value, key) => {
		const option = document.createElement('option')
		option.setAttribute('value', key)
		option.setAttribute('label', key)
		select.appendChild(option)
	})

	const option = document.createElement('option')
	option.setAttribute('value', 'global')
	option.setAttribute('label', 'global')
	select.appendChild(option)

	select.addEventListener('change', (e: Event) => {
		formStateProxy.leadKey = (e.target as HTMLSelectElement).value
		const inputs = document.querySelectorAll('input')
		inputs.forEach((input, index) => {
			input.value = String(formStateProxy.leadValue[index].value)
		})
	})
	return select
}
