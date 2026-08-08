import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { useProfile } from '../../../hooks/useProfile'
import { paymeService } from '../../../service/payme.service'
import { subscriptionService } from '../../../service/subscription.service'
import { userService } from '../../../service/user.service'
import { useAuth } from '../../../store/useAuth'
import { TServerError } from '../../../types/error.types'
import {
	ICardsCreateResponse,
	ICardsGetVerifyCodeResponse,
	ICardsVerifyResponse
} from '../../../types/payme.types'
import { TPaymentCard, TPaymentError, defaultPaymentCard } from '../../../types/payment.types'
import { formatDateTime } from '../../../utils/formatDate'
import { isActiveSubscription } from '../../../utils/subscription'

export const usePaymentMethods = () => {
	const navigate = useNavigate()
	const queryClient = useQueryClient()
	const user = useAuth(store => store.user)
	const { refetch: refetchProfile } = useProfile()
	const [isSelectingCard, setIsSelectingCard] = useState(false)
	const [showAddCard, setShowAddCard] = useState(false)
	const [cancelOpen, setCancelOpen] = useState(false)
	const [loading, setLoading] = useState(false)
	const [step, setStep] = useState<'create-card' | 'card-verify'>('create-card')
	const [error, setError] = useState<TPaymentError | null>(null)

	const { control, handleSubmit, setValue, getValues, reset } = useForm<TPaymentCard>({
		defaultValues: defaultPaymentCard
	})

	const {
		data: subscription,
		isLoading: isSubscriptionLoading,
		refetch,
		isError: isSubscriptionError
	} = useQuery({
		queryKey: ['my-subscription'],
		queryFn: () => userService.getMySubscriptions(),
		select: data => data.data,
		retry: false
	})

	const { data: paymentMethods = [], isLoading: isPaymentMethodsLoading } = useQuery({
		queryKey: ['payment-methods'],
		queryFn: () => userService.getPaymentMethods(),
		select: data => data.data
	})

	const linkedMethod = useMemo(() => {
		if (!subscription?.paymentMethodId) return subscription?.paymentMethod ?? null
		return (
			paymentMethods.find(m => m.id === subscription.paymentMethodId) ||
			subscription.paymentMethod ||
			null
		)
	}, [paymentMethods, subscription?.paymentMethod, subscription?.paymentMethodId])

	const { mutate: switchCard, isPending: isSwitchingCard } = useMutation({
		mutationKey: ['switch-default-card'],
		mutationFn: (cardId: string) => paymeService.switchDefaultCard(cardId),
		onSuccess: async res => {
			const message = res.data.message?.ru
			if (message) toast.success(message)
			await Promise.all([
				queryClient.invalidateQueries({ queryKey: ['payment-methods'] }),
				queryClient.invalidateQueries({ queryKey: ['my-subscription'] })
			])
			setIsSelectingCard(false)
		},
		onError: (err: AxiosError<TServerError>) => {
			toast.error(`${err.response?.data.message}`)
		}
	})

	const { mutate: deleteCard, isPending: isDeletingCard } = useMutation({
		mutationKey: ['delete-card'],
		mutationFn: (cardId: string) => paymeService.deleteCard(cardId),
		onSuccess: res => {
			toast.success(res.data.message?.ru || 'Карта удалена')
			queryClient.invalidateQueries({ queryKey: ['payment-methods'] })
		},
		onError: (err: AxiosError<TServerError>) => {
			toast.error(`${err.response?.data.message}`)
		}
	})

	const { mutate: checkCard, isPending: isCheckingCard } = useMutation({
		mutationKey: ['check-card'],
		mutationFn: (token: string) => paymeService.checkCard(token),
		onSuccess: data => {
			const res = data.data
			if (!res) return
			if ('recurrent' in res && res.recurrent) {
				queryClient.invalidateQueries({ queryKey: ['payment-methods'] })
				toast.success('Карта успешно добавлена')
				setShowAddCard(false)
				retryPayment()
			} else {
				toast.error(res.error?.message ?? 'Не удалось привязать карту')
			}
		},
		onError: (err: AxiosError<TServerError>) => {
			toast.error(`${err.response?.data.message}`)
		}
	})

	const { mutate: payNow, isPending: isPayingNow } = useMutation({
		mutationKey: ['renew-subscription'],
		mutationFn: (subscriptionId: string) => subscriptionService.renew(subscriptionId),
		onSuccess: data => {
			if ('error' in data.data) {
				toast.error(data.data.error.message)
				return
			}
			if (data.data.status === 'SUCCESS') {
				refetch()
				refetchProfile()
				toast.success('Подписка успешно активирована')
			} else if (data.data.status === 'PENDING') {
				toast.success('Ожидание подтверждения платежа')
			} else {
				toast.error('Ошибка при активации подписки')
			}
		},
		onError: (err: AxiosError<TServerError>) => {
			toast.error(`${err.response?.data.message}`)
		}
	})

	const { mutate: cancelSubscription, isPending: isCancelling } = useMutation({
		mutationKey: ['cancel-subscription'],
		mutationFn: () => subscriptionService.cancel(),
		onSuccess: () => {
			refetch()
			refetchProfile()
			setCancelOpen(false)
			toast.success('Подписка отменена')
		},
		onError: (error: AxiosError<TServerError>) => {
			toast.error(`${error.response?.data.message}`)
		}
	})

	const showPayButton =
		user?.hasActiveSubscription === true && (user?.paymentFailedAttempts ?? 0) > 0
	const showCancelButton =
		!isSubscriptionError && isActiveSubscription(subscription) && subscription?.autoRenew === true

	const retryPayment = () => {
		setError(null)
		reset(defaultPaymentCard)
		setStep('create-card')
	}

	const goBackToCard = () => {
		setError(null)
		setStep('create-card')
		setValue('verification.code', '')
		setValue('verification.phoneNumber', '')
		setValue('verification.waitTime', 0)
		setValue('verification.expiresAt', 0)
		setValue('card.token', '')
	}

	const sendCode = async (token: string) => {
		const response = await paymeService.httpRequest<ICardsGetVerifyCodeResponse>(
			'cards.get_verify_code',
			{ token }
		)
		if (!response.data.result) {
			if (response.data.error) {
				setError({ message: response.data.error.message, type: 'card' })
				setLoading(false)
				return
			}
			toast.error('Что-то пошло не так')
			setLoading(false)
			return
		}
		const { wait, phone } = response.data.result
		setLoading(false)
		setValue('verification.code', '')
		setValue('verification.waitTime', wait)
		setValue('verification.expiresAt', Date.now() + wait)
		setValue('verification.phoneNumber', phone)
		setStep('card-verify')
	}

	const onSubmit: SubmitHandler<TPaymentCard> = async data => {
		try {
			setError(null)
			setLoading(true)
			const response = await paymeService.httpRequest<ICardsCreateResponse>('cards.create', {
				card: {
					number: data.card.cardNumber,
					expire: data.card.expiry.replace(/\//g, '')
				},
				save: false
			})
			if (!response.data.result) {
				if (response.data.error) {
					setError({ message: response.data.error.message, type: 'card' })
					setLoading(false)
					return
				}
				toast.error('Что-то пошло не так')
				setLoading(false)
				return
			}
			setValue('card.token', response.data.result.card.token)
			await sendCode(response.data.result.card.token)
		} catch (err: any) {
			setLoading(false)
			toast.error(err?.response?.data?.message ?? 'Что-то пошло не так')
		}
	}

	const cardVerify: SubmitHandler<TPaymentCard> = async data => {
		try {
			setError(null)
			setLoading(true)
			const verifyCode = await paymeService.httpRequest<ICardsVerifyResponse>('cards.verify', {
				token: data.card.token,
				code: data.verification.code
			})
			setLoading(false)
			if (!verifyCode.data.result) {
				if (verifyCode.data.error) {
					setError({ message: verifyCode.data.error.message, type: 'card' })
					return
				}
				toast.error('Что-то пошло не так')
				return
			}
			if (!verifyCode.data.result.card.verify) {
				setError({ message: 'Неверный код', type: 'card' })
				return
			}
			setValue('card.token', verifyCode.data.result.card.token)
			checkCard(verifyCode.data.result.card.token)
		} catch (err: any) {
			setLoading(false)
			toast.error(err?.response?.data?.message ?? 'Что-то пошло не так')
		}
	}

	const resendCode = async () => {
		const token = getValues('card.token')
		if (!token) return
		try {
			setError(null)
			setLoading(true)
			await sendCode(token)
		} catch (err: any) {
			setLoading(false)
			toast.error(err?.response?.data?.message ?? 'Что-то пошло не так')
		}
	}

	const onPayNow = () => {
		if (subscription?.paymentMethodId) {
			payNow(subscription.id)
			return
		}
		navigate('/profile/subscribe')
	}

	const onDelete = (id: string) => {
		if (window.confirm('Вы уверены, что хотите удалить эту карту?')) {
			deleteCard(id)
		}
	}

	return {
		subscription: isSubscriptionError ? null : subscription,
		hasActiveSubscription: !isSubscriptionError && isActiveSubscription(subscription),
		paymentMethods,
		linkedMethod,
		isSelectingCard: isSelectingCard || !linkedMethod,
		isSwitchingCard,
		showPayButton,
		showCancelButton,
		isLoading: isSubscriptionLoading || isPaymentMethodsLoading,
		onChangeCardPress: () => setIsSelectingCard(true),
		onCancelSelectCard: () => setIsSelectingCard(false),
		onSelectCard: (id: string) => {
			if (id === linkedMethod?.id) return
			switchCard(id)
		},
		onPayNow,
		isPayingNow,
		showAddCard,
		setShowAddCard,
		control,
		handleSubmit,
		onSubmit,
		cardVerify,
		step,
		error,
		loading: loading || isCheckingCard,
		retryPayment,
		goBackToCard,
		resendCode,
		onDelete,
		isDeletingCard,
		cancelOpen,
		setCancelOpen,
		isCancelling,
		cancelMessage: `После отмены новые списания средств производиться не будут. Вы сохраните доступ к Premium-функциям до ${formatDateTime(subscription?.nextBillingAt || subscription?.expiresAt)}, после чего подписка завершится автоматически.`,
		onConfirmCancel: () => cancelSubscription()
	}
}
