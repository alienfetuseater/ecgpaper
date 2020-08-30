import { stateObject } from 'interfaces'

export default function sideForm(store: stateObject[]): { init: void } {
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

		const fieldet = `
		<fieldset>
		<legend>lead: undefined</legend>

		<label>
		pwave</br>
		<label for="pwaveamplitude">amplitude</label></br>
		<input id="pwaveamplitude" type="range" min="-5" max="10" name="pwave.amplitude"></br>
		<label for="pwavewidth">duration</label></br>
		<input id="pwavewidth" type="range" min="-5" max="10" name="pwave.width"></br>
		</label>

		<label>
		pr segment</br>
		<label for="prwidth">duration</label></br>
		<input id="prwidth" type="range" min="-5" max="10" name="pr.width"></br>
		</label>

		<label>
		qrs</br>
		<label for="qrsamplitude">amplitude</label></br>
		<input id="qrsamplitude" type="range" min="-5" max="10" name="qrs.amplitude"></br>
		<label for="qrswidth">duration</label></br>
		<input id="qrswidth" type="range" min="-5" max="10" name="qrs.width"></br>
		</label>

		<label>
		st segment</br>
		<label for="stwidth">duration</label></br>
		<input id="stwidth" type="range" min="-5" max="10" name="st.width"></br>
		</label>

		<label>
		twave</br>
		<label for="twaveamplitude">amplitude</label></br>
		<input id="twaveamplitude" type="range" min="-5" max="10" name="twave.amplitude"></br>
		<label for="twavewidth">duration</label></br>
		<input id="pwavewidth" type="range" min="-5" max="10" name="twave.width"></br>
		</label>
		</fieldset>
		`
		leadSelect.insertAdjacentHTML('afterend', fieldSet)

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
