import { CFradioInput, CFrangeInput } from 'interfaces'

export default function inputEventListener(
	input: HTMLInputElement,
	formState: Map<string, CFrangeInput | CFradioInput>,
): void {
	input.addEventListener('change', (e: Event) => {
		const formStateObject = formState.get(input.id)
		formStateObject.value = (e.target as HTMLInputElement).value
	})
}
