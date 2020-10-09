import { FormLeadProxy, formFeatureObject } from 'interfaces'

export default function selectEventListener(
	select: HTMLSelectElement,
	formLeadProxy: FormLeadProxy,
	formStore: Map<string, formFeatureObject[]>,
): void {
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
}
