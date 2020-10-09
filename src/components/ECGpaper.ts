export default function ECGpaper(
	_width: number,
	_height: number,
	svg: SVGElement,
): { init: void } {
	const xmlns = 'http://www.w3.org/2000/svg'
	const width = _width
	const height = _height
	const NMBRHORIZSMLBXS = 275
	const NMBRVERTSMLBXS = 212
	const NMBRHORIZLRGBXS = 55
	const NMBRVERTLRGBXS = 42
	const horizontalMM = width / NMBRHORIZSMLBXS
	const verticalMM = height / NMBRVERTSMLBXS
	const horizontalBB = horizontalMM * 5
	const verticalBB = verticalMM * 5

	const SmallLines = function () {
		let path = ''
		for (let i = 5; i < NMBRHORIZSMLBXS - 5; i++) {
			// vertical
			path += ` M${i * horizontalMM}, ${height * 0.25} L${
				i * horizontalMM
			}, ${height - 3 * verticalMM}`
		}
		for (let i = NMBRVERTSMLBXS * 0.25; i <= NMBRVERTSMLBXS - 3; i++) {
			// horizontal
			path += ` M ${horizontalBB}, ${i * verticalMM} L ${
				width - horizontalBB
			}, ${i * verticalMM} `
		}
		return path
	}

	const BigLines = function () {
		let path = ''
		for (let i = 1; i <= NMBRHORIZLRGBXS - 1; i++) {
			// vertical
			path += ` M${i * horizontalBB}, ${height * 0.25} L${
				i * horizontalBB
			}, ${height - 3 * verticalMM} `
		}
		for (let i = NMBRVERTLRGBXS * 0.25; i <= NMBRVERTLRGBXS; i++) {
			// horizontal
			path += ` M ${horizontalBB}, ${i * verticalBB} L ${
				width - horizontalBB
			}, ${i * verticalBB} `
		}
		return path
	}

	const LeadBoxes = function () {
		let path = ''

		for (let index = 0.25; index <= 0.75; index += 0.25) {
			path += `M${horizontalBB}, ${height * index} L${
				width - horizontalBB
			}, ${height * index} M${width * index}, ${height * 0.25} L${
				width * index
			}, ${height - 5} `
		}

		return path
	}

	const constructor = function () {
		const section = document.querySelector('section')

		// set up svg
		svg.setAttributeNS(null, 'viewBox', '0 0 ' + width + ' ' + height)
		svg.setAttributeNS(null, 'width', String(width))
		svg.setAttributeNS(null, 'height', String(height))
		svg.style.display = 'block'

		// set up graph paper

		// border
		const border = document.createElementNS(xmlns, 'rect')
		border.setAttributeNS(null, 'x', String(0))
		border.setAttributeNS(null, 'y', String(0))
		border.setAttributeNS(null, 'width', String(width))
		border.setAttributeNS(null, 'height', String(height - verticalMM))
		border.setAttributeNS(null, 'fill', 'white')
		border.setAttributeNS(null, 'stroke', 'black')
		border.setAttributeNS(null, 'stroke-width', '1')

		//grids
		const grids = document.createElementNS(xmlns, 'path')
		grids.setAttributeNS(null, 'd', LeadBoxes())
		grids.setAttributeNS(null, 'fill', 'none')
		grids.setAttributeNS(null, 'stroke', 'black')
		grids.setAttributeNS(null, 'stroke-width', '1')
		grids.setAttributeNS(null, 'stroke-opacity', '.5')

		//small lines
		const smallLines = document.createElementNS(xmlns, 'path')
		smallLines.setAttributeNS(null, 'd', SmallLines())
		smallLines.setAttributeNS(null, 'fill', 'none')
		smallLines.setAttributeNS(null, 'stroke', 'pink')
		smallLines.setAttributeNS(null, 'stroke-width', '0.5')

		//big lines
		const bigLines = document.createElementNS(xmlns, 'path')
		bigLines.setAttributeNS(null, 'd', BigLines())
		bigLines.setAttributeNS(null, 'fill', 'none')
		bigLines.setAttributeNS(null, 'stroke', 'orange')
		bigLines.setAttributeNS(null, 'stroke-width', '1')

		// add svg element to section element
		svg.appendChild(border)
		svg.appendChild(smallLines)
		svg.appendChild(bigLines)
		svg.appendChild(grids)

		const article = document.createElement('article')
		const header = document.createElement('header')
		const p = document.createElement('p')
		p.textContent = 'normal sinus rhythm'
		header.appendChild(p)
		article.appendChild(header)
		article.appendChild(svg)
		section.appendChild(article)
	}

	return {
		init: constructor(),
	}
}
