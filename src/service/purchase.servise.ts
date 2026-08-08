import { instance } from '../api/axios'
import { IPurchaseRequest } from '../types/subscription.types'
import { ITransaction } from '../types/transaction.types'

class PurchaseService {
	private base = '/subscription'

	purchase(dto: IPurchaseRequest) {
		return instance.post<ITransaction | { error: { message: string } }>(
			`${this.base}/purchase`,
			dto
		)
	}
}

export const purchaseService = new PurchaseService()
