declare module 'interfaces' {
	export interface feature {
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
		) => void
		drawIntervalLine: (
			origin_x: number,
			origin_y: number,
			length: number,
			height: number,
		) => void
		processor: (
			lead: stateObject,
			begin_x: number,
			end_y: number,
			nmbrComplexes: number,
			desiredAmplitude: number,
			tpInterval: number,
		) => void
	}

	export interface stateObject {
		[index: string]: string | number | feature[]
		readonly Lead: string
		startX: number
		startY: number
		endX: number
		endY: number
		pWaveAmplitude: number
		pWaveDuration: number
		prSegmentLength: number
		qrsWaveAmplitude: number
		qrsWaveDuration: number
		stSegmentLength: number
		tWaveAmplitude: number
		tWaveDuration: number
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
