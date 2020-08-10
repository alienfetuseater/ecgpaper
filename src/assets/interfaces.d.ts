declare module 'myLib' {
	export interface feature {
		feature: string
		curve?: string
		amplitude?: number
		width: number
	}

	export interface leadObject {
		lead: string
		isoelectric: {
			startX: number
			startY: number
			endX: number
			endY: number
		}
		complex: feature[]
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
