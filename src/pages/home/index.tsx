import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation, DataRouteObject } from 'react-router-dom'
// import CreateMicroApp from '@/qiankun/create'
import actions from '@/qiankun/actions'
import router from '@/router'

import { PageContainer, ProLayout } from '@ant-design/pro-components'
import type { ProSettings } from '@ant-design/pro-components'
import { LogoutOutlined } from '@ant-design/icons'
import { Dropdown } from 'antd'
import { getRoute } from './generate-route'
import { generateMenu } from './generate-menu'

import { getUserInfo, logout } from '@/api'
import { useRequest } from '@repo/react-hooks'
import { AnyObject } from 'antd/es/_util/type'

import logoUrl from '@/assets/images/logo.png'
import avatarUrl from '@/assets/images/avatar.jpg'

import styles from './index.module.scss'
import { loadMicroApp } from 'qiankun'

interface AvatarDropdownProps {
    dom: React.ReactNode
}

interface ContainerProps {
    microApps: DataRouteObject[]
}

const logo = <img src={logoUrl} className={styles.logo} />
const token = {
    header: {
        heightLayoutHeader: 46,
        colorBgMenuItemSelected: 'rgba(0,0,0,0.04)',
    },
}

const AvatarDropdown = React.memo((props: AvatarDropdownProps) => {
    const navigate = useNavigate()

    const handleLogout = async () => {
        await logout()
        navigate('/login')
    }
    return (
        <Dropdown
            menu={{
                items: [
                    {
                        key: 'logout',
                        icon: <LogoutOutlined />,
                        label: '退出登录',
                        onClick: handleLogout,
                    },
                ],
            }}
        >
            {props.dom}
        </Dropdown>
    )
})

const MenuItemRender = (
    item: AnyObject,
    dom: React.ReactNode,
    navigate: (to: string) => void,
    microApps: any,
    startMicroApp: any,
) => {
    return (
        <div
            style={{ width: '100%' }}
            onClick={() => {
                console.log('MenuItemRender:', microAppCached)
                const oldMicroApp: any = microApps.find((app: any) => {
                    const path = app.path.replace(/\/\*/, '')
                    return location.pathname.startsWith(path)
                })
                const newMicroApp: any = microApps.find((app: any) => {
                    const path = app.path.replace(/\/\*/, '')
                    return item.path.startsWith(path)
                })

                const app = microAppCached.get(oldMicroApp.id)
                app.unmount()
                microAppCached.delete(oldMicroApp.id)

                app.unmountPromise.then(() => {
                    navigate(item.path!)
                    startMicroApp(newMicroApp)
                })
            }}
        >
            {dom}
        </div>
    )
}

const getContainerId = (container: string) => {
    return container.replace('#', '')
}

const KeepAliveContainer = (props: ContainerProps) => {
    const { microApps = [] } = props
    const location = useLocation()

    return microApps.map((item: any) => {
        const { microConfig } = item?.handle || {}
        const path = item.path.replace(/\/\*/, '')
        const display = location.pathname.startsWith(path) ? 'block' : 'none'

        return (
            <div
                style={{ display }}
                key={getContainerId(microConfig?.container)}
                id={getContainerId(microConfig?.container)}
            ></div>
        )
    })
}

const microAppCached = new Map()

const Index = () => {
    const navigate = useNavigate()
    const location = useLocation()
    const [settings] = useState<Partial<ProSettings> | undefined>({
        fixSiderbar: true,
        layout: 'mix',
        splitMenus: true,
    })
    const [route, setRoute] = useState<AnyObject>(getRoute())

    if (typeof document === 'undefined') {
        return <div />
    }

    const { data: userInfo } = useRequest<AnyObject>(
        useCallback(() => getUserInfo(), []),
    )

    const microApps: DataRouteObject[] = useMemo(
        () => router.routes.filter((item) => item.handle?.microConfig?.name),
        [],
    )
    const microApp: any = microApps.find((item: any) => {
        const path = item.path.replace(/\/\*/, '')
        return location.pathname.startsWith(path)
    })

    useEffect(() => {
        startMicroApp(microApp)

        actions.onGlobalStateChange(({ menu }: any) => {
            if (!menu?.length) return

            const rootPath = window.location.pathname.split('/')[1] || ''
            const routes = generateMenu(menu, `/${rootPath}`)

            for (let i = 0; i < route.routes.length; i++) {
                const { path } = route.routes[i]

                if (
                    path.includes(rootPath) &&
                    !route.routes[i].routes?.length
                ) {
                    route.routes[i].routes = routes
                    break
                }
            }

            setRoute({ ...route })
        })
    }, [])

    const startMicroApp = (app: any) => {
        const cached = microAppCached.get(app.id)

        if (!cached) {
            const microAppInstance = loadMicroApp(app.handle?.microConfig, {
                sandbox: {
                    experimentalStyleIsolation: true,
                },
            })
            microAppCached.set(app.id, microAppInstance)
        } else {
            cached.update?.()
        }
    }

    return (
        <div className={styles.pageContainer}>
            <ProLayout
                {...settings}
                title=''
                logo={logo}
                token={token}
                avatarProps={{
                    src: avatarUrl,
                    size: 'small',
                    title: userInfo?.userName,
                    render: (_, dom) => <AvatarDropdown dom={dom} />,
                }}
                menuItemRender={(item, dom) =>
                    MenuItemRender(
                        item,
                        dom,
                        navigate,
                        microApps,
                        startMicroApp,
                    )
                }
                menuDataRender={() => route.routes}
                location={{
                    pathname: location.pathname,
                }}
            >
                <PageContainer
                    breadcrumb={{
                        routes: [],
                    }}
                    header={{
                        title: '',
                    }}
                    tabProps={{
                        type: 'editable-card',
                        hideAdd: true,
                    }}
                    className={styles.pageContainer}
                >
                    {/* <CreateMicroApp keepAlive={true} /> */}
                    <KeepAliveContainer microApps={microApps} />
                </PageContainer>
            </ProLayout>
        </div>
    )
}

export default Index
