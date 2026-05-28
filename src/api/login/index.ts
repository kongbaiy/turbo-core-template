import { api } from '@repo/utils'

import {
    Login
} from './index.interface'


export const login = (params: Partial<Login>) => api.post('/auth/login', params)
export const getPublicKey = () => api.get('/auth/password/public-key')


