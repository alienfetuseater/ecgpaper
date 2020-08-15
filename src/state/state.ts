export default function State(
	_pWaveAmplitude: number,
	_pWaveDuration: number,
	_prSegmentLength: number,
	_qrsWaveAmplitude: number,
	_qrsWaveDuration: number,
	_stSegmentLength: number,
	_tWaveAmplitude: number,
	_tWaveDuration: number,
	_tpIntervalLength: number,
): {
	pWaveAmplitude: number
	pWaveDuration: number
	prSegmentLength: number
	qrsWaveAmplitude: number
	qrsWaveDuration: number
	stSegmentLength: number
	tWaveAmplitude: number
	tWaveDuration: number
	tpIntervalLength: number
} {
	let pWaveAmplitude: number = _pWaveAmplitude
	let pWaveDuration: number = _pWaveDuration
	let prSegmentLength: number = _prSegmentLength
	let qrsWaveAmplitude: number = _qrsWaveAmplitude
	let qrsWaveDuration: number = _qrsWaveDuration
	let stSegmentLength: number = _stSegmentLength
	let tWaveAmplitude: number = _tWaveAmplitude
	let tWaveDuration: number = _tWaveDuration
	let tpIntervalLength: number = _tpIntervalLength

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

		get tpIntervalLength() {
			return tpIntervalLength
		},
		set tpIntervalLength(newTpIntervalLength) {
			tpIntervalLength = newTpIntervalLength
		},
	}
}
