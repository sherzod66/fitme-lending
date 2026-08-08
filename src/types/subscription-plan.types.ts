export interface ISubscriptionPlan {
	id: string
	createdAt: Date
	name: Record<string, string>
	code: string
	description?: Record<string, string>
	isPopular: boolean
	price: number
	oldPrice: number
	currency: string
	durationMonths: number
	position: number
	isActive: boolean
}
