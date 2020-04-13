export default function NavigationBar(routes) {
    let constructor = function () {
        let list = ''
        routes.forEach((route) => {
            list += `<li>${route.name}</li>`
        })
        return `<nav><ul>${list}</ul></nav>`
    }

    return {
        init: constructor(),
    }
}
