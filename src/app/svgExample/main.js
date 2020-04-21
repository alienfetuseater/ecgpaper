export default function mainSVG() {
	let constructor = function () {
		const main = document.querySelector('main')
		const h1 = document.createElement('h1')
		h1.innerHTML = 'hello world from svg'
		main.appendChild(h1)
	}

	return {
		init: constructor(),
	}
}
