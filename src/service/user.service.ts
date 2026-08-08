import { instance } from '../api/axios'
import { IPaymentMethod } from '../types/payment-method.types'
import { ISubscription } from '../types/subscription.types'
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
}

export const userService = new UserService()
