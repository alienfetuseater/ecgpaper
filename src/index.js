import './main.scss'
import drawLine from './app/utils/ECGpaper.js'
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

// this ensures the height is 7/8ths of the window
canvas.height = window.innerHeight * (7 / 8)
// this ensures the width/height ratio conforms to 11/8.5 format of a4 paper ecg paper is printed on
canvas.width = canvas.height * (11 / 8.5)

// ecg paper
const numberHorizontalSmallBoxes = 275
const numberVerticalSmallBoxes = 212.5
const numberHorizontalLargeBoxes = 55
const numberVerticalLargeBoxes = 42.5
const horizontalMM = canvas.width / numberHorizontalSmallBoxes
const horizontalBB = horizontalMM * 5
const verticalMM = canvas.height / numberVerticalSmallBoxes
const verticalBB = verticalMM * 5

// draw vertical small lines
for (let X = 5; X < numberHorizontalSmallBoxes - 5; X++) {
    drawLine(
        ctx,
        X * (canvas.width / numberHorizontalSmallBoxes),
        0,
        X * (canvas.width / numberHorizontalSmallBoxes),
        canvas.height - 3 * verticalMM,
        1,
        'orange'
    )
}

// draw vertical large lines
for (let X = 1; X <= numberHorizontalLargeBoxes - 1; X++) {
    drawLine(
        ctx,
        X * (canvas.width / numberHorizontalLargeBoxes),
        0,
        X * (canvas.width / numberHorizontalLargeBoxes),
        canvas.height - 3 * verticalMM,
        1,
        'red'
    )
}

// draw horizontal small lines
for (let Y = 0; Y <= numberVerticalSmallBoxes - 3; Y++) {
    drawLine(
        ctx,
        horizontalBB,
        Y * (canvas.height / numberVerticalSmallBoxes),
        canvas.width - horizontalBB,
        Y * (canvas.height / numberVerticalSmallBoxes),
        1,
        'orange'
    )
}

// draw horizontal large lines
for (let Y = 0; Y <= numberVerticalLargeBoxes; Y++) {
    drawLine(
        ctx,
        horizontalBB,
        Y * (canvas.height / numberVerticalLargeBoxes),
        canvas.width - horizontalBB,
        Y * (canvas.height / numberVerticalLargeBoxes),
        1,
        'red'
    )
}

function border() {
    ctx.strokeStyle = 'black'
    ctx.beginPath()
    ctx.moveTo(horizontalBB, 0)
    ctx.lineTo(horizontalBB, canvas.height - 5)
    ctx.lineTo(canvas.width - horizontalBB, canvas.height - 5)
    ctx.lineTo(canvas.width - horizontalBB, 0)
    ctx.lineTo(horizontalBB, 0)
    ctx.stroke()
}

border()
