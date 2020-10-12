import { CFrangeInput, CFradioInput } from 'interfaces'
import FormContent from './formContent'

export default function formStructure(
	formState: Map<string, CFrangeInput | CFradioInput>,
): { init: HTMLFormElement } {
	const Form = (): HTMLFormElement => {
		const form = document.createElement('form')

		const fieldSet = document.createElement('fieldset')
		const legend = document.createElement('legend')
		legend.textContent = 'clinical features form'

		fieldSet.appendChild(legend)

		FormContent(formState, fieldSet)
		form.appendChild(fieldSet)
		return form
	}
	return {
		init: Form(),
	}
}
