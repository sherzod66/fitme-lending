import Cookies from 'js-cookie'

export const EnumTokens = {
	ACCESS_TOKEN: 'accessToken',
	REFRESH_TOKEN: 'refreshToken'
} as const

export type EnumTokens = (typeof EnumTokens)[keyof typeof EnumTokens]

export const getAccessToken = () => {
	const accessToken = Cookies.get(EnumTokens.ACCESS_TOKEN)
	return accessToken
}

const cookieOptions = {
	sameSite: 'strict' as const,
	domain: import.meta.env.VITE_CLIENT_DOMAIN,
	secure: true
}

export const saveTokenStorage = (accessToken: string) => {
	Cookies.set(EnumTokens.ACCESS_TOKEN, accessToken, {
		...cookieOptions,
		expires: 1
	})
}

export const removeFromStorage = () => {
	Cookies.remove(EnumTokens.ACCESS_TOKEN, cookieOptions)
}
