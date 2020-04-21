export default function home() {
	let constructor = function () {
		const main = document.querySelector('main')
		main.innerHTML = '<h1>your world from root</h1>'
	}

	return {
		init: constructor(),
	}
}
