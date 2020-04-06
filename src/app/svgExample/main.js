export default function mainSVG() {
    let constructor = function () {
        const nav = document.querySelector('nav')
        const clearMe = nav.nextElementSibling
        clearMe.remove()
        nav.insertAdjacentHTML('afterEnd', '<h1>hello world from svg</h1>')
    }

    return {
        init: constructor(),
    }
}
let MainSVG = mainSVG()
