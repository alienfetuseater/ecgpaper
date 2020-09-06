import { util, curveFN } from 'interfaces'

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
		curve: curveFN,
	): number {
		const rightBoundYValue: number = curve(rightBound)
		const originYValue: number = curve(0)
		return originYValue - rightBoundYValue
	}

	const amplitudeMultiplier = function (
		desiredAmplitude: number,
		originalAmplitude: number,
	): number {
		const correctedDesiredAmplitude = desiredAmplitude * verticalMM
		const amplitudeMultiplier =
			correctedDesiredAmplitude / originalAmplitude
		const correctedAmplitudeMultiplier = Math.sqrt(
			Math.pow(amplitudeMultiplier, 2),
		)
		let cooefficient: number | undefined = undefined
		switch (true) {
			case desiredAmplitude > 0:
				cooefficient = 1
				break
			case desiredAmplitude < 0:
				cooefficient = -1
				break
			case desiredAmplitude == 0:
				return 0
		}
		return correctedAmplitudeMultiplier * cooefficient
	}

	const verticalShift = function (
		originalAmplitude: number,
		amplitudeMultiplier: number,
	): number {
		return originalAmplitude * amplitudeMultiplier
	}

	const drawLine = function (
		curve: curveFN,
		origin_x: number,
		origin_y: number,
		x: number,
		amplitudeMultiplier: number,
		verticalShift: number,
		g: Element,
	) {
		const line = document.createElementNS(xmlns, 'line')

		const x1: number = x + origin_x
		const y1: number =
			curve(x) * amplitudeMultiplier + origin_y + verticalShift

		x += 0.1
		const x2: number = x + origin_x
		const y2: number =
			curve(x) * amplitudeMultiplier + origin_y + verticalShift

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
