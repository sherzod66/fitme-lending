import { ISubscriptionPlan } from './subscription-plan.types'

export interface ITransaction {
	id: string
	createdAt: Date
	updatedAt: Date
	amount: number
	currency: string
	provider: EnumPaymentProvider
	status: EnumTransactionStatus
	type: EnumTransactionType
	product: EnumTransactionProduct
	nutritionPlanId?: string
	workoutPlanId?: string
	plan?: ISubscriptionPlan
	providerTransactionId?: string
	providerOrderId?: string
	errorCode?: string
	errorMessage?: string
}

export const EnumPaymentProvider = {
	PAYME: 'PAYME',
	CLICK: 'CLICK',
	UZUMBANK: 'UZUMBANK',
	OTHER: 'OTHER',
	ADMIN_GRANT: 'ADMIN_GRANT'
} as const

export type EnumPaymentProvider = (typeof EnumPaymentProvider)[keyof typeof EnumPaymentProvider]

export const EnumTransactionStatus = {
	PENDING: 'PENDING',
	SUCCESS: 'SUCCESS',
	FAILED: 'FAILED',
	CANCELED: 'CANCELED',
	REFUNDED: 'REFUNDED'
} as const
export type EnumTransactionStatus =
	(typeof EnumTransactionStatus)[keyof typeof EnumTransactionStatus]

export const EnumTransactionType = {
	PAYIN: 'PAYIN',
	PAYOUT: 'PAYOUT'
} as const
export type EnumTransactionType = (typeof EnumTransactionType)[keyof typeof EnumTransactionType]

export const EnumTransactionProduct = {
	WORKOUT_PLAN: 'WORKOUT_PLAN',
	NUTRITION_PLAN: 'NUTRITION_PLAN',
	SUBSCRIPTION: 'SUBSCRIPTION',
	OTHER: 'OTHER'
} as const
export type EnumTransactionProduct =
	(typeof EnumTransactionProduct)[keyof typeof EnumTransactionProduct]

export const getTransactionStatusMeta = (status: EnumTransactionStatus) => {
	switch (status) {
		case EnumTransactionStatus.SUCCESS:
			return { label: 'Оплачено', color: '#34C759' }
		case EnumTransactionStatus.PENDING:
			return { label: 'В ожидании', color: '#FF8D28' }
		case EnumTransactionStatus.FAILED:
		case EnumTransactionStatus.CANCELED:
			return { label: 'Ошибка оплаты', color: '#FF2D55' }
		case EnumTransactionStatus.REFUNDED:
			return { label: 'Возврат', color: '#8E8E8E' }
		default:
			return { label: status, color: '#8E8E8E' }
	}
}
