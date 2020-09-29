import { leadStateObject } from 'interfaces'
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

		let begin_x = lead.isoelectric.startX * canvasWidth + 8 * horizontalMM
		const end_y = lead.isoelectric.endY * canvasHeight

		const g = document.createElementNS(xmlns, 'g')
		g.setAttributeNS(null, 'id', lead.lead)
		while (begin_x < lead.isoelectric.endX * canvasWidth) {
			begin_x = util.drawComplex(
				waves,
				begin_x,
				lead,
				canvasWidth,
				end_y,
				g,
				waveWidth,
				waveHeight,
			)

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
