import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import router from './router'

import { lightTheme } from '@repo/antd-theme'
import { StyleProvider } from '@ant-design/cssinjs'
import { ConfigProvider, App as Antd } from 'antd'
import { initAntdGlobal } from '@repo/utils'

function InnerApp() {
    const instance = Antd.useApp()
    useEffect(() => {
        initAntdGlobal(instance)
    }, [instance])

    return <RouterProvider router={router} />
}

export default function App() {
    return (
        <StyleProvider hashPriority='high'>
            <ConfigProvider theme={lightTheme}>
                <Antd>
                    <InnerApp />
                </Antd>
            </ConfigProvider>
        </StyleProvider>
    )
}
