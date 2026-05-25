import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import { asyncComponent } from './async-component'

const routers = createBrowserRouter([
    {
        path: '/login',
        element: asyncComponent(() => import('@/pages/login')),
    },
    {},
])

export default <RouterProvider router={routers} />
