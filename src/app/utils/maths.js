const width = window.innerWidth
const windowHeigh = window.innerHeight
const paperDimensionsRatio = 8 / 11
const paperHeight = width * paperDimensionsRatio
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

ctx.beginPath()
let origin_x = window.innerWidth / 2
let origin_y = window.innerHeight / 2
let left_bound = -10.0
let right_bound = 10.0

for (let i = left_bound; i <= right_bound; i += 0.1) {
    let x_i = i + origin_x
    let y_i = -Math.pow(i, 2) + origin_y
    if (i === left_bound) {
        ctx.moveTo(x_i, y_i)
    }
    // ctx.lineTo(x_i, y_i)
}
ctx.strokeStyle = 'blue'
ctx.stroke()

ctx.beginPath()
ctx.font = '48px serif'
ctx.fillStyle = 'black'
ctx.fillText('number of circles this time is :' + paperHeight, 400, 50)
