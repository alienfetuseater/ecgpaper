import routes from './routes.js'

export default function Router() {
    let constructor = function() {
        const body = document.querySelector('body')
        const main = document.createElement('main')
        body.insertAdjacentHTML('afterbegin', main)

        let currentPath = window.location.pathname
        let route = routes.filter(r => {
            return r.path === currentPath
        })[0]
        main.insertAdjacentHTML('afterbegin', route.component)
    }

    return {
        init: constructor()
    }
}
