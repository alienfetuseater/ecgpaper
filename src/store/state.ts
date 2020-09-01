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
		qrscurve: qrs.curve,
		qrsamplitude: qrs.amplitude,
		qrswidth: qrs.width,

		printerval: printerval.width,

		pwavecurve: pwave.curve,
		pwaveamplitude: pwave.amplitude,
		pwavewidth: pwave.width,

		stinterval: stinterval.width,

		twavecurve: twave.curve,
		twaveamplitude: twave.amplitude,
		twavewidth: twave.width,
	}
}
