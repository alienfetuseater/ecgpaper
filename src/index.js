import './main.scss'
import Navbar from './components/navbar.js'
import Router from './router/main.js'

const routerArray = [
    { name: 'home', path: '/' },
    { name: 'canvas', path: '/canvasExample' },
    { name: 'svg', path: '/svgExample' }
]
let navbar = Navbar(routerArray)
let router = Router()
