import { Navigate } from 'react-router-dom'
import { getAccessToken } from '@repo/utils'

const Auth = (props: { children: React.ReactElement }) => {
    const accessToken = getAccessToken()

    if (!Reflect.ownKeys(accessToken)?.length) return <Navigate to="/login"></Navigate>
    return <>{props.children}</>

}

export default Auth