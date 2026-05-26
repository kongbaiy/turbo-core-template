
import { useNavigate } from 'react-router-dom'
import styles from './index.module.scss'

import type { FormProps } from 'antd'
import { Form, Input, Checkbox, message, Button } from 'antd'

import {
    LockOutlined,
    UserOutlined,
} from '@ant-design/icons'


type LoginFormValues = {
    username: string
    password: string
    autoLogin?: boolean
}

const Account = () => {
    const [form] = Form.useForm<LoginFormValues>()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    const onFinish: FormProps<LoginFormValues>['onFinish'] = async (values) => {
        console.log(values)
        setLoading(true)
        try {
            await new Promise((resolve) => setTimeout(resolve, 600))
            message.success('登录成功').then(() => {
                navigate('/')
            })
        } catch {
            message.error('登录失败，请检查账号密码')
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
            <Form.Item
                name='username'
                rules={[{ required: true, message: '请输入账号' }]}
            >
                <Input
                    prefix={<UserOutlined />}
                    placeholder='请输入账号'
                    autoComplete='username'
                    className={styles.loginInput}
                />
            </Form.Item>

            <Form.Item
                name='password'
                rules={[{ required: true, message: '请输入密码' }]}
            >
                <Input.Password
                    prefix={<LockOutlined />}
                    placeholder='请输入密码'
                    autoComplete='current-password'
                    className={styles.loginInput}
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
                    size='small'
                    className={styles.forgotLink}
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
    )
}

export default Account