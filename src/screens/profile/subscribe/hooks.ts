import { useMutation, useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useEffect, useMemo, useState } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { useProfile } from '../../../hooks/useProfile'
import { paymeService } from '../../../service/payme.service'
import { purchaseService } from '../../../service/purchase.servise'
import { subscriptionPlanService } from '../../../service/subscription-plan.service'
import { TServerError } from '../../../types/error.types'
import {
	ICardsCreateResponse,
	ICardsGetVerifyCodeResponse,
	ICardsVerifyResponse
} from '../../../types/payme.types'
import {
	TPaymentCard,
	TPaymentError,
	TPaymentParams,
	defaultPaymentCard
} from '../../../types/payment.types'
import { IPurchaseRequest } from '../../../types/subscription.types'

const defaultValues: TPaymentParams = {
	planId: '',
	step: 'create-card'
}

export const useSubscribe = () => {
	const navigate = useNavigate()
	const { refetch } = useProfile()
	const [error, setError] = useState<TPaymentError | null>(null)
	const [params, setParams] = useState<TPaymentParams>(defaultValues)
	const [loading, setLoading] = useState(false)

	const { mutate, isPending } = useMutation({
		mutationKey: ['subscribe-purchase'],
		mutationFn: (dto: IPurchaseRequest) => purchaseService.purchase(dto),
		onSuccess: data => {
			if ('error' in data.data) {
				setError({ message: data.data.error.message, type: 'payment' })
				return
			}
			if (data.data.status === 'SUCCESS') {
				refetch()
				toast.success('Подписка успешно активирована')
				navigate('/profile')
			} else if (data.data.status === 'PENDING') {
				toast.success('Ожидание подтверждения платежа')
				navigate('/profile')
			} else {
				toast.error('Ошибка при активации подписки')
			}
		},
		onError: (err: AxiosError<TServerError>) => {
			toast.error(`${err.response?.data.message}`)
		}
	})

	const { data: subscriptionPlans = [], isLoading } = useQuery({
		queryKey: ['subscription-plans'],
		queryFn: () => subscriptionPlanService.getAll(),
		select: data => data.data
	})

	const { control, handleSubmit, setValue, getValues, reset } = useForm<TPaymentCard>({
		defaultValues: defaultPaymentCard
	})

	const activePlan = useMemo(
		() => subscriptionPlans.find(plan => plan.id === params.planId),
		[params.planId, subscriptionPlans]
	)

	useEffect(() => {
		if (subscriptionPlans.length > 0) {
			setParams({
				planId: subscriptionPlans.find(plan => plan.isPopular)?.id ?? subscriptionPlans[0].id,
				step: 'create-card'
			})
		}
	}, [subscriptionPlans])

	const onSelectPlan = (planId: string) => {
		if (params.step !== 'create-card') return
		setParams(prev => ({ ...prev, planId }))
	}

	const retryPayment = () => {
		setError(null)
		reset(defaultPaymentCard)
		setParams(prev => ({ ...prev, step: 'create-card' }))
	}

	const goBackToCard = () => {
		setError(null)
		setParams(prev => ({ ...prev, step: 'create-card' }))
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
		setParams(prev => ({ ...prev, step: 'card-verify' }))
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
			mutate({
				planId: params.planId,
				token: verifyCode.data.result.card.token,
				cardNumber: data.card.cardNumber,
				cardExpiryDate: data.card.expiry
			})
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

	return {
		control,
		handleSubmit,
		params,
		subscriptionPlans,
		onSubmit,
		isLoading,
		error,
		cardVerify,
		loading: loading || isPending,
		retryPayment,
		resendCode,
		goBackToCard,
		activePlan,
		onSelectPlan
	}
}
