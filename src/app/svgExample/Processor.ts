import { stateObject } from 'interfaces'
import Util from '@/lib/util'

export default function Processor(
	svg: SVGSVGElement,
	xmlns: string,
	canvasHeight: number,
	canvasWidth: number,
	NMBRHORIZSMLBXS: number,
	horizontalMM: number,
	verticalMM: number,
): (lead: stateObject) => void {
	const util = Util(horizontalMM, verticalMM, xmlns)
	const leadBoxLength = (horizontalMM * NMBRHORIZSMLBXS) / 4
	const tpInterval = 5 * horizontalMM

	return (lead: stateObject) => {
		const complexWidth = util.complexWidth(lead)
		const waves = [
			lead.pwavecurve,
			lead.printerval,
			lead.qrscurve,
			lead.stinterval,
			lead.twavecurve,
		]
		const waveWidth = [
			lead.pwavewidth,
			lead.printerval,
			lead.qrswidth,
			lead.stinterval,
			lead.twavewidth,
		]

		const waveHeight = [
			lead.pwaveamplitude,
			lead.printerval,
			lead.qrsamplitude,
			lead.stinterval,
			lead.twaveamplitude,
		]

		// magic numbers here are for placement of ecg in proper relation to grid lines to start
		let begin_x = lead.isoelectric.startX * canvasWidth + 8 * horizontalMM
		const end_y = lead.isoelectric.endY * canvasHeight + 5 * verticalMM
		const nmbrComplexes = leadBoxLength / (complexWidth * horizontalMM) - 3

		const g = document.createElementNS(xmlns, 'g')
		g.setAttributeNS(null, 'id', lead.lead)
		for (let complexes = 0; complexes < nmbrComplexes; complexes++) {
			for (let wave = 0; wave < waves.length; wave++) {
				const dom: number[] = util.domain(waveWidth[wave])
				if (typeof waves[wave] === 'string') {
					const desiredAmplitude = waveHeight[wave]
					for (let x = dom[0]; x <= dom[1]; x += 0.1) {
						const OriginalAmplitude = util.originalAmplitude(
							dom[1],
							waves[wave] as string,
						)

						const AmplitudeMultiplier = util.amplitudeMultiplier(
							desiredAmplitude,
							OriginalAmplitude,
						)

						const VerticalShift = util.verticalShift(
							OriginalAmplitude,
							AmplitudeMultiplier,
						)

						util.drawLine(
							waves[wave] as string,

							begin_x,
							end_y,
							x,
							AmplitudeMultiplier,
							VerticalShift,
							g,
						)
					}
					begin_x += dom[1]
				} else {
					util.drawIntervalLine(begin_x, end_y, dom[1] * 2, 0, g)
					begin_x +=
						waveWidth[wave] * horizontalMM +
						0.5 * (waveWidth[wave + 1] * horizontalMM)
				}
			}
			util.drawIntervalLine(begin_x, end_y, tpInterval, 0, g)
			begin_x += tpInterval + 0.5 * (waveWidth[0] * horizontalMM)
		}
		svg.appendChild(g)
	}
}
