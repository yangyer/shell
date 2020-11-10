import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// import Manifest from 'bookings/manifest.json'

const loaderConfig = {
    template: 'index.html',
    destinations: {
        navigation: {},
        content: {},
    },
    registry: {
        legacyDash: {
            target: 'content',
        },
        bookings: {
            type: 'url',
            name: 'bookings',
            data: {
                url: '/bookings/asset-manifest.json',
                packageName: 'string',
            },
            target: 'content',
        },
        navigation: {
            type: 'component', // built-in
            data: {
                url: 'string',
                packageName: 'string',
            },
            target: 'navigation',
        },
        shellComponent: {
            type: 'composite',
        },
    },
    routes: {
        '/zbookings': {
            moduleId: 'bookings',
        },
    },
    defaultFrontend: 'bookings',
}

// console.log(Manifest)

// const v = require(loaderConfig.registry.bookings.data.url)

const { registry, defaultFrontend } = loaderConfig

const renderMicroFrontend = () => {
    console.log('Here ', window)
    // window[`${registry[defaultFrontend].name}Render`](
    //     `${registry[defaultFrontend].target}`,
    //     {}
    // )
}

fetch(`${registry[defaultFrontend].data.url}`)
    .then(res => res.json())
    .then(manifest => {
        const script = document.createElement('script')
        script.id = defaultFrontend
        script.crossOrigin = ''
        script.type = 'text/javascript'
        script.src = manifest.files['main.js']
        console.log(manifest.files['main.js'])
        script.onload = renderMicroFrontend
        document.head.appendChild(script)
    })

// /.then(manifest => {
//     const script = document.createElement('script')
//     script.id = scriptId
//     script.crossOrigin = ''
//     script.src = `${host}${manifest['main.js']}`
//     script.onload = this.renderMicroFrontend
//     document.head.appendChild(script)
// })/

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('navigation')
)

console.log('Here 1 ', window)
