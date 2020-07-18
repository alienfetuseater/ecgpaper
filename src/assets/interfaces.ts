interface leadObject {
	lead: string
	curve: {
		pwave: string
		prsegment: number
		qrs: string
		stsegment: number
		twave: string
	}
	domain: number[]
	isoelectric: {
		startX: number
		startY: number
		endX: number
		endY: number
	}
}
