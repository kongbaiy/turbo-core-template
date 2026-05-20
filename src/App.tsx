import { useState, useEffect } from 'react'

export default function App() {
    const [count, setCount] = useState(() => new Date().toTimeString())

    useEffect(() => {
        const timer = setInterval(() => {
            setCount(() => new Date().toTimeString())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    return (
        <main className='app-shell'>
            <h1>React in Turbo Core Template</h1>
            <p>
                This app was created inside the current monorepo architecture.
            </p>
            <p>{count}</p>
        </main>
    )
}
