import { CFradioInput, CFrangeInput } from 'interfaces'
import InputEventListener from './eventListeners'

export default function formFontent(
	formState: Map<string, CFradioInput | CFrangeInput>,
	fieldSet: HTMLFieldSetElement,
): void {
	;((formState: Map<string, CFradioInput | CFrangeInput>) => {
		// iife for generating fields of form

		formState.forEach((value, key) => {
			const p = document.createElement('p')
			const h4 = document.createElement('h4')
			h4.textContent = key
			p.appendChild(h4)

			if (value.inputType === 'range') {
				const label = document.createElement('label')
				label.textContent = String(value.value)
				label.setAttribute('for', key)

				const input = document.createElement('input')
				input.setAttribute('name', key)
				input.setAttribute('id', key)
				input.setAttribute('type', 'range')
				input.setAttribute('max', String(value.max))
				input.setAttribute('min', String(value.min))
				input.setAttribute('value', String(value.value))
				input.setAttribute('step', String(value.step))

				InputEventListener(input, formState)

				label.appendChild(input)
				p.appendChild(label)
			} else {
				const input1 = document.createElement('input')
				input1.setAttribute('type', 'radio')
				input1.setAttribute('name', key)
				input1.setAttribute('id', String(value.firstValue))
				input1.setAttribute('value', String(value.firstValue))

				const label1 = document.createElement('label')
				label1.setAttribute('for', String(value.firstValue))
				label1.textContent = String(value.firstValue)

				const input2 = document.createElement('input')
				input2.setAttribute('type', 'radio')
				input2.setAttribute('name', key)
				input2.setAttribute('id', String(value.secondValue))
				input2.setAttribute('value', String(value.secondValue))

				const label2 = document.createElement('label')
				label2.setAttribute('for', String(value.firstValue))
				label2.textContent = String(value.secondValue)
			}
			fieldSet.appendChild(p)
		})
	})(formState)
}
