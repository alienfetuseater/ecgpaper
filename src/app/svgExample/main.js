export default function mainSVG() {
	let constructor = function () {
		const main = document.querySelector('main')
		main.innerHTML = '<h1>hello world from svg</h1>'
	}

	return {
		init: constructor(),
	}
}
