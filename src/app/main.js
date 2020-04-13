import Routes from '@/router/routes.js'
import Router from '@/router/router.js'
import NavigationBar from '@/components/NavigationBar.js'

const router = Router(Routes)
const navbar = NavigationBar(Routes)
const main = document.querySelector('main')

let clickHandlr = (e) => {
    let routeName = e.target.attributes[0].value
    router.loadRoute(routeName)
}
export default function Main() {
    let constructor = function () {
        main.insertAdjacentHTML('beforebegin', navbar.init)
        const li = document.querySelectorAll('li')

        Routes.forEach((route, index) => {
            li[index].setAttribute('data-path', route.name)
            li[index].addEventListener('click', clickHandlr, false)
        })
    }

    return {
        init: constructor(),
    }
}
