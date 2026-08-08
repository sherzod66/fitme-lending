import axios, { type CreateAxiosDefaults } from 'axios'

import { getAccessToken, removeFromStorage } from '../service/auth/auth.helper'
import { authService } from '../service/auth/auth.service'

import { errorCatch } from './api.helper'

const axiosOptions: CreateAxiosDefaults = {
	baseURL: import.meta.env.VITE_PUBLIC_API_URL,
	headers: {
		'Content-Type': 'application/json'
	},
	withCredentials: true
}

export const axiosClassic = axios.create(axiosOptions)

export const instance = axios.create(axiosOptions)

instance.interceptors.request.use(config => {
	const accessToken = getAccessToken()

	if (config?.headers && accessToken) config.headers.Authorization = `Bearer ${accessToken}`

	return config
})

instance.interceptors.response.use(
	config => config,
	async error => {
		const originalRequest = error.config

		if (
			error?.response.status === 401 ||
			errorCatch(error) === 'jwt expired' ||
			(errorCatch(error) === 'jwt muste be  provided' &&
				originalRequest &&
				!originalRequest._isRetry)
		) {
			originalRequest._isRetry = true
			try {
				await authService.getNewTokens()
				return instance.request(originalRequest)
			} catch (error) {
				if (errorCatch(error) === 'jwt expired') removeFromStorage()
			}
		}

		throw error
	}
)
