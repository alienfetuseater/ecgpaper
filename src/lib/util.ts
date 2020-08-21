import { stateObject, util } from 'interfaces'

export default function Util(
	horizontalMM: number,
	verticalMM: number,
	xmlns: string,
	svg: SVGElement,
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

	const complexWidth = function (lead: stateObject): number {
		const width =
			lead.pWaveDuration +
			lead.prSegmentLength +
			lead.qrsWaveDuration +
			lead.stSegmentLength +
			lead.tWaveDuration

		return width
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

	const drawIntervalLine = function (
		origin_x: number,
		origin_y: number,
		length: number,
		height: number,
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
		svg.appendChild(line)
	}

	const processor = function (
		lead: stateObject,
		begin_x: number,
		end_y: number,
		nmbrComplexes: number,
		desiredAmplitude: number,
		tpInterval: number,
	) {
		for (let complexes = 0; complexes < nmbrComplexes; complexes++) {
			for (let wave = 0; wave < lead.complex.length; wave++) {
				const dom: number[] = domain(lead.complex[wave].width)
				if (lead.complex[wave].curve) {
					desiredAmplitude = lead.complex[wave].amplitude
					for (let x = dom[0]; x <= dom[1]; x += 0.1) {
						const OriginalAmplitude = originalAmplitude(
							dom[1],
							lead.complex[wave].curve,
						)

						const AmplitudeMultiplier = amplitudeMultiplier(
							desiredAmplitude,
							OriginalAmplitude,
						)

						const VerticalShift = verticalShift(
							OriginalAmplitude,
							AmplitudeMultiplier,
						)

						drawLine(
							lead.complex[wave].curve,
							begin_x,
							end_y,
							x,
							AmplitudeMultiplier,
							VerticalShift,
						)
					}
					begin_x += dom[1]
				} else {
					drawIntervalLine(begin_x, end_y, dom[1] * 2, 0)
					begin_x +=
						lead.complex[wave].width * horizontalMM +
						0.5 * (lead.complex[wave + 1].width * horizontalMM)
				}
			}
			drawIntervalLine(begin_x, end_y, tpInterval, 0)
			begin_x += tpInterval + 0.5 * (lead.complex[0].width * horizontalMM)
		}
	}

	return {
		domain,
		originalAmplitude,
		amplitudeMultiplier,
		verticalShift,
		complexWidth,
		drawLine,
		drawIntervalLine,
		processor,
	}
}
