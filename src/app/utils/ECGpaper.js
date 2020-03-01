export default function drawLine(
    ctx,
    beginX,
    beginY,
    endX,
    endY,
    lineWidth,
    color
) {
    ctx.lineWidth = lineWidth
    ctx.strokeStyle = color
    ctx.beginPath()
    ctx.moveTo(beginX, beginY)
    ctx.lineTo(endX, endY)
    ctx.stroke()
}

/**
 * the assumption is the canvas we are drawing is a representation of ecg paper,
 * which is 8.5 x 11 inches, in landscape orientation.
 *
 * the small boxes are 1mm x 1mm, and the large boxes are 5mm x 5mm.
 *
 * there are 275 mm in 11 inches, so cavnas.width/275 === 1
 * there are 212.5 mm in 8.5 inches, so canvas.height/212.5 === 1
 * 55 is 1/5 of 275, and 42.5 is 1/5 of 212.5
 *
 * there are 5mm on either side of the ecg
 *
 * so, for the small, horizontal lines, the line definition will look like this:
 *
 * ctx.moveTo(0, Y),
 * ctx.lineTo(canvas.width, Y),
 *
 * where we loop through Y values starting at Y = canvas.height * .25, to canvas.height
 *
 * for the small vertical lines we will do:
 *
 * ctx.moveTo(X, canvas.height * .25)
 * ctx.lineTo(X, canvas.height),
 *
 * where we loop through values of X begining at X = 0 through to cavanas.width
 *
 */
