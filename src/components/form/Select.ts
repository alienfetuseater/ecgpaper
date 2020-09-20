import { formFeatureObject, FormStateProxy } from 'interfaces'

export default function Select(
	store: Map<string, formFeatureObject[]>,
	formStateProxy: FormStateProxy,
): HTMLSelectElement {
	const select = document.createElement('select')
	select.setAttribute('id', 'lead-select')

	store.forEach((value, key) => {
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
	})
	return select
}
