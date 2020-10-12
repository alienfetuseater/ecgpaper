import { CFradioInput, CFrangeInput } from 'interfaces'
import formStructure from './formStructure'

export default function ClinicalFeaturesForm(
	formState: Map<string, CFrangeInput | CFradioInput>,
): { init: void } {
	const section = document.querySelector('section')

	const form = formStructure(formState)

	const article = (form: HTMLFormElement) => {
		const article = document.createElement('article')
		article.appendChild(form)
		section.appendChild(article)
	}

	return {
		init: article(form.init),
	}
}
