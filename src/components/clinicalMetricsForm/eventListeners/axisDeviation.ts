import { CleanWebpackPlugin } from 'clean-webpack-plugin'

export default function axisDeviation(): { init: void } {
	const constructor = () => {
		// stuff
		console.log('axis deviation')
	}

	return {
		init: constructor(),
	}
}
