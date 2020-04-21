// import Home from '@/app/home/main.js'
// import Svg from '@/app/svgExample/main.js'
// import Canvas from '@/app/canvasExample/main.js'

export default function Router(Routes) {
	function loadRoute(routeName) {
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
