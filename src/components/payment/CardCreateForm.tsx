import { Check, CreditCard } from 'lucide-react'
import { Control, Controller, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form'
import { Link } from 'react-router-dom'

import { SUBSCRIPTION_TERMS_URL } from '../../constants/constants'
import { TPaymentCard, TPaymentError } from '../../types/payment.types'
import { formatCardNumber, formatExpiry } from '../../utils/cardFormat'
import { Button } from '../ui/Button.tsx/Button'

import PaymentErrorBanner from './PaymentErrorBanner'

type Props = {
	control: Control<TPaymentCard>
	handleSubmit: UseFormHandleSubmit<TPaymentCard>
	onSubmit: SubmitHandler<TPaymentCard>
	submitButtonText: string
	loading: boolean
	error: TPaymentError | null
	onRetryPayment: () => void
	requireTerms?: boolean
}

export default function CardCreateForm({
	control,
	handleSubmit,
	onSubmit,
	submitButtonText,
	loading,
	error,
	onRetryPayment,
	requireTerms = true
}: Props) {
	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='w-full flex flex-col gap-2'
		>
			<PaymentErrorBanner
				error={error}
				onRetry={onRetryPayment}
			/>

			<div className='flex flex-col gap-[5px] w-full'>
				<div className='flex items-center justify-between w-full'>
					<p className='text-white text-xs font-medium'>Номер карты</p>
					<div className='flex gap-1 items-end'>
						<img
							src='/images/payment/Uzcard.png'
							alt='Uzcard'
							className='h-[21px] w-4 object-contain'
						/>
						<img
							src='/images/payment/Humo.png'
							alt='Humo'
							className='size-[23px] object-contain'
						/>
					</div>
				</div>
				<Controller
					control={control}
					name='card.cardNumber'
					rules={{
						required: 'Введите номер карты',
						validate: value =>
							value.replace(/\s/g, '').length === 16 || 'Номер карты должен содержать 16 цифр'
					}}
					render={({ field: { value, onChange }, fieldState: { error: fieldError } }) => (
						<>
							<div className='bg-[#1c1c1e] rounded-xl p-2.5 flex items-center justify-between'>
								<input
									value={formatCardNumber(value)}
									onChange={e => onChange(e.target.value.replace(/\s/g, ''))}
									placeholder='0000 0000 0000 0000'
									inputMode='numeric'
									maxLength={19}
									className='bg-transparent outline-none text-white text-xs font-medium flex-1 placeholder:text-[#505050]'
									disabled={loading}
								/>
								<CreditCard
									className='size-[18px] text-[#505050]'
									strokeWidth={1.75}
								/>
							</div>
							{fieldError && <p className='text-red-500 text-xs'>{fieldError.message}</p>}
						</>
					)}
				/>
			</div>

			<div className='flex flex-col gap-[5px] w-full pt-2.5'>
				<p className='text-white text-xs font-medium'>Годен до</p>
				<Controller
					control={control}
					name='card.expiry'
					rules={{
						required: 'Введите срок действия',
						validate: value => {
							if (!/^\d{2}\/\d{2}$/.test(value)) return 'Формат MM/YY'
							const month = Number(value.slice(0, 2))
							if (month < 1 || month > 12) return 'Некорректный месяц'
							return true
						}
					}}
					render={({ field: { value, onChange }, fieldState: { error: fieldError } }) => (
						<>
							<div className='bg-[#1c1c1e] rounded-xl p-2.5'>
								<input
									value={formatExpiry(value)}
									onChange={e => onChange(formatExpiry(e.target.value))}
									placeholder='MM/YY'
									inputMode='numeric'
									maxLength={5}
									className='bg-transparent outline-none text-white text-xs font-medium w-full placeholder:text-[#505050]'
									disabled={loading}
								/>
							</div>
							{fieldError && <p className='text-red-500 text-xs'>{fieldError.message}</p>}
						</>
					)}
				/>
			</div>

			{requireTerms && (
				<Controller
					control={control}
					name='acceptedTerms'
					rules={{
						validate: value => value || 'Необходимо принять условия'
					}}
					render={({ field: { value, onChange }, fieldState: { error: fieldError } }) => (
						<div className='pt-4 pb-4'>
							<label className='flex gap-2.5 items-start cursor-pointer'>
								<button
									type='button'
									onClick={() => onChange(!value)}
									className={`size-5 rounded-full border border-[#ff383c] flex items-center justify-center shrink-0 ${
										value ? 'bg-[#d70c0c]' : ''
									}`}
								>
									{value && (
										<Check
											className='size-2.5 text-white'
											strokeWidth={3}
										/>
									)}
								</button>
								<span className='text-white text-xs font-medium leading-normal'>
									Я принимаю условия{' '}
									<Link
										to='/subscription-terms'
										target='_blank'
										className='underline'
										onClick={e => e.stopPropagation()}
									>
										Пользовательского соглашения
									</Link>
									, Политики конфиденциальности и автоматического продления подписки.
								</span>
							</label>
							{fieldError && <p className='text-red-500 text-xs mt-1'>{fieldError.message}</p>}
							{/* keep terms URL available for external reference */}
							<a
								href={SUBSCRIPTION_TERMS_URL}
								className='hidden'
								aria-hidden
							>
								terms
							</a>
						</div>
					)}
				/>
			)}

			<Button
				type='submit'
				size='big'
				loading={loading}
				extra='w-full !rounded-[10px]'
			>
				{submitButtonText}
			</Button>
		</form>
	)
}
