import { useState } from 'react'
import { useMatches, useLocation } from 'react-router-dom'

import styles from './index.module.scss'

import type { ProSettings } from '@ant-design/pro-components'
import { PageContainer, ProLayout } from '@ant-design/pro-components'
import defaultProps from './menu'

const logo = (
    <img
        src='https://test-cloud.szyplus.com/cloud-master/static/logo.1ee0622a.png'
        className={styles.logo}
    />
)

const Demo = () => {
    const [settings] = useState<Partial<ProSettings> | undefined>({
        fixSiderbar: true,
        layout: 'mix',
        splitMenus: true,
    })
    const [pathname, setPathname] = useState('/admin/sub-page1')
    console.log('useMatches:', useMatches())
    console.log('useLocation:', useLocation())

    return (
        <div className={styles.pageContainer}>
            <ProLayout
                title=''
                logo={logo}
                token={{
                    header: {
                        heightLayoutHeader: 46,
                    },
                }}
                {...defaultProps}
                location={{
                    pathname,
                }}
                menuItemRender={(item, dom) => (
                    <a
                        onClick={() => {
                            setPathname(item.path || '/welcome')
                        }}
                    >
                        {dom}
                    </a>
                )}
                {...settings}
            >
                <PageContainer
                    breadcrumb={{
                        routes: [],
                    }}
                    header={{
                        title: '',
                    }}
                    tabList={[
                        {
                            tab: 'Basic information',
                            key: 'base',
                            closable: true,
                        },
                        {
                            tab: 'Detailed information',
                            key: 'info',
                        },
                    ]}
                    tabProps={{
                        type: 'editable-card',
                        hideAdd: true,
                    }}
                    className={styles.pageContainer}
                >
                    <div id='qiankun-child-container'></div>
                </PageContainer>
            </ProLayout>
        </div>
    )
}

export default () => <Demo />
