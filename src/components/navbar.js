import routes from '@/router/routes.js'
export default function NavBar(_routeArray) {
    let routeArray = _routeArray

    let clickHandler = e => {
        let route = e.target.attributes[0].value
        let routeInfo = routes.filter(r => {
            return r.path === route
        })[0]
        window.history.pushState({}, '', routeInfo.path)
    }

    const constructor = function() {
        const nav = document.createElement('nav')
        const body = document.querySelector('body')
        body.insertAdjacentElement('afterbegin', nav)
        const ul = document.createElement('ul')
        nav.insertAdjacentElement('afterbegin', ul)

        routeArray.forEach(route => {
            const li = document.createElement('li')
            li.setAttribute('data-path', route.path)
            li.innerHTML = route.name
            ul.insertAdjacentElement('afterbegin', li)
            li.addEventListener('click', clickHandler, false)
        })
    }

    return {
        init: constructor()
    }
}
