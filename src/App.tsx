import { useState, useEffect } from 'react'
// import AppStyle from './app.module.css'
// import TestStyle from './test.module.scss'

export default function App() {
    const [count, setCount] = useState(() => new Date().toTimeString())

    useEffect(() => {
        const timer = setInterval(() => {
            setCount(() => new Date().toTimeString())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return <p className='text-red'>{count}</p>
}
