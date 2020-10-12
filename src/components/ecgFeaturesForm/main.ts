import { leadStateObject, FormLeadProxy, formFeatureObject } from 'interfaces'
import FormStructure from './FormStructure'

export default function article(
	leadStore: leadStateObject[],
	formStore: Map<string, formFeatureObject[]>,
): { init: void } {
	const section = document.querySelector('section')

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

	const form = FormStructure(leadStore, formStore, formLeadProxy)

	const article = (form: HTMLFormElement) => {
		const article = document.createElement('article')
		article.appendChild(form)
		section.appendChild(article)
	}

	return {
		init: article(form.init),
	}
}
