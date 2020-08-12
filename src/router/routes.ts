import Home from '@/app/home/main'
import canvasECG from '@/app/canvasExample/main'
import Svg from '@/app/svgExample/main'

export default [
	{
		name: 'home',
		component: Home,
	},
	{
		name: 'canvas',
		component: canvasECG,
	},
	{
		name: 'svg',
		component: Svg,
	},
]
