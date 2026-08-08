/** Клиентские методы Subscribe API: https://developer.help.paycom.uz/metody-subscribe-api/ */
export const EnumPaymeMethods = {
	CARDS_CREATE: 'cards.create',
	CARDS_GET_VERIFY_CODE: 'cards.get_verify_code',
	CARDS_VERIFY: 'cards.verify'
} as const
export type EnumPaymeMethods = (typeof EnumPaymeMethods)[keyof typeof EnumPaymeMethods]

/** Карта в ответе cards.create / cards.verify */
export interface IPaymeCard {
	/** Неполный номер карты, например `860006******6311` */
	number: string
	/** Срок действия, например `03/99` */
	expire: string
	/** Токен карты */
	token: string
	/** Доступна ли карта для последующих платежей */
	recurrent: boolean
	/** Пройдена ли OTP-верификация */
	verify: boolean
}

/** JSON-RPC ошибка Payme */
export interface IPaymeRpcError {
	code: number
	message: string
	data?: unknown
}

/** Обёртка JSON-RPC 2.0 ответа */
export interface IPaymeRpcResponse<T> {
	jsonrpc: '2.0'
	id: number | string
	result?: T
	error?: IPaymeRpcError
}

// ─── cards.create ───────────────────────────────────────────────────────────
// https://developer.help.paycom.uz/metody-subscribe-api/cards.create/

export interface ICardsCreateParams {
	card: {
		number: string
		expire: string
	}
	account?: Record<string, unknown>
	save?: boolean
	customer?: string
}

export interface ICardsCreateResult {
	card: IPaymeCard
}

export type ICardsCreateResponse = IPaymeRpcResponse<ICardsCreateResult>

// ─── cards.get_verify_code ──────────────────────────────────────────────────
// https://developer.help.paycom.uz/metody-subscribe-api/cards.get_verify_code/

export interface ICardsGetVerifyCodeParams {
	token: string
}

export interface ICardsGetVerifyCodeResult {
	/** Результат отправки SMS */
	sent: boolean
	/** Неполный номер телефона, например `99890*****31` */
	phone: string
	/** Время жизни OTP в миллисекундах */
	wait: number
}

export type ICardsGetVerifyCodeResponse = IPaymeRpcResponse<ICardsGetVerifyCodeResult>

// ─── cards.verify ───────────────────────────────────────────────────────────
// https://developer.help.paycom.uz/metody-subscribe-api/cards.verify/

export interface ICardsVerifyParams {
	token: string
	code: string
}

export interface ICardsVerifyResult {
	card: IPaymeCard
}

export type ICardsVerifyResponse = IPaymeRpcResponse<ICardsVerifyResult>

export interface PaymeCardWithId {
	id: string | null
	recurrent: boolean
	error?: IPaymeRpcError
}
