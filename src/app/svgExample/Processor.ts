import { leadStateObject, curveFN } from 'interfaces'
import Util from '@/lib/util'

export default function Processor(
	svg: SVGSVGElement,
	xmlns: string,
	canvasHeight: number,
	canvasWidth: number,
	horizontalMM: number,
	verticalMM: number,
): (lead: leadStateObject) => void {
	const util = Util(horizontalMM, verticalMM, xmlns)
	const tpInterval = 5 * horizontalMM

	return (lead: leadStateObject) => {
		const waves = [
			lead.pwavecurve,
			lead.printervalwidth,
			lead.qrscurve,
			lead.stintervalwidth,
			lead.twavecurve,
		]
		const waveWidth = [
			lead.pwavewidth,
			lead.printervalwidth,
			lead.qrswavewidth,
			lead.stintervalwidth,
			lead.twavewidth,
		]

		const waveHeight = [
			lead.pwaveamplitude,
			lead.printervalwidth,
			lead.qrswaveamplitude,
			lead.stintervalwidth,
			lead.twaveamplitude,
		]

		// magic numbers here are for placement of ecg in proper relation to grid lines to start
		let begin_x = lead.isoelectric.startX * canvasWidth + 8 * horizontalMM
		const end_y = lead.isoelectric.endY * canvasHeight

		const g = document.createElementNS(xmlns, 'g')
		g.setAttributeNS(null, 'id', lead.lead)
		while (begin_x < lead.isoelectric.endX * canvasWidth) {
			for (let wave = 0; wave < waves.length; wave++) {
				const dom: number[] = util.domain(waveWidth[wave])
				if (typeof waves[wave] !== 'number') {
					const desiredAmplitude = waveHeight[wave]
					for (let x = dom[0]; x <= dom[1]; x += 0.1) {
						const OriginalAmplitude = util.originalAmplitude(
							dom[1],
							waves[wave] as curveFN,
						)

						const AmplitudeMultiplier = util.amplitudeMultiplier(
							desiredAmplitude,
							OriginalAmplitude,
						)

						const VerticalShift = util.verticalShift(
							OriginalAmplitude,
							AmplitudeMultiplier,
						)
						if (x + begin_x < lead.isoelectric.endX * canvasWidth) {
							util.drawLine(
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
					begin_x += dom[1]
				} else {
					if (begin_x < lead.isoelectric.endX * canvasWidth) {
						util.drawIntervalLine(begin_x, end_y, dom[1] * 2, 0, g)
						begin_x +=
							waveWidth[wave] * horizontalMM +
							0.5 * (waveWidth[wave + 1] * horizontalMM)
					} else {
						break
					}
				}
			}
			if (begin_x < lead.isoelectric.endX * canvasWidth) {
				util.drawIntervalLine(begin_x, end_y, tpInterval, 0, g)
				begin_x += tpInterval + 0.5 * (waveWidth[0] * horizontalMM)
			} else {
				break
			}
		}
		svg.appendChild(g)
	}
}
