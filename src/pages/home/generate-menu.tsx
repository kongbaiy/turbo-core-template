import React from 'react'

import * as Icons from '@ant-design/icons'

const RenderIcon = (props: { name: string }) => {
    const { name } = props
    const antIcon: { [key: string]: any } = Icons
    return React.createElement(antIcon[name])
}

export const generateMenu = (
    menu: any[],
    rootPath: string,
    parentPath: string = '',
) => {
    return menu.map((item: any) => {
        const handle = item?.handle || {}
        let routes = item?.children || []
        const path = item.path === '/' ? '' : `/${item.path.replace('/', '')}`

        if (item.children?.length) {
            routes = generateMenu(item.children, rootPath, path)
        }

        return {
            path: `${parentPath}${path}`,
            name: handle.name,
            icon: handle.icon && <RenderIcon name={handle.icon} />,
            access: handle.access,
            routes,
        }
    })
}
