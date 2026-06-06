import { api } from '@repo/utils'

import { Login } from './index.interface'

export const getPublicKey = () => api.get('/auth/password/public-key')
export const login = (params: Partial<Login>) => api.post('/auth/login', params)
export const getUserInfo = () => api.get('/auth/me')
export const logout = () => api.post('/auth/logout')
export const refreshToken = () => api.post('/auth/token/refresh')

