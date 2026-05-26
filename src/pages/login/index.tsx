import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import {
    WechatWorkOutlined,
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons'
import { Button, Checkbox, Divider, Form, Input, Modal, message } from 'antd'
import type { FormProps } from 'antd'

import styles from './index.module.scss'
import { LOGO_URL, STORAGE_KEYS } from '../../constants'

type LoginFormValues = {
    username: string
    password: string
    autoLogin?: boolean
}

const getStoredUsername = () =>
    localStorage.getItem(STORAGE_KEYS.username) ?? ''

const saveLoginSession = (values: LoginFormValues) => {
    localStorage.setItem(STORAGE_KEYS.token, 'mock-token')
    localStorage.setItem(STORAGE_KEYS.username, values.username)

    if (values.autoLogin) {
        localStorage.setItem(STORAGE_KEYS.autoLogin, '1')
    } else {
        localStorage.removeItem(STORAGE_KEYS.autoLogin)
    }
}

export default function Login() {
    const [form] = Form.useForm<LoginFormValues>()
    const [loading, setLoading] = useState(false)
    const [forgotOpen, setForgotOpen] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const autoLogin = localStorage.getItem(STORAGE_KEYS.autoLogin) === '1'
        const token = localStorage.getItem(STORAGE_KEYS.token)

        if (autoLogin && token) {
            navigate('/home')
            return
        }

        const username = getStoredUsername()
        if (username) {
            form.setFieldsValue({
                username,
                autoLogin: localStorage.getItem(STORAGE_KEYS.autoLogin) === '1',
            })
        }
    }, [form])

    const onFinish: FormProps<LoginFormValues>['onFinish'] = async (values) => {
        setLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 600))
            saveLoginSession(values)
            message.success('登录成功').then(() => {
                navigate('/')
            })
        } catch {
            message.error('登录失败，请检查账号密码')
        } finally {
            setLoading(false)
        }
    }

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
                <div className={styles.logoBox}>
                    <img src={LOGO_URL} alt='logo' className={styles.logo} />
                </div>

                <Form<LoginFormValues>
                    layout='vertical'
                    size='large'
                    form={form}
                    className={styles.loginForm}
                    onFinish={onFinish}
                    initialValues={{ autoLogin: false }}
                >
                    <Form.Item
                        label='账号'
                        name='username'
                        rules={[{ required: true, message: '请输入账号' }]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder='请输入账号'
                            autoComplete='username'
                        />
                    </Form.Item>

                    <Form.Item
                        label='密码'
                        name='password'
                        rules={[{ required: true, message: '请输入密码' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder='请输入密码'
                            autoComplete='current-password'
                        />
                    </Form.Item>

                    <div className={styles.formExtras}>
                        <Form.Item
                            name='autoLogin'
                            valuePropName='checked'
                            noStyle
                        >
                            <Checkbox>自动登录</Checkbox>
                        </Form.Item>
                        <Button
                            type='link'
                            className={styles.forgotLink}
                            onClick={() => setForgotOpen(true)}
                        >
                            忘记密码
                        </Button>
                    </div>

                    <Form.Item>
                        <Button
                            type='primary'
                            htmlType='submit'
                            block={true}
                            loading={loading}
                        >
                            登 录
                        </Button>
                    </Form.Item>
                </Form>

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
