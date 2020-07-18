export default function CurveGenerator(ctx, lead, canvasWidth, canvasHeight) {
	ctx.beginPath()
	/**
	 * we do lead.isoelectric.startX * canvasWidth because,
	 * startX, and startY is a fraction, and that results in
	 * a location on the cavnas we want that lead to be placed
	 */

	let begin_x = lead.isoelectric.startX * canvasWidth
	let end_y = lead.isoelectric.endY * canvasHeight
	let curve = lead.curve

	/**
	 * origin_x is the horizontal middle of the leads box,
	 * canvasWidth is muliplied by .125 bc thats 1/8 and
	 * theres 4 boxes, origin_y is the vertical middle of
	 * the box, bc that is where the isoelectric line
	 */

	let origin_x = begin_x + 0.125 * canvasWidth
	let origin_y = end_y
	const NMBRHORIZSMLBXS = 275
	let horizontalMM = canvasWidth / NMBRHORIZSMLBXS
	let left_bound = lead.domain[0] * horizontalMM
	let right_bound = lead.domain[1] * horizontalMM

	// draw draws a short straight line
	const draw = function () {
		for (let x = left_bound; x <= right_bound; x += 0.1) {
			let X = x
			let x_i = x + origin_x
			let y_i = eval(curve) + origin_y

			if (x === left_bound) {
				ctx.moveTo(x_i, y_i)
			}
			ctx.lineTo(x_i, y_i)
			console.info(`${x_i}, ${y_i}`)
		}
		console.groupEnd(lead.lead)
		ctx.strokeStyle = 'black'
		ctx.stroke()
	}

	return {
		init: draw(),
	}
}
