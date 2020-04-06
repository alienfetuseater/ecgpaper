export default function Router(Routes) {
    function _loadRoute(name) {
        const route = _matchUrlToRoute(name)

        switch (route.component) {
            case 'canvas':
                import('@/app/canvasExample/main.js')
                break
            case 'svg':
                import('@/app/svgExample/main.js')
                break
            case 'root':
                import('@/app/main.js')
            default:
                break
        }
    }

    const _matchUrlToRoute = function (name) {
        const matchedRoute = Routes.find((route) => {
            return route.component == name
        })
        return matchedRoute
    }

    return {
        loadRoute: _loadRoute,
    }
}
