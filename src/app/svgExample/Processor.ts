import { leadObject } from 'myLib'
import Util from './util'

export default function processor(
	lead: leadObject,
	canvasWidth: number,
	canvasHeight: number,
): { init: void } {
	const svg = document.querySelector('svg')
	const xmlns = 'http://www.w3.org/2000/svg'

	const NMBRHORIZSMLBXS = 275
	const NMBRVERTSMLBXS = 212
	const horizontalMM = canvasWidth / NMBRHORIZSMLBXS
	const verticalMM = canvasHeight / NMBRVERTSMLBXS
	const util = Util(horizontalMM, verticalMM, xmlns, svg)

	const leadBoxLength = (horizontalMM * NMBRHORIZSMLBXS) / 4
	const width = util.width(lead)
	const nmbrComplexes = leadBoxLength / (width * horizontalMM) - 1
	// this should be set by user input in the future
	let desiredAmplitude = 15
	const tpInterval = 5 * horizontalMM

	const begin_x = lead.isoelectric.startX * canvasWidth + 7 * horizontalMM
	const end_y = lead.isoelectric.endY * canvasHeight + 5 * verticalMM

	const drawRhythm = function (
		lead: leadObject,
		begin_x: number,
		end_y: number,
	) {
		for (let complexes = 0; complexes < 2; complexes++) {
			for (let wave = 0; wave < lead.complex.length; wave++) {
				if (lead.complex[wave].curve) {
					const dom: number[] = util.domain(lead.complex[wave].width)
					console.log(dom[1], 'dom1')
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
						)
					}
				} else {
					util.drawIntervalLine(
						begin_x,
						end_y,
						lead.complex[wave].width * horizontalMM,
						0,
					)
				}
				console.log(begin_x, 'prior')
				begin_x += lead.complex[wave].width * horizontalMM
				console.log(begin_x, 'after')
			}
			util.drawIntervalLine(begin_x, end_y, tpInterval, 0)
		}
	}

	return {
		init: drawRhythm(lead, begin_x, end_y),
	}
}
