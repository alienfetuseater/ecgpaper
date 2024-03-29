export default [
	{
		lead: 'lead1',
		isoelectric: {
			startX: 0.0,
			startY: 0.375,
			endX: 0.25,
			endY: 0.375,
		},
		complex: [
			{
				feature: 'pwave',
				curve: function (X: number): number {
					return Math.pow(X, 2)
				},
				amplitude: 2,
				width: 3,
			},
			{
				feature: 'printerval',
				width: 1,
			},
			{
				feature: 'qrs',
				curve: function (X: number): number {
					return Math.pow(X, 2)
				},
				amplitude: 10,
				width: 3,
			},
			{
				feature: 'stinterval',
				width: 1,
			},
			{
				feature: 'twave',
				curve: function (X: number): number {
					return Math.pow(X, 2)
				},
				amplitude: 5,
				width: 5,
			},
		],
	},
	{
		lead: 'lead2',
		isoelectric: {
			startX: 0.0,
			startY: 0.625,
			endX: 0.25,
			endY: 0.625,
		},
		complex: [
			{
				feature: 'pwave',
				curve: function (X: number): number {
					return Math.pow(X, 2)
				},
				amplitude: 2,
				width: 5,
			},
			{
				feature: 'printerval',
				width: 1,
			},
			{
				feature: 'qrs',
				curve: function (X: number): number {
					return Math.pow(X, 2)
				},
				amplitude: 10,
				width: 3,
			},
			{
				feature: 'stinterval',
				width: 1,
			},
			{
				feature: 'twave',
				curve: function (X: number): number {
					return Math.pow(X, 2)
				},
				amplitude: 5,
				width: 5,
			},
		],
	},
	{
		lead: 'lead3',
		isoelectric: {
			startX: 0.0,
			startY: 0.875,
			endX: 0.25,
			endY: 0.875,
		},
		complex: [
			{
				feature: 'pwave',
				curve: function (X: number): number {
					return Math.pow(X, 2)
				},
				amplitude: 2,
				width: 3,
			},
			{
				feature: 'printerval',
				width: 1,
			},
			{
				feature: 'qrs',
				curve: function (X: number): number {
					return Math.pow(X, 2)
				},
				amplitude: 10,
				width: 3,
			},
			{
				feature: 'stinterval',
				width: 1,
			},
			{
				feature: 'twave',
				curve: function (X: number): number {
					return Math.pow(X, 2)
				},
				amplitude: 5,
				width: 5,
			},
		],
	},
	{
		lead: 'avr',
		isoelectric: {
			startX: 0.25,
			startY: 0.375,
			endX: 0.5,
			endY: 0.375,
		},
		complex: [
			{
				feature: 'pwave',
				curve: function (X: number): number {
					return -1 * Math.pow(X, 2)
				},
				amplitude: 2,
				width: 3,
			},
			{
				feature: 'printerval',
				width: 1,
			},
			{
				feature: 'qrs',
				curve: function (X: number): number {
					return -1 * Math.pow(X, 2)
				},
				amplitude: 10,
				width: 3,
			},
			{
				feature: 'stinterval',
				width: 1,
			},
			{
				feature: 'twave',
				curve: function (X: number): number {
					return -1 * Math.pow(X, 2)
				},
				amplitude: 5,
				width: 5,
			},
		],
	},
	{
		lead: 'avl',
		isoelectric: {
			startX: 0.25,
			startY: 0.625,
			endX: 0.5,
			endY: 0.625,
		},
		complex: [
			{
				feature: 'pwave',
				curve: function (X: number): number {
					return Math.pow(X, 2)
				},
				amplitude: 2,
				width: 3,
			},
			{
				feature: 'printerval',
				width: 1,
			},
			{
				feature: 'qrs',
				curve: function (X: number): number {
					return Math.pow(X, 2)
				},
				amplitude: 10,
				width: 3,
			},
			{
				feature: 'stinterval',
				width: 1,
			},
			{
				feature: 'twave',
				curve: function (X: number): number {
					return Math.pow(X, 2)
				},
				amplitude: 5,
				width: 5,
			},
		],
	},
	{
		lead: 'avf',
		isoelectric: {
			startX: 0.25,
			startY: 0.875,
			endX: 0.5,
			endY: 0.875,
		},
		complex: [
			{
				feature: 'pwave',
				curve: function (X: number): number {
					return Math.pow(X, 2)
				},
				amplitude: 2,
				width: 3,
			},
			{
				feature: 'printerval',
				width: 1,
			},
			{
				feature: 'qrs',
				curve: function (X: number): number {
					return Math.pow(X, 2)
				},
				amplitude: 10,
				width: 3,
			},
			{
				feature: 'stinterval',
				width: 1,
			},
			{
				feature: 'twave',
				curve: function (X: number): number {
					return Math.pow(X, 2)
				},
				amplitude: 5,
				width: 5,
			},
		],
	},
	{
		lead: 'v1',
		isoelectric: {
			startX: 0.5,
			startY: 0.375,
			endX: 0.75,
			endY: 0.375,
		},
		complex: [
			{
				feature: 'pwave',
				curve: function (X: number): number {
					return Math.pow(X, 2)
				},
				amplitude: 2,
				width: 3,
			},
			{
				feature: 'printerval',
				width: 1,
			},
			{
				feature: 'qrs',
				curve: function (X: number): number {
					return -1 * Math.pow(X, 2)
				},
				amplitude: 10,
				width: 3,
			},
			{
				feature: 'stinterval',
				width: 1,
			},
			{
				feature: 'twave',
				curve: function (X: number): number {
					return Math.pow(X, 2)
				},
				amplitude: 5,
				width: 5,
			},
		],
	},
	{
		lead: 'v2',
		isoelectric: {
			startX: 0.5,
			startY: 0.625,
			endX: 0.75,
			endY: 0.625,
		},
		complex: [
			{
				feature: 'pwave',
				curve: function (X: number): number {
					return Math.pow(X, 2)
				},
				amplitude: 2,
				width: 3,
			},
			{
				feature: 'printerval',
				width: 1,
			},
			{
				feature: 'qrs',
				curve: function (X: number): number {
					return -1 * Math.pow(X, 2)
				},
				amplitude: 10,
				width: 3,
			},
			{
				feature: 'stinterval',
				width: 1,
			},
			{
				feature: 'twave',
				curve: function (X: number): number {
					return Math.pow(X, 2)
				},
				amplitude: 5,
				width: 5,
			},
		],
	},
	{
		lead: 'v3',
		isoelectric: {
			startX: 0.5,
			startY: 0.875,
			endX: 0.75,
			endY: 0.875,
		},
		complex: [
			{
				feature: 'pwave',
				curve: function (X: number): number {
					return Math.pow(X, 2)
				},
				amplitude: 2,
				width: 3,
			},
			{
				feature: 'printerval',
				width: 1,
			},
			{
				feature: 'qrs',
				curve: function (X: number): number {
					return Math.pow(X, 2)
				},
				amplitude: 10,
				width: 3,
			},
			{
				feature: 'stinterval',
				width: 1,
			},
			{
				feature: 'twave',
				curve: function (X: number): number {
					return Math.pow(X, 2)
				},
				amplitude: 5,
				width: 5,
			},
		],
	},
	{
		lead: 'v4',
		isoelectric: {
			startX: 0.75,
			startY: 0.375,
			endX: 0.98,
			endY: 0.375,
		},
		complex: [
			{
				feature: 'pwave',
				curve: function (X: number): number {
					return Math.pow(X, 2)
				},
				amplitude: 2,
				width: 3,
			},
			{
				feature: 'printerval',
				width: 1,
			},
			{
				feature: 'qrs',
				curve: function (X: number): number {
					return Math.pow(X, 2)
				},
				amplitude: 10,
				width: 3,
			},
			{
				feature: 'stinterval',
				width: 1,
			},
			{
				feature: 'twave',
				curve: function (X: number): number {
					return Math.pow(X, 2)
				},
				amplitude: 5,
				width: 5,
			},
		],
	},
	{
		lead: 'v5',
		isoelectric: {
			startX: 0.75,
			startY: 0.625,
			endX: 0.98,
			endY: 0.625,
		},
		complex: [
			{
				feature: 'pwave',
				curve: function (X: number): number {
					return Math.pow(X, 2)
				},
				amplitude: 2,
				width: 3,
			},
			{
				feature: 'printerval',
				width: 1,
			},
			{
				feature: 'qrs',
				curve: function (X: number): number {
					return Math.pow(X, 2)
				},
				amplitude: 10,
				width: 3,
			},
			{
				feature: 'stinterval',
				width: 1,
			},
			{
				feature: 'twave',
				curve: function (X: number): number {
					return Math.pow(X, 2)
				},
				amplitude: 5,
				width: 5,
			},
		],
	},
	{
		lead: 'v6',
		isoelectric: {
			startX: 0.75,
			startY: 0.875,
			endX: 0.98,
			endY: 0.875,
		},
		complex: [
			{
				feature: 'pwave',
				curve: function (X: number): number {
					return Math.pow(X, 2)
				},
				amplitude: 2,
				width: 3,
			},
			{
				feature: 'printerval',
				width: 1,
			},
			{
				feature: 'qrs',
				curve: function (X: number): number {
					return Math.pow(X, 2)
				},
				amplitude: 10,
				width: 3,
			},
			{
				feature: 'stinterval',
				width: 1,
			},
			{
				feature: 'twave',
				curve: function (X: number): number {
					return Math.pow(X, 2)
				},
				amplitude: 5,
				width: 5,
			},
		],
	},
]
