import { leadStateObject, Lead } from 'interfaces'

export default function Select(
	store: leadStateObject[],
	leadProxy: Lead,
): HTMLSelectElement {
	const select = document.createElement('select')
	select.setAttribute('id', 'lead-select')

	const option = document.createElement('option')
	option.setAttribute('value', undefined)
	option.setAttribute('label', '--Please Select A Lead--')
	select.appendChild(option)

	const optionTwo = document.createElement('option')
	optionTwo.setAttribute('value', 'global')
	optionTwo.setAttribute('label', 'global')
	select.appendChild(optionTwo)

	store.forEach((lead, index) => {
		const option = document.createElement('option')
		option.setAttribute('value', String(index))
		option.setAttribute('label', lead.lead)
		select.appendChild(option)
	})
	select.addEventListener('change', (e: Event) => {
		leadProxy.leadIndex = (e.target as HTMLSelectElement).value
	})
	return select
}
