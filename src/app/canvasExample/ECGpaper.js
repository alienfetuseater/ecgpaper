export default function ECGpaper(ctx, canvasHeight, canvasWidth) {
	let _canvasHeight = canvasHeight
	let _canvasWidth = canvasWidth
	const NMBRHORIZSMLBXS = 275
	const NMBRVERTSMLBXS = 212.5
	const NMBRHORIZLRGBXS = 55
	const NMBRVERTLRGBXS = 42.5
	let horizontalMM = _canvasWidth / NMBRHORIZSMLBXS
	let verticalMM = _canvasHeight / NMBRVERTSMLBXS
	let horizontalBB = horizontalMM * 5
	let verticalBB = verticalMM * 5

	const border = function () {
		// outer border
		ctx.strokeStyle = 'black'
		ctx.beginPath()
		ctx.moveTo(horizontalBB, 0)
		ctx.lineTo(horizontalBB, _canvasHeight - 5)
		ctx.lineTo(_canvasWidth - horizontalBB, _canvasHeight - 5)
		ctx.lineTo(_canvasWidth - horizontalBB, 0)
		ctx.lineTo(horizontalBB, 0)
		ctx.stroke()

		// grids
		for (let index = 0.25; index <= 0.75; index += 0.25) {
			// horizontal grids
			ctx.beginPath()
			ctx.moveTo(horizontalBB, canvasHeight * index)
			ctx.lineTo(canvasWidth - horizontalBB, canvasHeight * index)
			ctx.stroke()
			// vertical grids
			ctx.beginPath()
			ctx.moveTo(canvasWidth * index, canvasHeight * 0.25)
			ctx.lineTo(canvasWidth * index, canvasHeight - 5)
			ctx.stroke()
		}
	}

	const constructor = function () {
		// draw vertical small lines
		for (let X = 5; X < NMBRHORIZSMLBXS - 5; X++) {
			ctx.lineWidth = 1
			ctx.strokeStyle = 'orange'
			ctx.beginPath()
			ctx.moveTo(X * horizontalMM, _canvasHeight * 0.25)
			ctx.lineTo(X * horizontalMM, _canvasHeight - 3 * verticalMM)
			ctx.stroke()
		}

		// draw vertical large lines
		for (let X = 1; X <= NMBRHORIZLRGBXS - 1; X++) {
			ctx.lineWidth = 1
			ctx.strokeStyle = 'red'
			ctx.beginPath()
			ctx.moveTo(X * horizontalBB, _canvasHeight * 0.25)
			ctx.lineTo(X * horizontalBB, _canvasHeight - 3 * verticalMM)
			ctx.stroke()
		}

		// draw horizontal small lines
		for (let Y = NMBRVERTSMLBXS * 0.25; Y <= NMBRVERTSMLBXS - 3; Y++) {
			ctx.lineWidth = 1
			ctx.strokeStyle = 'orange'
			ctx.beginPath()
			ctx.moveTo(horizontalBB, Y * verticalMM)
			ctx.lineTo(_canvasWidth - horizontalBB, Y * verticalMM)
			ctx.stroke()
		}

		// draw horizontal large lines
		for (let Y = NMBRVERTLRGBXS * 0.25; Y <= NMBRVERTLRGBXS; Y++) {
			ctx.lineWidth = 1
			ctx.strokeStyle = 'red'
			ctx.beginPath()
			ctx.moveTo(horizontalBB, Y * verticalBB)
			ctx.lineTo(_canvasWidth - horizontalBB, Y * verticalBB)
			ctx.stroke()
		}
		border()
	}

	return {
		init: constructor(),
	}
}
