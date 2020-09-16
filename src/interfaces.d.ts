declare module 'interfaces' {
	export interface Lead {
		[index: string]: string | undefined
		leadIndex: string | undefined
		leadName: string | undefined
	}

	type curveFN = (X: number) => number
	export interface feature {
		[index: string]: string | number | curveFN
		feature: string
		curve?: curveFN
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
		originalAmplitude: (rightBound: number, curve: curveFN) => number
		amplitudeMultiplier: (
			desiredAmplitude: number,
			originalAmplitude: number,
		) => number
		verticalShift: (
			originalAmplitude: number,
			amplitudeMultiplier: number,
		) => number
		drawLine: (
			curve: curveFN,
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

	export interface leadStateObject {
		[index: string]:
			| string
			| {
					startX: number
					startY: number
					endX: number
					endY: number
			  }
			| number
			| curveFN
		lead: string
		isoelectric: {
			startX: number
			startY: number
			endX: number
			endY: number
		}
		qrscurve: curveFN
		qrswaveamplitude: number
		qrswavewidth: number

		printervalwidth: number

		pwavecurve: curveFN
		pwaveamplitude: number
		pwavewidth: number

		stintervalwidth: number

		twavecurve: curveFN
		twaveamplitude: number
		twavewidth: number
	}

	export interface formFeatureObject {
		feature: string
		characteristic: string
		min: number
		max: number
		value: number
		increment: number
	}

	export interface formFeatureStateObject {
		feature: string
		characteristic: string
		min: number
		max: number
		value: number
		increment: number
	}
}
