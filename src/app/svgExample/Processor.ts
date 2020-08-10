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

	const leadBoxLength = (horizontalMM * NMBRHORIZSMLBXS) / 4
	// width should be calculated with a function that sums up all the individual widths in the curve array, get to that later
	const width = 10
	const nmbrComplexes = leadBoxLength / (width * horizontalMM) - 4

	// this should be set by user input in the future
	const desiredAmplitude = 15

	const begin_x = lead.isoelectric.startX * canvasWidth
	const end_y = lead.isoelectric.endY * canvasHeight
	// const curve = lead.curve
	const origin_x = begin_x + 7 * horizontalMM
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

	const drawRhythm = function (
		lead: leadObject,
		origin_x: number,
		origin_y: number,
	) {
		// draw sequential rhythms
		for (let complexes = 0; complexes < nmbrComplexes; complexes++) {
			// draw complex, p-wave then qrs, then twave...
			for (let wave = 0; wave < lead.complex.length; wave++) {
				// draw each wave feature
				const dom: number[] = domain(lead.complex[wave].width)
				for (let x = dom[0]; x <= dom[1]; x += 0.1) {
					if (lead.complex[wave].curve) {
						drawLine(
							lead.complex[wave].curve,
							origin_x,
							origin_y,
							x,
							amplitudeMultiplier(
								desiredAmplitude,
								originalAmplitude(
									dom[1],
									lead.complex[wave].curve,
								),
							),
							verticalShift(
								originalAmplitude(
									dom[1],
									lead.complex[wave].curve,
								),
								amplitudeMultiplier(
									desiredAmplitude,
									originalAmplitude(
										dom[1],
										lead.complex[wave].curve,
									),
								),
							),
						)
					} else {
						drawLine('0', origin_x, origin_y, x, 0, 0)
					}
				}
				origin_x += width * horizontalMM
			}
		}
	}

	return {
		init: drawRhythm(lead, origin_x, origin_y),
	}
}
