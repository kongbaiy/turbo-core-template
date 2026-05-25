import React from 'react'

export interface RouteConfig {
    path: string
    exact?: boolean
    component?: React.ComponentType<any>
    redirect?: string
    microApp?: string
    children?: RouteConfig[]
}

const routes: RouteConfig[] = [
    {
        path: '/login',
    },
]

export default routes
