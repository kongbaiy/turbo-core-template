import { useState } from 'react'
import styles from './index.module.scss'

import {
    WechatWorkOutlined,
} from '@ant-design/icons'
import { Button, Divider, Form, Input, Modal, message } from 'antd'

import Account from './account'

// const items: TabsProps['items'] = [
//     {
//         key: 'key1',
//         label: '账号登录',
//         children: <Account />,
//     },
//     {
//         key: 'key2',
//         label: '手机号登录',
//         children: <Mobile />,
//     },
// ];

export default function Login() {
    const [forgotOpen, setForgotOpen] = useState(false)
    const handleWechatLogin = () => {
        message.info('企业微信登录功能开发中')
    }

    const handleForgotSubmit = async (values: { account: string }) => {
        await new Promise((resolve) => setTimeout(resolve, 400))
        message.success(`重置链接已发送至与账号 ${values.account} 关联的邮箱`)
        setForgotOpen(false)
    }

    return (
        <div className={styles.loginPage}>
            <aside className={styles.loginPanel}>
                {/* <div className={styles.logoBox}>
                    <img alt='logo' className={styles.logo} />
                </div> */}

                {/* <Tabs defaultActiveKey="1" items={items} centered /> */}
                <h1 className='mb-20px text-center'>欢迎使用运维平台</h1>
                <Account />

                <div className={styles.otherLogin}>
                    <Divider plain>
                        <span className={styles.otherLoginTitle}>
                            其他登录方式
                        </span>
                    </Divider>
                    <Button
                        type='link'
                        block={true}
                        icon={<WechatWorkOutlined />}
                        onClick={handleWechatLogin}
                    >
                        企业微信登录
                    </Button>
                </div>
            </aside>

            <Modal
                title='忘记密码'
                open={forgotOpen}
                onCancel={() => setForgotOpen(false)}
                footer={null}
                destroyOnHidden
            >
                <Form layout='vertical' onFinish={handleForgotSubmit}>
                    <Form.Item
                        name='account'
                        label='账号 / 邮箱'
                        rules={[
                            { required: true, message: '请输入账号或邮箱' },
                        ]}
                    >
                        <Input placeholder='请输入注册账号或邮箱' />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' block>
                            发送重置链接
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}
