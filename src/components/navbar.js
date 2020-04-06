import Router from '@/router/router.js'
import Routes from '@/router/routes.js'

export default function NavBar() {
    let clickHandlr = (e) => {
        let route = e.target.attributes[0].value
        const router = Router(Routes)
        router.loadRoute(route)
    }

    const constructor = function () {
        const nav = document.createElement('nav')
        const body = document.querySelector('body')
        body.insertAdjacentElement('afterbegin', nav)
        const ul = document.createElement('ul')
        nav.insertAdjacentElement('afterbegin', ul)

        Routes.forEach((route) => {
            const li = document.createElement('li')
            li.setAttribute('data-path', route.component)
            li.innerHTML = route.name
            ul.insertAdjacentElement('afterbegin', li)
            li.addEventListener('click', clickHandlr, false)
        })
    }

    return {
        init: constructor(),
    }
}
