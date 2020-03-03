export default function mainSVG() {
    let constructor = function() {
        const helloWorld = document.createElement('h1')
        helloWorld.innerHTML = 'hello world'
        const body = document.querySelector('body')
        body.insertAdjacentHTML('beforeEnd', helloWorld)
    }

    return {
        init: constructor
    }
}
let main = mainSVG()
