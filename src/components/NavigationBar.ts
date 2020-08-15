import { routeObject } from 'interfaces'

export default function NavigationBar(routes: routeObject[]): { init: string } {
	const constructor = (): string => {
		let list = ''
		routes.forEach((route: routeObject) => {
			list += `<li>${route.name}</li>`
		})
		return `<nav><ul>${list}</ul></nav>`
	}

	return {
		init: constructor(),
	}
}
