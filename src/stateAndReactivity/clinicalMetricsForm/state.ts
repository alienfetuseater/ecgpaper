export default new Map([
	[
		'heart rate',
		{
			inputType: 'range',
			min: 0,
			max: 250,
			value: 60,
			step: 1,
		},
	],
	[
		'qt c',
		{
			inputType: 'range',
			min: 240,
			max: 550,
			value: 420,
			step: 20,
		},
	],
	[
		'axis deviation',
		{
			inputType: 'range',
			min: 0,
			max: 359,
			value: 0,
			step: 1,
		},
	],
	[
		'r wave progression',
		{
			inputType: 'radio',
			firstValue: 'normal',
			secondValue: 'poor r wave progression',
		},
	],
])
