import { instance } from '../api/axios'
import { ISubscriptionPlan } from '../types/subscription-plan.types'

class SubscriptionPlanService {
	private base = '/subscription-plan'

	getAll() {
		return instance.get<ISubscriptionPlan[]>(this.base)
	}
}

export const subscriptionPlanService = new SubscriptionPlanService()
