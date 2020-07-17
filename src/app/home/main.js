export default function home() {
	let constructor = function () {
		const main = document.querySelector('main')
		const h1 = document.createElement('h1')
		h1.innerHTML = 'home page'
		main.appendChild(h1)
	}

	return {
		init: constructor(),
	}
}
