import { instance } from '../api/axios'
import { IPaginationParams, IPaginationResponse } from '../types/pagination.types'
import { IPaymentMethod } from '../types/payment-method.types'
import { ISubscription } from '../types/subscription.types'
import { ITransaction } from '../types/transaction.types'
import { IUser } from '../types/user.types'

class UserService {
	private base = '/user'

	getProfile() {
		return instance.get<IUser>(`${this.base}/profile`)
	}

	getMySubscriptions() {
		return instance.get<ISubscription>(`${this.base}/subscription`)
	}

	getPaymentMethods() {
		return instance.get<IPaymentMethod[]>(`${this.base}/payment-methods`)
	}

	getTransactions(params: IPaginationParams) {
		return instance.get<IPaginationResponse<ITransaction>>(`${this.base}/transactions`, { params })
	}
}

export const userService = new UserService()
