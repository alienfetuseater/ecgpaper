import { util, curveFN, leadStateObject } from 'interfaces'

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
		begin_x: number,
		origin_y: number,
		x: number,
		amplitudeMultiplier: number,
		verticalShift: number,
		g: Element,
	): void {
		const line = document.createElementNS(xmlns, 'line')

		const x1: number = x + begin_x
		const y1: number =
			curve(x) * amplitudeMultiplier + origin_y + verticalShift

		x += 0.1
		const x2: number = x + begin_x
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
		begin_x: number,
		origin_y: number,
		length: number,
		height: number,
		g: Element,
	): void {
		const line = document.createElementNS(xmlns, 'line')

		const x1 = begin_x
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

	const drawComplex = function (
		waves: (curveFN | number)[],
		begin_x: number,
		lead: leadStateObject,
		canvasWidth: number,
		end_y: number,
		g: Element,
		waveWidth: number[],
		waveHeight: number[],
	): number {
		for (let wave = 0; wave < waves.length; wave++) {
			const dom: number[] = domain(waveWidth[wave])
			if (typeof waves[wave] !== 'number') {
				const desiredAmplitude = waveHeight[wave]

				drawIndividualWave(
					dom,
					waves,
					wave,
					desiredAmplitude,
					begin_x,
					lead,
					canvasWidth,
					end_y,
					g,
				)

				begin_x += dom[1]
			} else {
				if (begin_x < lead.isoelectric.endX * canvasWidth) {
					drawIntervalLine(begin_x, end_y, dom[1] * 2, 0, g)
					begin_x +=
						waveWidth[wave] * horizontalMM +
						0.5 * (waveWidth[wave + 1] * horizontalMM)
				} else {
					break
				}
			}
		}
		return begin_x
	}

	const drawIndividualWave = function (
		dom: number[],
		waves: (curveFN | number)[],
		wave: number,
		desiredAmplitude: number,
		begin_x: number,
		lead: leadStateObject,
		canvasWidth: number,
		end_y: number,
		g: Element,
	): void {
		for (let x = dom[0]; x <= dom[1]; x += 0.1) {
			const OriginalAmplitude = originalAmplitude(
				dom[1],
				waves[wave] as curveFN,
			)

			const AmplitudeMultiplier = amplitudeMultiplier(
				desiredAmplitude,
				OriginalAmplitude,
			)

			const VerticalShift = verticalShift(
				OriginalAmplitude,
				AmplitudeMultiplier,
			)

			if (x + begin_x < lead.isoelectric.endX * canvasWidth) {
				drawLine(
					waves[wave] as curveFN,
					begin_x,
					end_y,
					x,
					AmplitudeMultiplier,
					VerticalShift,
					g,
				)
			} else {
				break
			}
		}
	}

	return {
		domain,
		originalAmplitude,
		amplitudeMultiplier,
		verticalShift,
		drawLine,
		drawIntervalLine,
		drawComplex,
		drawIndividualWave,
	}
}
