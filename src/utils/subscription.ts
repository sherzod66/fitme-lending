import { EnumSubscriptionStatus, ISubscription } from '../types/subscription.types'

export const isActiveSubscription = (subscription?: ISubscription | null) => {
	if (!subscription) return false
	return (
		subscription.status === EnumSubscriptionStatus.ACTIVE ||
		subscription.status === EnumSubscriptionStatus.PAST_DUE
	)
}
