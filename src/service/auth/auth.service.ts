import { axiosClassic } from '../../api/axios'
import { setUser } from '../../store/useAuth'
import { IUser } from '../../types/user.types'

import { removeFromStorage, saveTokenStorage } from './auth.helper'

export const authService = {
	async requestAdmin(userId: string) {
		return await axiosClassic.post<{
			status: boolean
			message: string
			userId: string
		}>('/auth/login', { userId })
	},
	async adminActivationKey(data: { userId: string; activate_key: string }) {
		const response = await axiosClassic.post<IUser>('/auth/examination-key', data)
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
		const response = await axiosClassic.post<boolean>('/auth/logout')
		if (response) {
			removeFromStorage()
			setUser(null)
		}
		return response
	}
}
