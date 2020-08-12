import Routes from '@/router/routes'
import Router from '@/router/router'
import NavigationBar from '@/components/NavigationBar'
import { routeObject } from 'myLib'

const router = Router(Routes)
const navbar = NavigationBar(Routes)
const main = document.querySelector('main')

const clickHandlr = (e: Event) => {
	const routeName = (e.target as Element).attributes[0].value
	router.loadRoute(routeName)
}

export default function Main(): { init: void } {
	const constructor = () => {
		main.insertAdjacentHTML('beforebegin', navbar.init)
		const li = document.querySelectorAll('li')

		Routes.forEach((route: routeObject, index: number) => {
			li[index].setAttribute('data-path', route.name)
			li[index].addEventListener('click', clickHandlr, false)
		})
	}

	return {
		init: constructor(),
	}
}
