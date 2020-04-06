export default function home() {
    let constructor = function () {
        const nav = document.querySelector('nav')
        const clearMe = nav.nextElementSibling
        clearMe.remove()
        nav.insertAdjacentHTML('afterEnd', '<h1>fuck your world from root</h1>')
    }

    return {
        init: constructor(),
    }
}

let Home = home()
