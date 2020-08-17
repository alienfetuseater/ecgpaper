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

	let pWaveDuration: number = pwave.width
	let pWaveAmplitude: number = pwave.amplitude

	let prSegmentLength: number = printerval.width

	let qrsWaveAmplitude: number = qrs.amplitude
	let qrsWaveDuration: number = qrs.width

	let stSegmentLength: number = stinterval.width

	let tWaveAmplitude: number = twave.amplitude
	let tWaveDuration: number = twave.width

	return {
		get pWaveAmplitude() {
			return pWaveAmplitude
		},
		set pWaveAmplitude(newPwaveA) {
			pWaveAmplitude = newPwaveA
		},

		get pWaveDuration() {
			return pWaveDuration
		},
		set pWaveDuration(newPwaveD) {
			pWaveDuration = newPwaveD
		},

		get prSegmentLength() {
			return prSegmentLength
		},
		set prSegmentLength(newPrSegmentLength) {
			prSegmentLength = newPrSegmentLength
		},

		get qrsWaveAmplitude() {
			return qrsWaveAmplitude
		},
		set qrsWaveAmplitude(newQrsWaveAmplitude) {
			qrsWaveAmplitude = newQrsWaveAmplitude
		},

		get qrsWaveDuration() {
			return qrsWaveDuration
		},
		set qrsWaveDuration(newQrsWaveDuration) {
			qrsWaveDuration = newQrsWaveDuration
		},

		get stSegmentLength() {
			return stSegmentLength
		},
		set stSegmentLength(newStSegmentLength) {
			stSegmentLength = newStSegmentLength
		},

		get tWaveAmplitude() {
			return tWaveAmplitude
		},

		set tWaveAmplitude(newTWaveAmplitude) {
			tWaveAmplitude = newTWaveAmplitude
		},

		get tWaveDuration() {
			return tWaveDuration
		},
		set tWaveDuration(newTWaveDuration) {
			tWaveDuration = newTWaveDuration
		},
	}
}
