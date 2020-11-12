import React, { useEffect } from 'react'
import { createShell } from 'avail-microfe-base'

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
    const comms = pubSub()
    const options = {
        history: {},
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