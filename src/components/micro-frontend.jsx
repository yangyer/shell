import React, { useEffect, useState } from 'react'
import { createShell } from 'avail-microfe-base'
import { 
    useHistory,
    Redirect
 } from 'react-router-dom'

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
        listing: {
            type: 'url', // built-in
            name: 'listing',
            data: {
                url: '/listing/asset-manifest.json',
                packageName: 'string',
            },
            target: 'content',
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
        '/listing': {
            moduleId: 'zlisting',
            iconUrl: '',
            displayText: 'Listing'
        },
        '/another-page': {
            displayText: 'Another Page'
        }
    },
    defaultFrontend: ['bookings', 'navigation'],
}

const pubSub = () => {
    const subscribers = {}
  
  function publish(eventName, data) {
    if (!Array.isArray(subscribers[eventName])) {
      return
    }
    subscribers[eventName].forEach((callback) => {
      callback(data)
    })
  }
  
  function subscribe(eventName, callback) {
    if (!Array.isArray(subscribers[eventName])) {
      subscribers[eventName] = []
    }
    subscribers[eventName].push(callback)
  }
  
  return {
    publish,
    subscribe,
  }
}

const Microfrontend = ({}) => {
    const history = useHistory()
    const comms = pubSub()
    const options = {
        history: history,
        routes: Object.keys(loaderConfig.routes)
            .map(key => ({
                ...loaderConfig.routes[key],
                path: key
            })),
        subscribe: (messageType, callback) => {
            const wrapper = (payload) => {
                console.info(`[microfrontend] recieving message '${JSON.stringify(payload, null, '\t')}`)
                callback(payload)
            }
            comms.subscribe(messageType, wrapper)
        },
        publish: (messageType, payload) => {
            console.info(`[microfrontend] someone sent message '${JSON.stringify(payload, null, '\t')}`)
            comms.publish(messageType, payload)
        }
    }
    const shell = createShell(loaderConfig, console, options)
    comms.subscribe('navigation', (msg) => {
       if (!msg.moduleId) {
           history.push(msg.path)
       } else {
           console.info(`[microfrontend] loading '${msg.moduleId}'`)
           shell.loadModule(msg.moduleId)
       }
    })

    useEffect(() => {
        shell.init()
    },[])
    return (
        <div>
            Hi i'm a micro frontend
            <div id='navigation'>
                navigation destination
            </div>
            <div id='content'>
                content destination
            </div>
        </div>
    )
}

export default Microfrontend