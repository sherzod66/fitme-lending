import { IPaymentMethod } from './payment-method.types'
import { ISubscriptionPlan } from './subscription-plan.types'
import { IUser } from './user.types'

export interface ISubscription {
	id: string
	createdAt: Date
	updatedAt: Date
	startedAt: Date
	expiresAt: Date
	canceledAt?: Date
	nextBillingAt?: Date
	price: string
	currency: string
	status: EnumSubscriptionStatus
	autoRenew: boolean
	userId: string
	user: IUser
	paymentMethodId?: string
	paymentMethod?: IPaymentMethod
	planId?: string
	plan?: ISubscriptionPlan
	lastChargeError: string
}

export const EnumSubscriptionStatus = {
	ACTIVE: 'ACTIVE',
	PAST_DUE: 'PAST_DUE',
	CANCELED: 'CANCELED',
	EXPIRED: 'EXPIRED',
	PAUSED: 'PAUSED'
} as const

export type EnumSubscriptionStatus =
	(typeof EnumSubscriptionStatus)[keyof typeof EnumSubscriptionStatus]

export interface IPurchaseRequest {
	planId: string
	token: string
	cardNumber: string
	cardExpiryDate: string
}
