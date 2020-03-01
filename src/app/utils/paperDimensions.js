const paperDimensions = function() {
    let windowHeight, windowWidth

    return {
        set windowHeight(val) {
            windowHeight = val
        },
        get windowHeight() {
            return windowHeight
        },
        set windowWidth(val) {
            windowWidth = val
        },
        get windowWidth() {
            return windowWidth
        }
    }
}

export default paperDimensions
