import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { CreateRxJsCommsLayer } from 'avail-microfe-base'

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
            name: 'navigation',
            data: {
                url: '/navigation/asset-manifest.json',
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
            iconUrl: '',
            displayText: 'Bookings'
        },
    },
    defaultFrontend: ['bookings', 'navigation'],
}

// console.log(Manifest)

// const v = require(loaderConfig.registry.bookings.data.url)

const { routes, registry, defaultFrontend } = loaderConfig



const renderMicroFrontend = (frontEnd, config) => () => {
    const { __mfeRegistration } = window
    const frontEndRegInfo = config[frontEnd]
    if (__mfeRegistration) {
        const frontEndRegObj = __mfeRegistration[`${frontEndRegInfo.name}Reg`]
        frontEndRegObj
            .init({}, `${frontEndRegInfo.target}`, { history: {} })
            .registerLayer(CreateRxJsCommsLayer())
            .then(() => console.log(`finish mounting '${frontEndRegInfo.name}'.`))
    }
}

defaultFrontend
    .forEach(frontEnd => {
        fetch(`${registry[frontEnd].data.url}`)
            .then(res => res.json())
            .then(manifest => {
                console.log('manifest:', manifest)
                const script = document.createElement('script')
                script.id = `${frontEnd}-script`
                script.crossOrigin = ''
                script.type = 'text/javascript'
                script.src = manifest.files['main.js']
                console.log(manifest.files['main.js'])
                script.onload = renderMicroFrontend(frontEnd, registry)
                document.head.appendChild(script)
            })
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
