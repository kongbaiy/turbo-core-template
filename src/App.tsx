import { register } from './qiankun'

import { lightTheme } from '@repo/antd-theme'
import { StyleProvider } from '@ant-design/cssinjs'
import { ConfigProvider } from 'antd'

import Home from './home'
import Login from './pages/login'

const isLoginPath = (path: string) => path === '/login' || path === '/login/'

export default function App() {
    const [pathname, setPathname] = useState(window.location.pathname)
    const showLogin = isLoginPath(pathname)

    useEffect(() => {
        const onPopState = () => setPathname(window.location.pathname)
        window.addEventListener('popstate', onPopState)
        return () => window.removeEventListener('popstate', onPopState)
    }, [])

    useEffect(() => {
        if (!showLogin) {
            register()
        }
    }, [showLogin])

    return (
        <StyleProvider hashPriority='high'>
            <ConfigProvider theme={lightTheme}>
                {showLogin ? <Login /> : <Home />}
            </ConfigProvider>
        </StyleProvider>
    )
}
