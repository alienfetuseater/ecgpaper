import { CFradioInput, CFrangeInput } from 'interfaces'
import formStructure from './formStructure'

export default function ClinicalFeaturesForm(
	formState: Map<string, CFrangeInput | CFradioInput>,
): { init: void } {
	const section = document.querySelector('section')

	const form = formStructure(formState)

	const article = (form: HTMLFormElement) => {
		const article = document.createElement('article')
		const header = document.createElement('header')
		const p = document.createElement('p')
		p.textContent = 'ecg features form'
		header.appendChild(p)
		article.appendChild(header)
		article.appendChild(form)
		section.appendChild(article)
	}

	return {
		init: article(form.init),
	}
}
