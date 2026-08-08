import { ISubscription } from './subscription.types'
import { IUser } from './user.types'

export interface IPaymentMethod {
	id: string
	provider: EnumPaymentProvider
	token: string
	cardPanMasked: string
	cardExpiryDate: string
	cardHolder?: string
	isDefault: boolean
	status: EnumPaymentMethodStatus
	createdAt: Date
	updatedAt: Date
	subscriptions: ISubscription[]
	userId: string
	user: IUser
}

export const EnumPaymentProvider = {
	PAYME: 'PAYME',
	CLICK: 'CLICK',
	APPLE: 'APPLE',
	GOOGLE: 'GOOGLE'
} as const

export type EnumPaymentProvider = (typeof EnumPaymentProvider)[keyof typeof EnumPaymentProvider]

export const EnumPaymentMethodStatus = {
	ACTIVE: 'ACTIVE',
	BLOCKED: 'BLOCKED',
	EXPIRED: 'EXPIRED',
	REMOVED: 'REMOVED'
} as const

export type EnumPaymentMethodStatus =
	(typeof EnumPaymentMethodStatus)[keyof typeof EnumPaymentMethodStatus]
