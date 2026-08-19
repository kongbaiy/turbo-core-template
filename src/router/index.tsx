import { createBrowserRouter } from 'react-router-dom'
import actions from '@/qiankun/actions'

import Login from '@/pages/login'
import Home from '@/pages/home'

import { CrownFilled } from '@ant-design/icons'
import { RepoNotFound } from '@repo/react-components'

const routers = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/platforms/*',
        handle: {
            microConfig: {
                name: 'turbo-qiankun-subapp',
                entry: `http://localhost:3010/__qiankun_entry.html?t=${Date.now()}`,
                container: '#turbo-qiankun-subapp',
                props: {
                    basicActions: actions,
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
                name: 'turbo-qiankun-subapp2',
                entry: `http://localhost:3011/__qiankun_entry.html?t=${Date.now()}`,
                container: '#test',
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

    {
        path: '*',
        element: <RepoNotFound />,
    },
])

export default routers
