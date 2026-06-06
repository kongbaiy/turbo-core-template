import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import CreateMicroApp from '@/qiankun/create'
import actions from '@/qiankun/actions'

import styles from './index.module.scss'

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

import { AliveScope, KeepAlive } from 'react-activation'

interface AvatarDropdownProps {
    dom: React.ReactNode
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
) => {
    return (
        <div
            style={{ width: '100%' }}
            onClick={() => {
                navigate(item.path!)
            }}
        >
            {dom}
        </div>
    )
}

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

    useEffect(() => {
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
                    MenuItemRender(item, dom, navigate)
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
                    // tabList={[
                    //     {
                    //         tab: 'Basic information',
                    //         key: 'base',
                    //         closable: true,
                    //     },
                    //     {
                    //         tab: 'Detailed information',
                    //         key: 'info',
                    //     },
                    // ]}
                    tabProps={{
                        type: 'editable-card',
                        hideAdd: true,
                    }}
                    className={styles.pageContainer}
                >
                    {/* <AliveScope>
                        <div id='qiankun-container'></div>
                    </AliveScope>

                    <div id='qiankun-container2'></div> */}
                    <CreateMicroApp keepAlive={true} />
                </PageContainer>
            </ProLayout>
        </div>
    )
}

export default () => <Index />
