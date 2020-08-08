declare module 'myLib' {
	export interface leadObject {
		lead: string
		curve: string
		width: number
		isoelectric: {
			startX: number
			startY: number
			endX: number
			endY: number
		}
	}

	export interface routeObject {
		name: string
		component: any
	}

	export interface routerObject {
		loadRoute: (routeName: string) => void
		init: any
	}

	export interface componentObject {
		init: string
	}
	export interface ECGpaper {
		init: void
	}
}
