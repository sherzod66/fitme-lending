import { axiosClassic } from '../../api/axios'
import { setUser } from '../../store/useAuth'
import { IUser } from '../../types/user.types'

import { removeFromStorage, saveTokenStorage } from './auth.helper'

export const authService = {
	async login(email: string) {
		return await axiosClassic.post<{
			status: boolean
			message: string
			email: string
		}>('/auth/login', { email })
	},
	async register(body: { email: string; name: string }) {
		return await axiosClassic.post<{
			status: boolean
			message: string
			email: string
		}>('/auth/login', body)
	},
	async verifyCode(body: { email: string; code: string }) {
		const response = await axiosClassic.post<IUser>('/auth/verify-email-web', body)
		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)
		return response
	},

	async getNewTokens() {
		const response = await axiosClassic.post<IUser>('/auth/access-token')
		if (response.data.accessToken) saveTokenStorage(response.data.accessToken)
		return response
	},

	async getNewTokensByRefresh(refreshToken: string) {
		const response = await axiosClassic.post<IUser>(
			'/auth/access-token',
			{},
			{
				headers: {
					Cookie: `refreshToken=${refreshToken}`
				}
			}
		)

		return response.data
	},

	async logout() {
		const response = await axiosClassic.post<boolean>('/auth/logout-web')
		if (response) {
			removeFromStorage()
			setUser(null)
		}
		return response
	}
}
