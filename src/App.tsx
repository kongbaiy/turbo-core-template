import { register } from './qiankun'

export default function App() {
    const [count, setCount] = useState(() => new Date().toTimeString())
    
    useEffect(() => {
        const timer = setInterval(() => {
            setCount(() => new Date().toTimeString())
        }, 1000)

        register()

        return () => clearInterval(timer)
    }, [])

    return <div>
        <p>基座应用</p>
        <div id='qiankun-child-container'></div>

        <p className='text-red'>{count}</p>
    </div>
}
