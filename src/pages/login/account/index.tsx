import React from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'

import type { FormProps } from 'antd'
import { Form, Input, Checkbox, message, Button } from 'antd'
import { LockOutlined, UserOutlined } from '@ant-design/icons'

import { getPublicKey, login } from '@/api'
import { encryptLoginPassword, setAccessToken } from '@repo/utils'
import { useRequest } from '@repo/react-hooks'
import { Rule } from 'antd/es/form'

type LoginFormValues = {
    loginAccount: string
    loginPassword: string
    autoLogin?: boolean
}

const formRules: Record<string, Rule[]> = {
    loginAccount: [
        { required: true, message: '请输入账号' },
        { pattern: /^[^\s]*$/, message: '禁止输入空格' },
    ],
    loginPassword: [
        { required: true, message: '请输入密码' },
        { pattern: /^[^\s]*$/, message: '禁止输入空格' },
    ],
}

const Account = () => {
    const navigate = useNavigate()
    const [form] = Form.useForm<LoginFormValues>()
    const [loading, setLoading] = useState<boolean>()

    const { data: publicKeyData, reload: reloadGetPublicKey } = useRequest<any>(
        useCallback(() => getPublicKey(), []),
    )

    const onFinish: FormProps<LoginFormValues>['onFinish'] = ({
        autoLogin,
        ...other
    }) => {
        if (!publicKeyData?.publicKey) {
            reloadGetPublicKey(() => sendLogin(other))
            return
        }
        sendLogin(other)
    }

    const sendLogin = async (params: LoginFormValues) => {
        try {
            setLoading(true)

            const loginPassword = await encryptLoginPassword(
                params.loginPassword,
                publicKeyData.publicKey,
            )
            const { data } = await login({
                ...params,
                loginPassword,
                platformCode: 'PLATFORM_PC',
            })
            await message.open({
                type: 'success',
                content: '登录成功',
            })

            setAccessToken({
                Authorization: data.accessToken,
                sessionId: data.sessionId,
            })
            navigate('/platforms', { replace: true })
        } finally {
            setLoading(false)
        }
    }

    return (
        <Form<LoginFormValues>
            layout='vertical'
            size='large'
            form={form}
            className={styles.loginForm}
            onFinish={onFinish}
            initialValues={{ autoLogin: false }}
        >
            <Form.Item name='loginAccount' rules={formRules.loginAccount}>
                <Input
                    prefix={<UserOutlined />}
                    placeholder='请输入账号'
                    autoComplete='loginAccount'
                    allowClear
                    maxLength={20}
                />
            </Form.Item>

            <Form.Item name='loginPassword' rules={formRules.loginPassword}>
                <Input.Password
                    prefix={<LockOutlined />}
                    placeholder='请输入密码'
                    autoComplete='current-password'
                    allowClear
                    maxLength={20}
                />
            </Form.Item>

            <div className={styles.formExtras}>
                <Form.Item name='autoLogin' valuePropName='checked' noStyle>
                    <Checkbox>自动登录</Checkbox>
                </Form.Item>
                <Button type='link' size='small'>
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
    )
}

export default React.memo(Account)
