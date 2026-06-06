import { createBrowserRouter } from 'react-router-dom'
import actions from '@/qiankun/actions'

import Login from '@/pages/login'
import Home from '@/pages/home'

import { CrownFilled } from '@ant-design/icons'

const routers = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/platforms/*',
        handle: {
            microConfig: {
                name: 'sc-cloud-platform',
                entry: `http://localhost:3002/__qiankun_entry.html?t=${Date.now()}`,
                container: '#qiankun-container',
                props: {
                    basicActions: actions,
                },
                sandbox: {
                    // 开启严格的样式隔离，防止样式冲突[reference:10]
                    strictStyleIsolation: true,
                    experimentalStyleIsolation: true,
                },
            },
            name: '平台管理',
            icon: <CrownFilled />,
            access: 'canPlatform',
            routes: [],
        },
        element: <Home />,
    },
    {
        path: '/test/*',
        handle: {
            microConfig: {
                name: 'test', // 子应用名称，必须与子应用配置中的 APP_NAME 严格一致
                entry: `http://localhost:3004/__qiankun_entry.html?t=${Date.now()}`,
                container: '#qiankun-container2',
                props: {
                    basicActions: actions,
                },
                sandbox: {
                    strictStyleIsolation: true,
                    experimentalStyleIsolation: true,
                },
            },

            name: '测试',
            icon: <CrownFilled />,
            access: 'canTest',
            routes: [],
        },
        element: <Home />,
    },
])

export default routers
