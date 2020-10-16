export default function heartRate(): { init: void } {
	const constructor = () => {
		console.log('heart rate')

		/**
		 * what happens to ecg with a change in heart rate?
		 *
		 * pr interval changes
		 *  PR vs HR
		 * - PR (ms) = -0.351 HR (beats min-1) + 176.7
		 * - PR (ms) = -0.582 HR (beats min-1) + 186.5
		 *  PR vs RR
		 * - 0.054 +/- 0.032 in women
		 * - 0.055 +/- 0.031 in men
		 * qrs duration changes
		 *  QRS vs RR
		 * - QRS (msec) = 82.4 + 0.0120 x RR(msec)
		 * - (-0.00138) +/- 0.0045, negative slopes in women
		 * - 0.00335 +/- 0.0054, positive slopes in men
		 *
		 * st interval changes
		 * tp segment changes
		 *
		 * qt interval changes
		 * QT vs RR
		 * - 0.194 +/- 0.019 in women
		 * - 0.168 +/- 0.022 in men
		 *
		 * so what are those changes?
		 */
	}

	return {
		init: constructor(),
	}
}
