export type TPaymentParams = {
	planId: string
	step: 'create-card' | 'card-verify'
}

export type TPaymentError = {
	message: string
	type: 'card' | 'payment' | 'technical'
}

export type TPaymentCard = {
	card: {
		cardNumber: string
		expiry: string
		token: string
	}
	verification: {
		code: string
		phoneNumber: string
		waitTime: number
		/** Timestamp (ms), когда OTP перестаёт быть валидным */
		expiresAt: number
	}
	acceptedTerms: boolean
}

export const defaultPaymentCard: TPaymentCard = {
	acceptedTerms: false,
	card: {
		cardNumber: '',
		expiry: '',
		token: ''
	},
	verification: {
		code: '',
		phoneNumber: '',
		waitTime: 0,
		expiresAt: 0
	}
}
