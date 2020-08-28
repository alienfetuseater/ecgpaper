import { leadObject, stateObject } from 'interfaces'

export default function State(lead: leadObject): stateObject {
	const pwave = lead.complex.find((el) => {
		return el.feature === 'pwave'
	})
	const printerval = lead.complex.find((el) => {
		return el.feature === 'printerval'
	})
	const qrs = lead.complex.find((el) => {
		return el.feature === 'qrs'
	})
	const stinterval = lead.complex.find((el) => {
		return el.feature === 'stinterval'
	})
	const twave = lead.complex.find((el) => {
		return el.feature === 'twave'
	})
	const isoelectric = lead.isoelectric

	return {
		lead: lead.lead,
		isoelectric: {
			startX: isoelectric.startX,
			startY: isoelectric.startY,
			endX: isoelectric.endX,
			endY: isoelectric.endY,
		},

		complex: [
			{
				feature: 'pwave',
				curve: pwave.curve,
				amplitude: pwave.amplitude,
				width: pwave.width,
			},
			{
				feature: 'printerval',
				width: printerval.width,
			},
			{
				feature: 'qrs',
				curve: qrs.curve,
				amplitude: qrs.amplitude,
				width: qrs.width,
			},
			{
				feature: 'stinterval',
				width: stinterval.width,
			},
			{
				feature: 'twave',
				curve: twave.curve,
				amplitude: twave.amplitude,
				width: twave.width,
			},
		],
	}
}
