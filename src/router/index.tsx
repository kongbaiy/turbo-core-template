import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom'

import { asyncComponent } from './async-component'

import Login from '@/pages/login'

const routers = createBrowserRouter([
    {
        path: '/login',
        element: <Login />,
    },
    {
        path: '/home',
        element: asyncComponent(() => import('@/pages/home')),
        children: [
            {
                path: 'app1',
                handle: {
                    name: '应用1'
                },
            }
        ]
    },
    {
        path: '/',
        loader: () => redirect('/home')
    }
])

export default <RouterProvider router={routers} />
