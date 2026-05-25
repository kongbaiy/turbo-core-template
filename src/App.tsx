import { register } from '../qiankun'

import { lightTheme } from '@repo/antd-theme'
import { StyleProvider } from '@ant-design/cssinjs'
import { ConfigProvider } from 'antd'

import Home from './home'

export default function App() {
    useEffect(() => {
        register()
    }, [])

    return (
        <StyleProvider hashPriority='high'>
            <ConfigProvider theme={lightTheme}>
                <Home />
            </ConfigProvider>
        </StyleProvider>
    )
}
