import { useEffect, useState } from 'react'
import { Control, Controller, SubmitHandler, UseFormHandleSubmit, useWatch } from 'react-hook-form'

import { TPaymentCard, TPaymentError } from '../../types/payment.types'
import { Button } from '../ui/Button.tsx/Button'

import PaymentErrorBanner from './PaymentErrorBanner'

type Props = {
	control: Control<TPaymentCard>
	handleSubmit: UseFormHandleSubmit<TPaymentCard>
	verifyCode: SubmitHandler<TPaymentCard>
	loading: boolean
	error: TPaymentError | null
	onRetryPayment: () => void
	onResendCode: () => void
	onBackToCard: () => void
}

const formatRemaining = (ms: number) => {
	const totalSeconds = Math.ceil(ms / 1000)
	const minutes = Math.floor(totalSeconds / 60)
	const seconds = totalSeconds % 60
	return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export default function VerificationCodeForm({
	control,
	handleSubmit,
	verifyCode,
	loading,
	error,
	onRetryPayment,
	onResendCode,
	onBackToCard
}: Props) {
	const phoneNumber = useWatch({ control, name: 'verification.phoneNumber' })
	const expiresAt = useWatch({ control, name: 'verification.expiresAt' })
	const [remainingMs, setRemainingMs] = useState(0)

	useEffect(() => {
		if (!expiresAt) {
			setRemainingMs(0)
			return
		}
		const tick = () => setRemainingMs(Math.max(0, expiresAt - Date.now()))
		tick()
		const interval = setInterval(tick, 1000)
		return () => clearInterval(interval)
	}, [expiresAt])

	const canResend = remainingMs <= 0

	return (
		<form
			onSubmit={handleSubmit(verifyCode)}
			className='w-full flex flex-col gap-3'
		>
			<button
				type='button'
				onClick={onBackToCard}
				disabled={loading}
				className='text-[#ddded8] text-sm text-left hover:opacity-80 disabled:opacity-50'
			>
				← Назад к данным карты
			</button>

			<PaymentErrorBanner
				error={error}
				onRetry={onRetryPayment}
			/>

			<div className='flex flex-col gap-2'>
				<p className='text-white text-xs font-medium'>Код подтверждения</p>
				{!!phoneNumber && (
					<p className='text-[#505050] text-xs'>Код отправлен на номер {phoneNumber}</p>
				)}
				<Controller
					control={control}
					name='verification.code'
					rules={{ required: 'Введите код из SMS' }}
					render={({ field: { value, onChange }, fieldState: { error: fieldError } }) => (
						<>
							<div className='bg-[#1c1c1e] rounded-xl p-2.5'>
								<input
									value={value}
									onChange={e => onChange(e.target.value.replace(/\D/g, '').slice(0, 6))}
									placeholder='000000'
									inputMode='numeric'
									maxLength={6}
									autoFocus
									disabled={loading}
									className='bg-transparent outline-none text-white text-center text-lg tracking-[0.3em] w-full placeholder:text-[#505050] placeholder:tracking-normal'
								/>
							</div>
							{fieldError && <p className='text-red-500 text-xs'>{fieldError.message}</p>}
						</>
					)}
				/>
			</div>

			{canResend ? (
				<button
					type='button'
					onClick={onResendCode}
					disabled={loading}
					className='text-[#ff383c] text-sm underline self-start disabled:opacity-50'
				>
					Запросить код заново
				</button>
			) : (
				<p className='text-[#505050] text-xs'>Код действителен ещё {formatRemaining(remainingMs)}</p>
			)}

			<Button
				type='submit'
				size='big'
				loading={loading}
				extra='w-full !rounded-[10px]'
			>
				Подтвердить код
			</Button>
		</form>
	)
}
