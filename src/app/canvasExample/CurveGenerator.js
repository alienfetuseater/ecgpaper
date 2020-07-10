export default function CurveGenerator(ctx, lead, canvasWidth, canvasHeight) {
	ctx.beginPath()
	let begin_x = lead.isoelectric.startX * canvasWidth
	let end_y = lead.isoelectric.endY * canvasHeight
	let curve = lead.curve
	let origin_x = begin_x + 0.125 * canvasWidth
	let origin_y = end_y
	let left_bound = lead.domain[0]
	let right_bound = lead.domain[1]

	const draw = function () {
		for (let x = left_bound; x <= right_bound; x += 0.1) {
			let X = x
			let x_i = x + origin_x
			let y_i = eval(curve) + origin_y
			if (x === left_bound) {
				ctx.moveTo(x_i, y_i)
			}
			ctx.lineTo(x_i, y_i)
		}
		ctx.strokeStyle = 'black'
		ctx.stroke()
	}

	return {
		init: draw,
	}
}
