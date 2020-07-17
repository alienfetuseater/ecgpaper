export default function Router(Routes) {
	const main = document.querySelector('main')
	function constructor() {
		matchRouteObject(Routes[0].name).component()
	}

	function loadRoute(routeName) {
		// this makes sure there are no duplicate dom nodes being injected
		let mainChild = main.firstChild
		if (mainChild) {
			main.removeChild(mainChild)
		}
		// once old dom elements are removed we can go about adding selected route
		const route = matchRouteObject(routeName)
		route.component()
	}

	const matchRouteObject = function (name) {
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
