import { FormLeadProxy, formFeatureObject, leadStateObject } from 'interfaces'
import Select from './Select'
import PopulateForm from './PopulateForm'

export default function Form(
	leadStore: leadStateObject[],
	formStore: Map<string, formFeatureObject[]>,
	formLeadProxy: FormLeadProxy,
): {
	init: HTMLFormElement
} {
	const Form = (): HTMLFormElement => {
		const form = document.createElement('form')

		const leadSelectLabel = document.createElement('label')
		leadSelectLabel.setAttribute('for', 'lead-select')
		leadSelectLabel.textContent = 'select lead you wish to edit'
		form.appendChild(leadSelectLabel)

		const leadSelect = Select(formStore, formLeadProxy)
		form.appendChild(leadSelect)

		const fieldSet = document.createElement('fieldset')
		const legend = document.createElement('legend')
		legend.textContent = 'lead: undefined'

		fieldSet.appendChild(legend)
		PopulateForm(formLeadProxy, leadStore, fieldSet, formStore)
		form.appendChild(fieldSet)

		return form
	}
	return {
		init: Form(),
	}
}
