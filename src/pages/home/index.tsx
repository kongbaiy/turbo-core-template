import type { ProSettings } from '@ant-design/pro-components'
import { PageContainer, ProLayout } from '@ant-design/pro-components'
import { useState } from 'react'
import defaultProps from './menu'

import styles from './index.module.scss'

// const Logo = () => (
//     <img
//         width={80}
//         src='https://test-cloud.szyplus.com/cloud-master/static/logo.1ee0622a.png'
//     />
// )

const Demo = () => {
    const [settings] = useState<Partial<ProSettings> | undefined>({
        fixSiderbar: true,
        layout: 'mix',
        splitMenus: true,
    })

    const [pathname, setPathname] = useState('/list/sub-page/sub-sub-page1')

    return (
        <div className={styles.pageContainer}>
            <ProLayout
                title=''
                logo={
                    'https://test-cloud.szyplus.com/cloud-master/static/logo.1ee0622a.png'
                }
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
