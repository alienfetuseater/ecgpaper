import './main.scss'
import ECGpaper from './app/utils/ECGpaper.js'
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')
import data from './assets/rhythms.json'
import Processor from './app/utils/CurveGenerator.js'

// this ensures the height is 7/8ths of the window
canvas.height = window.innerHeight * (7 / 8)
// this ensures the width/height ratio conforms to 11/8.5 format of a4 paper ecg paper is printed on
canvas.width = canvas.height * (11.69 / 8.27)

// ecg paper
let ecgPaper = ECGpaper(ctx, canvas.height, canvas.width)
ecgPaper.init()

data.forEach(el => {
    let processor = Processor(ctx, el, canvas.width, canvas.height)
    processor.init()
})
