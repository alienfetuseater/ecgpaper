import { stateObject } from 'interfaces'
import Util from '@/lib/util'

export default function Processor(
	svg: SVGSVGElement,
	xmlns: string,
	canvasHeight: number,
	canvasWidth: number,
	NMBRHORIZSMLBXS: number,
	NMBRVERTSMLBXS: number,
	horizontalMM: number,
	verticalMM: number,
): (lead: stateObject) => void {
	const util = Util(horizontalMM, verticalMM, xmlns)
	const leadBoxLength = (horizontalMM * NMBRHORIZSMLBXS) / 4
	let desiredAmplitude = 15
	const tpInterval = 5 * horizontalMM

	return (lead: stateObject) => {
		const compleWidth = util.complexWidth(lead)
		let begin_x = lead.startX * canvasWidth + 8 * horizontalMM
		const end_y = lead.endY * canvasHeight + 5 * verticalMM
		const nmbrComplexes = leadBoxLength / (compleWidth * horizontalMM) - 3

		const g = document.createElementNS(xmlns, 'g')
		g.setAttributeNS(null, 'id', lead.Lead)
		for (let complexes = 0; complexes < nmbrComplexes; complexes++) {
			for (let wave = 0; wave < lead.complex.length; wave++) {
				const dom: number[] = util.domain(lead.complex[wave].width)
				if (lead.complex[wave].curve) {
					desiredAmplitude = lead.complex[wave].amplitude
					for (let x = dom[0]; x <= dom[1]; x += 0.1) {
						const OriginalAmplitude = util.originalAmplitude(
							dom[1],
							lead.complex[wave].curve,
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
							lead.complex[wave].curve,
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
						lead.complex[wave].width * horizontalMM +
						0.5 * (lead.complex[wave + 1].width * horizontalMM)
				}
			}
			util.drawIntervalLine(begin_x, end_y, tpInterval, 0, g)
			begin_x += tpInterval + 0.5 * (lead.complex[0].width * horizontalMM)
		}
		svg.appendChild(g)
	}
}
