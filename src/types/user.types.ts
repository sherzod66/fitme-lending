export interface IUser {
	id: string
	createdAt: Date
	updatedAt: Date
	name: string
	phoneNumber?: string
	email: string
	role: string
	gender?: string
	avatar?: string
	hasActiveSubscription: boolean
	paymentFailedAttempts?: number
	accessToken?: string
}
