import { formFeatureStateObject, Lead } from 'interfaces'

export default function Select(
	store: Map<string, formFeatureStateObject>,
	leadProxy: Lead,
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
		// leadProxy.leadIndex = (e.target as HTMLSelectElement).value
		return store.get((e.target as HTMLSelectElement).value)
	})
	return select
}
