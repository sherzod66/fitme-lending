import { AxiosResponse } from 'axios'

import { instance, paymeInstance } from '../api/axios'
import { EnumPaymeMethods, PaymeCardWithId } from '../types/payme.types'

class PaymeService {
	private base = '/payme'
	async httpRequest<T>(method: EnumPaymeMethods, params: unknown): Promise<AxiosResponse<T, any>> {
		return paymeInstance.post<T>('', {
			method,
			params
		})
	}

	deleteCard(cardId: string) {
		return instance.delete<{ message: Record<string, string> }>(`${this.base}/cards/${cardId}`)
	}
	switchDefaultCard(cardId: string) {
		return instance.patch<{ message: Record<string, string> }>(
			`${this.base}/cards/default/${cardId}`
		)
	}

	checkCard(token: string) {
		return instance.post<PaymeCardWithId>(`${this.base}/cards/check`, {
			token
		})
	}
}

export const paymeService = new PaymeService()
