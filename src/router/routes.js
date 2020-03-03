// import Route from './route.js'

export default [
    {
        path: '/',
        name: 'root',
        component: () => import('@/app/main.js')
    },
    {
        path: '/canvasExample',
        name: 'canvas example',
        component: () => import('@/app/canvasExample/main.js')
    },
    {
        path: '/svgExample',
        name: 'svg example',
        component: () => import('@/app/svgExample/main.js')
    }
]
// )

// export default router
