import { leadObject } from 'myLib'

export default function processor(
	lead: leadObject,
	canvasWidth: number,
	canvasHeight: number,
): { init: void } {
	const svg = document.querySelector('svg')
	const xmlns = 'http://www.w3.org/2000/svg'

	const NMBRHORIZSMLBXS = 275
	const horizontalMM = canvasWidth / NMBRHORIZSMLBXS
	const NMBRVERTSMLBXS = 212
	const verticalMM = canvasHeight / NMBRVERTSMLBXS

	const width = 4
	const desiredAmplitude = 15

	const begin_x = lead.isoelectric.startX * canvasWidth
	const end_y = lead.isoelectric.endY * canvasHeight
	const curve = lead.curve
	const origin_x = begin_x + 0.125 * canvasWidth
	const origin_y = end_y

	const domain = function (width: number): number[] {
		const domain: number[] = []
		domain.push((width * -horizontalMM) / 2)
		domain.push((width * horizontalMM) / 2)
		return domain
	}

	const originalAmplitude = function (
		rightBound: number,
		curve: string,
	): number {
		let X: number = rightBound
		const rightBoundYValue: number = eval(curve)
		X = 0
		const originYValue: number = eval(curve)
		return originYValue - rightBoundYValue
	}

	const amplitudeMultiplier = function (
		desiredAmplitude: number,
		originalAmplitude: number,
	): number {
		const correctedDesiredAmplitude = desiredAmplitude * verticalMM
		const amplitudeMultiplier =
			correctedDesiredAmplitude / originalAmplitude
		return Math.sqrt(Math.pow(amplitudeMultiplier, 2))
	}

	const verticalShift = function (
		originalAmplitude: number,
		amplitudeMultiplier: number,
	): number {
		return originalAmplitude * amplitudeMultiplier
	}

	const drawLine = function (
		curve: string,
		origin_x: number,
		origin_y: number,
		x: number,
		amplitudeMultiplier: number,
		verticalShift: number,
	) {
		const line = document.createElementNS(xmlns, 'line')

		let X = x
		const x1: number = X + origin_x
		const y1: number =
			eval(curve) * amplitudeMultiplier + origin_y + verticalShift

		X += 0.1
		const x2: number = X + origin_x
		const y2: number =
			eval(curve) * amplitudeMultiplier + origin_y + verticalShift

		line.setAttributeNS(null, 'x1', String(x1))
		line.setAttributeNS(null, 'y1', String(y1))
		line.setAttributeNS(null, 'x2', String(x2))
		line.setAttributeNS(null, 'y2', String(y2))
		line.setAttributeNS(null, 'stroke', 'black')
		line.setAttributeNS(null, 'stroke-width', '1')

		svg.appendChild(line)
	}

	const drawCurve = function (
		domain: number[],
		curve: string,
		origin_x: number,
		origin_y: number,
		amplitudeMultiplier: number,
		verticalShift: number,
	) {
		for (let x = domain[0]; x <= domain[1]; x += 0.1) {
			drawLine(
				curve,
				origin_x,
				origin_y,
				x,
				amplitudeMultiplier,
				verticalShift,
			)
		}
	}

	const drawStrip = function (
		domain: number[],
		curve: string,
		origin_x: number,
		origin_y: number,
		amplitudeMultiplier: number,
		verticalShift: number,
	) {
		for (let index = 0; index < 2; index++) {
			drawCurve(
				domain,
				curve,
				origin_x,
				origin_y,
				amplitudeMultiplier,
				verticalShift,
			)

			origin_x += width * horizontalMM
		}
	}

	return {
		init: drawStrip(
			domain(width),
			curve,
			origin_x,
			origin_y,
			amplitudeMultiplier(
				desiredAmplitude,
				originalAmplitude(domain(width)[1], curve),
			),
			verticalShift(
				originalAmplitude(domain(width)[1], curve),
				amplitudeMultiplier(
					desiredAmplitude,
					originalAmplitude(domain(width)[1], curve),
				),
			),
		),
	}
}
