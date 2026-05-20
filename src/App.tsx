import { useState } from 'react'

export default function App() {
    const [count, setCount] = useState(new Date().toTimeString())

    setInterval(() => {
        setCount(() => new Date().toTimeString())
    }, 1000)

    return (
        <main className='app-shell'>
            <h1>React in Turbo Core Template1</h1>
            <p>
                This app was created inside the current monorepo architecture.
            </p>
            <p>{count}</p>
        </main>
    )
}
