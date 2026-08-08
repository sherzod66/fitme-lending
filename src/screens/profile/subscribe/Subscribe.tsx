import CardCreateForm from '../../../components/payment/CardCreateForm'
import PlanList from '../../../components/payment/PlanList'
import VerificationCodeForm from '../../../components/payment/VerificationCodeForm'
import BackLink from '../../../components/profile/BackLink'
import ProfileShell from '../../../components/profile/ProfileShell'
import { formatPrice } from '../../../utils/formatPrice'

import { useSubscribe } from './hooks'

export default function Subscribe() {
	const {
		control,
		handleSubmit,
		params,
		subscriptionPlans,
		onSubmit,
		isLoading,
		error,
		cardVerify,
		loading,
		retryPayment,
		resendCode,
		goBackToCard,
		activePlan,
		onSelectPlan
	} = useSubscribe()

	return (
		<ProfileShell className='gap-5'>
			<BackLink />
			<h1 className='text-white text-[21px] font-semibold w-full'>Выберите план</h1>

			<PlanList
				plans={subscriptionPlans}
				selectedPlanId={params.planId}
				onSelect={onSelectPlan}
				isLoading={isLoading}
				disabled={params.step !== 'create-card' || loading}
			/>

			<div className='w-full flex flex-col gap-2'>
				<div className='flex items-center justify-between w-full'>
					<h2 className='text-white text-[21px] font-semibold'>Способ оплаты</h2>
					<img
						src='/images/payment/payme.png'
						alt='Payme'
						className='h-[22px] w-[67px] object-contain'
					/>
				</div>
				<p className='text-[#505050] text-xs font-medium'>Безопасная оплата через Payme</p>

				{params.step === 'create-card' ? (
					<CardCreateForm
						control={control}
						handleSubmit={handleSubmit}
						onSubmit={onSubmit}
						submitButtonText={`Оплатить ${formatPrice(activePlan?.price ?? 0)} сум`}
						loading={loading}
						error={error}
						onRetryPayment={retryPayment}
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
		</ProfileShell>
	)
}
