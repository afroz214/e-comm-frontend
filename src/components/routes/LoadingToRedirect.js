import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'

const LoadingToRedirect = () => {

    const [count, setCount] = useState(5)

    const history = useHistory()

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((currentCount) => --currentCount)
        }, 1000)
        count === 0 && history.push('/login')
        return () => clearInterval(interval)
    }, [count])

    return (
        <div className="container pt-5 text-center">
            <h3>We redirecting you in {count} seconds to the login page</h3>
        </div>
    )
}

export default LoadingToRedirect
