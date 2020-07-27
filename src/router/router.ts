import { routerObject, routeObject } from 'myLib'

export default function Router(Routes: routeObject[]): routerObject {
	const main = document.querySelector('main')

	function constructor(): void {
		matchRouteObject(Routes[0].name).component()
	}

	function loadRoute(routeName: string): void {
		// this makes sure there are no duplicate dom nodes being injected
		const mainChild = main.firstChild
		if (mainChild) {
			main.removeChild(mainChild)
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
		loadRoute,
		init: constructor(),
	}
}
