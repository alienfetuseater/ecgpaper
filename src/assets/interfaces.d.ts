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
		component: () => { init: void }
	}

	export interface routerObject {
		init: void
		loadRoute: (routeName: string) => void
	}

	export interface util {
		domain: (width: number) => number[]
		originalAmplitude: (rightBound: number, curve: string) => number
		amplitudeMultiplier: (
			desiredAmplitude: number,
			originalAmplitude: number,
		) => number
		verticalShift: (
			originalAmplitude: number,
			amplitudeMultiplier: number,
		) => number
		width: (lead: leadObject) => number
		drawLine: (
			curve: string,
			origin_x: number,
			origin_y: number,
			x: number,
			amplitudeMultiplier: number,
			verticalShift: number,
		) => void
		drawIntervalLine: (
			origin_x: number,
			origin_y: number,
			length: number,
			height: number,
		) => void
	}
}
