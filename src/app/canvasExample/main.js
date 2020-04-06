// import ECGpaper from './ECGpaper.js'
// import data from '@/assets/rhythms.json'
// import Processor from './CurveGenerator.js'

// export default function canvasECG() {
//     let constructor = function() {
//         // set up canvas
//         const canvas = document.createElement('canvas')
//         const body = document.querySelector('body')
//         body.insertAdjacentHTML('afterbegin', canvas)
//         const ctx = canvas.getContext('2d')
//         canvas.height = window.innerHeight * (7 / 8)
//         canvas.width = canvas.height * (11.69 / 8.27)

//         // ecg paper
//         let ecgPaper = ECGpaper(ctx, canvas.height, canvas.width)
//         ecgPaper.init()

//         data.forEach(el => {
//             let processor = Processor(ctx, el, canvas.width, canvas.height)
//             processor.init()
//         })
//     }

//     return {
//         init: constructor()
//     }
// }

export default function mainCanvas() {
    let constructor = function () {
        const nav = document.querySelector('nav')
        const clearMe = nav.nextElementSibling
        clearMe.remove()
        nav.insertAdjacentHTML('afterEnd', '<h1>hello world from canvas</h1>')
    }

    return {
        init: constructor(),
    }
}
let MainCanvas = mainCanvas()
