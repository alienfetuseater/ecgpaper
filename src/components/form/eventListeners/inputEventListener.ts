import { FormLeadProxy, formFeatureObject, leadStateObject } from 'interfaces'

export default function inputEventListener(
	input: HTMLInputElement,
	formLeadProxy: FormLeadProxy,
	leadStore: leadStateObject[],
	formStore: Map<string, formFeatureObject[]>,
): void {
	input.addEventListener('change', (e: Event) => {
		const leadStoreObject = leadStore.find((el) => {
			return el.lead === formLeadProxy.leadKey
		})

		const formFeature = formStore.get(formLeadProxy.leadKey).find((el) => {
			return el.feature.concat(el.characteristic) === input.id
		})

		switch (formLeadProxy.leadKey) {
			case 'global':
				leadStore.forEach((leadStateObject) => {
					for (const property in leadStateObject) {
						if (property === input.id) {
							leadStateObject[property] = Number(
								(e.target as HTMLInputElement).value,
							)
							formFeature.value = Number(
								(e.target as HTMLInputElement).value,
							)
						}
					}
				})
				break
			default:
				for (const property in leadStoreObject) {
					if (property === input.id) {
						leadStoreObject[property] = Number(
							(e.target as HTMLInputElement).value,
						)
						formFeature.value = Number(
							(e.target as HTMLInputElement).value,
						)
					}
				}
				break
		}
	})
}
