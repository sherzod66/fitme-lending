import { Plus, Trash2 } from 'lucide-react'

import CardCreateForm from '../../../components/payment/CardCreateForm'
import CardPicker from '../../../components/payment/CardPicker'
import VerificationCodeForm from '../../../components/payment/VerificationCodeForm'
import BackLink from '../../../components/profile/BackLink'
import ConfirmDialog from '../../../components/profile/ConfirmDialog'
import ProfileShell from '../../../components/profile/ProfileShell'
import { Button } from '../../../components/ui/Button.tsx/Button'
import Loading from '../../../components/ui/loader/loading'

import { usePaymentMethods } from './hooks'

export default function PaymentMethods() {
	const {
		paymentMethods,
		linkedMethod,
		isSelectingCard,
		isSwitchingCard,
		showPayButton,
		showCancelButton,
		isLoading,
		onChangeCardPress,
		onCancelSelectCard,
		onSelectCard,
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
		loading,
		retryPayment,
		goBackToCard,
		resendCode,
		onDelete,
		isDeletingCard,
		cancelOpen,
		setCancelOpen,
		isCancelling,
		cancelMessage,
		onConfirmCancel
	} = usePaymentMethods()

	return (
		<ProfileShell>
			<BackLink />
			<h1 className='text-white text-[21px] font-semibold w-full'>Управление подпиской</h1>

			{isLoading ? (
				<div className='py-16 flex justify-center'>
					<Loading />
				</div>
			) : (
				<>
					<CardPicker
						linkedMethod={linkedMethod}
						methods={paymentMethods}
						isSelecting={isSelectingCard}
						isSwitching={isSwitchingCard}
						onChangePress={onChangeCardPress}
						onCancelSelect={onCancelSelectCard}
						onSelect={onSelectCard}
					/>

					{paymentMethods.length > 0 && (
						<div className='bg-[#1c1c1e] rounded-[22px] p-[15px] flex flex-col gap-2 w-full'>
							<p className='text-white text-sm font-semibold mb-1'>Сохранённые карты</p>
							{paymentMethods.map(method => (
								<div
									key={method.id}
									className='flex items-center justify-between py-2 border-b border-[#505050] last:border-0'
								>
									<span className='text-white text-sm'>{method.cardPanMasked}</span>
									<button
										type='button'
										disabled={isDeletingCard}
										onClick={() => onDelete(method.id)}
										className='text-[#d70c0c] disabled:opacity-50'
										aria-label='Удалить карту'
									>
										<Trash2 className='size-4' />
									</button>
								</div>
							))}
						</div>
					)}

					{showPayButton && (
						<div className='w-full flex flex-col gap-2'>
							<p className='text-[#505050] text-xs'>
								Срок подписки истёк и оплата не прошла. Оплатите, чтобы сохранить доступ.
							</p>
							<Button
								type='button'
								size='big'
								loading={isPayingNow}
								onClick={onPayNow}
								extra='w-full !rounded-[10px]'
							>
								Оплатить
							</Button>
						</div>
					)}

					{showCancelButton && (
						<button
							type='button'
							onClick={() => setCancelOpen(true)}
							disabled={isCancelling}
							className='w-full border border-[#a70808] rounded-xl px-6 py-2.5 text-[#d70c0c] text-sm text-center disabled:opacity-50'
						>
							Отменить подписку
						</button>
					)}

					{!showAddCard ? (
						<button
							type='button'
							onClick={() => {
								retryPayment()
								setShowAddCard(true)
							}}
							className='w-full flex items-center justify-center gap-2 rounded-[10px] border border-[#505050] py-3 text-white text-sm hover:border-[#d70c0c] transition'
						>
							<Plus className='size-4' />
							Добавить карту
						</button>
					) : (
						<div className='w-full flex flex-col gap-3'>
							<div className='flex items-center justify-between'>
								<p className='text-white text-base font-semibold'>Новая карта</p>
								<button
									type='button'
									onClick={() => {
										setShowAddCard(false)
										retryPayment()
									}}
									className='text-[#ddded8] text-sm'
								>
									Закрыть
								</button>
							</div>
							<p className='text-[#505050] text-xs font-medium'>Безопасная оплата через Payme</p>
							{step === 'create-card' ? (
								<CardCreateForm
									control={control}
									handleSubmit={handleSubmit}
									onSubmit={onSubmit}
									submitButtonText='Добавить карту'
									loading={loading}
									error={error}
									onRetryPayment={retryPayment}
									requireTerms={false}
								/>
							) : (
								<VerificationCodeForm
									control={control}
									handleSubmit={handleSubmit}
									verifyCode={cardVerify}
									loading={loading}
									error={error}
									onRetryPayment={retryPayment}
									onResendCode={resendCode}
									onBackToCard={goBackToCard}
								/>
							)}
						</div>
					)}
				</>
			)}

			<ConfirmDialog
				open={cancelOpen}
				title='Отменить подписку'
				message={cancelMessage}
				confirmLabel='Отменить подписку'
				loading={isCancelling}
				onConfirm={onConfirmCancel}
				onCancel={() => setCancelOpen(false)}
			/>
		</ProfileShell>
	)
}
