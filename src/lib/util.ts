import { stateObject, util } from 'interfaces'

export default function Util(
	horizontalMM: number,
	verticalMM: number,
	xmlns: string,
): util {
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
		g: Element,
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

		g.appendChild(line)
	}

	const drawIntervalLine = function (
		origin_x: number,
		origin_y: number,
		length: number,
		height: number,
		g: Element,
	) {
		const line = document.createElementNS(xmlns, 'line')

		const x1 = origin_x
		const y1 = origin_y
		const x2 = x1 + length
		const y2 = y1 + height

		line.setAttributeNS(null, 'x1', String(x1))
		line.setAttributeNS(null, 'y1', String(y1))
		line.setAttributeNS(null, 'x2', String(x2))
		line.setAttributeNS(null, 'y2', String(y2))
		line.setAttributeNS(null, 'stroke', 'black')
		line.setAttributeNS(null, 'stroke-width', '1')

		g.appendChild(line)
	}

	return {
		domain,
		originalAmplitude,
		amplitudeMultiplier,
		verticalShift,
		drawLine,
		drawIntervalLine,
	}
}
