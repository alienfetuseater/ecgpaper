export default function home() {
	let constructor = function () {
		const main = document.querySelector('main')
		const canvas = document.createElement('canvas')
		const ctx = canvas.getContext('2d')
		ctx.font = '48px serif'
		ctx.fillText('Hello world', 10, 50)
		main.appendChild(canvas)
	}

	return {
		init: constructor(),
	}
}
