import { leadStateObject, FormLeadProxy, formFeatureObject } from 'interfaces'
import Form from './Form'

export default function sideForm(
	leadStore: leadStateObject[],
	formStore: Map<string, formFeatureObject[]>,
): { init: void } {
	const main = document.querySelector('main')

	const target = {
		leadKey: 'lead1',
	}

	const handler = {
		get: function (target: FormLeadProxy, property: string) {
			return target[property]
		},
		set: function (target: FormLeadProxy, property: string, value: string) {
			const legend = document.querySelector('legend')
			target.leadKey = value as string
			legend.textContent = `lead: ${value}`
			return true
		},
	}

	const formLeadProxy = new Proxy(target, handler)

	const form = Form(leadStore, formStore, formLeadProxy)

	const aside = (form: HTMLFormElement) => {
		const aside = document.createElement('aside')
		aside.appendChild(form)
		main.appendChild(aside)
	}

	return {
		init: aside(form.init),
	}
}
