import { stateObject } from 'interfaces'
import Util from '@/lib/util'

export default function processor(lead: stateObject): { init: void } {
	const svg = document.querySelector('svg')
	const xmlns = 'http://www.w3.org/2000/svg'
	const canvasHeight = window.innerHeight * (13 / 16)
	const canvasWidth = canvasHeight * (11.69 / 8.27)

	const NMBRHORIZSMLBXS = 275
	const NMBRVERTSMLBXS = 212
	const horizontalMM = canvasWidth / NMBRHORIZSMLBXS
	const verticalMM = canvasHeight / NMBRVERTSMLBXS
	const util = Util(horizontalMM, verticalMM, xmlns, svg)
	const begin_x = lead.startX * canvasWidth + 8 * horizontalMM
	const end_y = lead.endY * canvasHeight + 5 * verticalMM

	const leadBoxLength = (horizontalMM * NMBRHORIZSMLBXS) / 4
	const compleWidth = util.complexWidth(lead)
	const nmbrComplexes = leadBoxLength / (compleWidth * horizontalMM) - 3
	// this should be set by user input in the future
	const desiredAmplitude = 15
	const tpInterval = 5 * horizontalMM

	return {
		init: util.processor(
			lead,
			begin_x,
			end_y,
			nmbrComplexes,
			desiredAmplitude,
			tpInterval,
		),
	}
}
