import Home from '@/app/home/main.js'
import Svg from '@/app/svgExample/main.js'
import Svg2 from '@/app/svgExample2/main.js'
import canvasECG from '@/app/canvasExample/main.js'

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
	{
		name: 'svg2',
		component: Svg2,
	},
]
