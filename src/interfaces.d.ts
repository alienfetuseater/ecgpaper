declare module 'interfaces' {
	export interface feature {
		[index: string]: string | number
		feature: string
		curve?: string
		amplitude?: number
		width: number
	}

	export interface leadObject {
		[index: string]:
			| string
			| {
					startX: number
					startY: number
					endX: number
					endY: number
			  }
			| feature[]
		lead: string
		isoelectric: {
			startX: number
			startY: number
			endX: number
			endY: number
		}
		[key: number]: feature[]
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
		complexWidth: (lead: stateObject) => number
		drawLine: (
			curve: string,
			origin_x: number,
			origin_y: number,
			x: number,
			amplitudeMultiplier: number,
			verticalShift: number,
			g: Element,
		) => void
		drawIntervalLine: (
			origin_x: number,
			origin_y: number,
			length: number,
			height: number,
			g: Element,
		) => void
	}

	export interface stateObject {
		[index: string]:
			| string
			| {
					startX: number
					startY: number
					endX: number
					endY: number
			  }
			| feature[]
		lead: string
		isoelectric: {
			startX: number
			startY: number
			endX: number
			endY: number
		}
		[key: number]: feature[]
		complex: feature[]
	}

	export interface formFeatureInterface {
		feature: string
		min: number
		max: number
		value: number
		increment: number
	}
}
