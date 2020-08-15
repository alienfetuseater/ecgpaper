import { routerObject, routeObject } from 'interfaces'

export default function Router(Routes: routeObject[]): routerObject {
	const main = document.querySelector('main')

	function constructor(): void {
		// does the same thing loadRoute does without calling loadRoute
		matchRouteObject(Routes[0].name).component()
	}

	function loadRoute(routeName: string): void {
		// this makes sure there are no duplicate dom nodes being injected
		while (main.firstChild) {
			main.removeChild(main.firstChild)
		}
		// once old dom elements are removed we can go about adding selected route
		const route = matchRouteObject(routeName)

		// this appends the component to the dom here
		route.component()
	}

	const matchRouteObject = function (name: string) {
		const matchedRoute = Routes.find((route) => {
			return route.name == name
		})
		return matchedRoute
	}

	return {
		init: constructor(),
		loadRoute,
	}
}
