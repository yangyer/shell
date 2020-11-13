import React from 'react'
import { useHistory } from 'react-router-dom'

const AnotherPage = ({

}) => {
    const history = useHistory()
    return (
        <div>
            <h1>Another Page</h1>
            <button onClick={() => history.push('/')}>Go Home</button>
            <button onClick={() => history.push('/zbookings')}>Booking</button>
            <button onClick={() => history.push('/zbookings/1222')}>Booking With ID</button>
        </div>
    )
}

export default AnotherPage