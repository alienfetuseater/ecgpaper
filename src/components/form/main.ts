import { leadStateObject, FormStateProxy, formFeatureObject } from 'interfaces'
import Form from './Form'

export default function sideForm(
	leadStore: leadStateObject[],
	formData: Map<string, formFeatureObject[]>,
): { init: void } {
	const main = document.querySelector('main')

	const target = {
		leadKey: 'lead1',
		leadValue: formData.get('lead1'),
	}
	const handler = {
		get: function (target: FormStateProxy, property: string) {
			return target[property]
		},
		set: function (
			target: FormStateProxy,
			property: string,
			value: string | formFeatureObject[],
		) {
			const legend = document.querySelector('legend')
			switch (value) {
				case 'global':
					legend.textContent = 'lead: global'
					break
				default:
					target.leadKey = value as string
					legend.textContent = `lead: ${value}`
					break
			}
			return true
		},
	}
	const formStateProxy = new Proxy(target, handler)

	const form = Form(leadStore, formData, formStateProxy)

	const aside = (form: HTMLFormElement) => {
		const aside = document.createElement('aside')
		aside.appendChild(form)
		main.appendChild(aside)
	}

	return {
		init: aside(form.init),
	}
}