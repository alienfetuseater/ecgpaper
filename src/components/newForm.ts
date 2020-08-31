import { stateObject, FormFeatures } from 'interfaces'

export default function sideForm(
	store: stateObject[],
	formFeatures: FormFeatures[],
): { init: void } {
	const main = document.querySelector('main')

	interface Lead {
		[index: string]: string | undefined
		leadIndex: string | undefined
		leadName: string | undefined
	}
	const lead: Lead = {
		leadIndex: undefined,
		leadName: undefined,
	}

	const leadProxy = new Proxy(lead, {
		get(target, property: string | undefined) {
			return target[property]
		},
		set(target, property: string | undefined, value) {
			const legend = document.querySelector('legend')
			switch (value) {
				case 'undefined':
					legend.textContent = 'lead: undefined'
					break

				case 'global':
					legend.textContent = 'lead: global'
					break
				default:
					target.leadName = store[value].lead
					legend.textContent = `lead: ${target.leadName}`
					break
			}
			target[property] = value
			return true
		},
	})

	const LeadSelect = (): HTMLSelectElement => {
		const select = document.createElement('select')
		select.setAttribute('id', 'lead-select')

		const option = document.createElement('option')
		option.setAttribute('value', undefined)
		option.setAttribute('label', '--Please Select A Lead--')
		select.appendChild(option)

		const optionTwo = document.createElement('option')
		optionTwo.setAttribute('value', 'global')
		optionTwo.setAttribute('label', 'global')
		select.appendChild(optionTwo)

		store.forEach((lead, index) => {
			const option = document.createElement('option')
			option.setAttribute('value', String(index))
			option.setAttribute('label', lead.lead)
			select.appendChild(option)
		})
		select.addEventListener('change', (e: Event) => {
			leadProxy.leadIndex = (e.target as HTMLSelectElement).value
		})
		return select
	}

	// actual form for inputs and sliders to adjust things
	const form = (): HTMLFormElement => {
		const form = document.createElement('form')

		const leadLabel = document.createElement('label')
		leadLabel.setAttribute('for', 'lead-select')
		leadLabel.textContent = 'select lead you wish to edit'
		form.appendChild(leadLabel)
		const leadSelect = LeadSelect()
		form.appendChild(leadSelect)

		const fieldSet = document.createElement('fieldset')
		const legend = document.createElement('legend')
		legend.textContent = 'lead: undefined'
		fieldSet.appendChild(legend)
		// iife
		;((formFeatures: FormFeatures[]) => {
			formFeatures.forEach((element: FormFeatures) => {
				/**
				 * need to first set legend label for wave were working on
				 * then set input and labels for the characteristics we're changing
				 * if wave has amplitude and width characteristics to change, do so.
				 * do this by setting a feature variable, then check with each iteration
				 * if the feature has changed, if it hasnt, dont create new legend
				 * and create second input/labels
				 * if it has then set new feature variable and create new input/labels
				 *
				 */
			})
		})(formFeatures)

		// add event listeners
		const inputs = document.querySelectorAll('input')
		inputs.forEach((input) => {
			// switch (leadProxy.leadName) {
			// 	case 'undefined':
			// 		console.log('must pick a lead first')
			// 		break
			// 	case 'global':
			// 		// handle global here
			// 		break
			// 	default:
			// 		// handle single lead here
			// 		input.addEventListener('change', (e: Event) => {
			// 			/**
			// 			 * need to find lead in store that matches leadProxy.leadIndex
			// 			 * find characteristic to mutate (pwave, pr segment...)
			// 			 * find property to mutate (width, amplitude)
			// 			 */
			// 			const inputName = input.attributes
			// 			// store[Number(leadProxy.leadIndex)].complex[]
			// 		})
			// 		break
			// }
		})

		return form
	}

	// layout section for form on side
	const aside = (form: HTMLFormElement) => {
		const aside = document.createElement('aside')
		aside.appendChild(form)
		main.appendChild(aside)
	}

	return {
		init: aside(form()),
	}
}
