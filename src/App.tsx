import { register } from './qiankun'

import { lightTheme } from '@repo/antd-theme'
import { StyleProvider } from '@ant-design/cssinjs'
import { ConfigProvider } from 'antd'

export default function App() {
    const [time, setTime] = useState(() => new Date().toTimeString())
    const [count, setCount] = useState(0)
    
    useEffect(() => {
        const timer = setInterval(() => {
            setTime(() => new Date().toTimeString())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    useEffect(() => {
        register()
    }, [])

    const handleAdd = ()=> {
        setCount((count) => count+=1)
    }

    return (
        <StyleProvider hashPriority='high'>
            <ConfigProvider theme={lightTheme}>
                <p>基座应用</p>
                <p>
                    <a href='/child'>进入子应用 (/child)</a>
                    {' | '}
                    <a href='/'>返回基座</a>
                </p>
                <div id='qiankun-child-container'></div>

                <p className='text-red'>{time}</p>
                <button onClick={handleAdd}>add</button>
                <p>{count}</p>
            </ConfigProvider>
        </StyleProvider>
    )
}
