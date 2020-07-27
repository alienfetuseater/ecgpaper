export default function NavigationBar(routes) {
	let constructor = () => {
		let list = ''
		routes.forEach((route) => {
			list += `<li>${route.name}</li>`
		})
		return `<nav><ul>${list}</ul></nav>`
	}

	return {
		init: constructor(),
	}
}
