// import ECGpaper from './ECGpaper.js'
// const canvas = document.querySelector('canvas')
// const ctx = canvas.getContext('2d')
// import data from '@/assets/rhythms.json'
// import Processor from './CurveGenerator.js'

// export default function canvasECG() {
//     canvas.height = window.innerHeight * (7 / 8)
//     canvas.width = canvas.height * (11.69 / 8.27)

//     let constructor = function() {
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

export default function mainSVG() {
    let constructor = function() {
        const helloWorld = document.createElement('h1')
        helloWorld.innerHTML = 'hello world'
        const body = document.querySelector('body')
        body.insertAdjacentHTML('beforeEnd', helloWorld)
    }

    return {
        init: constructor()
    }
}
let main = mainSVG()
