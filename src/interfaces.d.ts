declare module 'interfaces' {
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

	export interface routeObject {
		name: string
		component: () => { init: void }
	}

	export interface routerObject {
		init: void
		loadRoute: (routeName: string) => void
	}

	export interface formFeatureObject {
		[index: string]: string | number
		feature: string
		characteristic: string
		min: number
		max: number
		value: number
		increment: number
	}

	export interface FormLeadProxy {
		[index: string]: string
		leadKey: string
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
			begin_x: number,
			origin_y: number,
			x: number,
			amplitudeMultiplier: number,
			verticalShift: number,
			g: Element,
		) => void
		drawIntervalLine: (
			begin_x: number,
			origin_y: number,
			length: number,
			height: number,
			g: Element,
		) => void
		drawComplex: (
			waves: (curveFN | number)[],
			begin_x: number,
			lead: leadStateObject,
			canvasWidth: number,
			end_y: number,
			g: Element,
			waveWidth: number[],
			waveHeight: number[],
		) => number
		drawIndividualWave: (
			dom: number[],
			waves: (curveFN | number)[],
			wave: number,
			desiredAmplitude: number,
			begin_x: number,
			lead: leadStateObject,
			canvasWidth: number,
			end_y: number,
			g: Element,
		) => void
	}

	export interface CFrangeInput {
		[index: string]: string | number
		inputType: string
		min: number
		max: number
		value: number
		step: number
	}

	export interface CFradioInput {
		[index: string]: string
		inputType: string
		firstValue: string
		secondValue: string
	}
}
