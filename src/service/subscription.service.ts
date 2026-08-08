import { instance } from '../api/axios'
import { ITransaction } from '../types/transaction.types'

class SubscriptionService {
	private base = '/subscription'

	cancel() {
		return instance.patch<{ message: Record<string, string> }>(`${this.base}/cancel`)
	}

	renew(subscriptionId: string) {
		return instance.post<ITransaction | { error: { message: string } }>(`${this.base}/renew`, {
			subscriptionId
		})
	}
}

export const subscriptionService = new SubscriptionService()
