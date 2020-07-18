export default function CurveGenerator(lead, canvasWidth, canvasHeight) {
	const svg = document.querySelector('svg')
	const xmlns = 'http://www.w3.org/2000/svg'
	const NMBRHORIZSMLBXS = 275
	let horizontalMM = canvasWidth / NMBRHORIZSMLBXS
	// const NMBRVERTSMLBXS = 212
	// let verticalMM = canvasHeight / NMBRVERTSMLBXS
	// const NMBRHORIZLRGBXS = 55
	// const NMBRVERTLRGBXS = 42
	// let horizontalBB = horizontalMM * 5
	// let verticalBB = verticalMM * 5

	let begin_x = lead.isoelectric.startX * canvasWidth
	let end_y = lead.isoelectric.endY * canvasHeight
	let curve = lead.curve
	let origin_x = begin_x + 0.125 * canvasWidth
	let origin_y = end_y
	let left_bound = lead.domain[0] * horizontalMM
	let right_bound = lead.domain[1] * horizontalMM

	const draw = function () {
		for (let x = left_bound; x <= right_bound; x += 0.1) {
			const line = document.createElementNS(xmlns, 'line')

			let X = x
			let x1 = X + origin_x
			let y1 = eval(curve) + origin_y

			X += 0.1
			let x2 = X + origin_x
			let y2 = eval(curve) + origin_y

			line.setAttributeNS(null, 'x1', x1)
			line.setAttributeNS(null, 'y1', y1)
			line.setAttributeNS(null, 'x2', x2)
			line.setAttributeNS(null, 'y2', y2)
			line.setAttributeNS(null, 'stroke', 'black')
			line.setAttributeNS(null, 'stroke-width', '1')

			svg.appendChild(line)
		}
	}

	return {
		init: draw,
	}
}
