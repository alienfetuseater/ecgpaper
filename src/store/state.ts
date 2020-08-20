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

	return {
		Lead: lead.lead,
		pWaveDuration: pwave.width,
		pWaveAmplitude: pwave.amplitude,

		prSegmentLength: printerval.width,

		qrsWaveAmplitude: qrs.amplitude,
		qrsWaveDuration: qrs.width,

		stSegmentLength: stinterval.width,

		tWaveAmplitude: twave.amplitude,
		tWaveDuration: twave.width,
	}
}
