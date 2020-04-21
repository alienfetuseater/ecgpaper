// import Home from '@/app/home/main.js'
// import Svg from '@/app/svgExample/main.js'
// import Canvas from '@/app/canvasExample/main.js'

export default function Router(Routes) {
	function loadRoute(routeName) {
		// this makes sure there are no duplicate dom nodes being injected
		const main = document.querySelector('main')
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
		loadRoute: loadRoute,
	}
}
