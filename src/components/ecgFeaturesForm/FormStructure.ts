import { FormLeadProxy, formFeatureObject, leadStateObject } from 'interfaces'
import Select from './Select'
import FormContent from './FormContent'

export default function Form(
	leadStore: leadStateObject[],
	formStore: Map<string, formFeatureObject[]>,
	formLeadProxy: FormLeadProxy,
): {
	init: HTMLFormElement
} {
	const Form = (): HTMLFormElement => {
		const form = document.createElement('form')

		const fieldSet = document.createElement('fieldset')
		const leadSelect = Select(formStore, formLeadProxy)
		fieldSet.appendChild(leadSelect)

		FormContent(formLeadProxy, leadStore, fieldSet, formStore)
		form.appendChild(fieldSet)

		return form
	}
	return {
		init: Form(),
	}
}
