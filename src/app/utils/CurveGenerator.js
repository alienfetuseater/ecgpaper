export default function CurveGenerator(curve, coordinates, ctx) {
    ctx.beginPath()
    let origin_x = coordinates.x
    let origin_y = coordinates.y
    let left_bound = coordinates.begin
    let right_bound = coordinates.end

    for (let i = left_bound; i <= right_bound; i += 0.1) {
        let x_i = i + origin_x
        let y_i = curve + origin_y
        if (i === left_bound) {
            ctx.moveTo(x_i, y_i)
        }
        ctx.lineTo(x_i, y_i)
    }
    ctx.strokeStyle = 'black'
    ctx.stroke()
}
