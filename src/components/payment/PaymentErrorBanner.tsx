import { TPaymentError } from '../../types/payment.types'

type Props = {
	error: TPaymentError | null
	onRetry: () => void
}

export default function PaymentErrorBanner({ error, onRetry }: Props) {
	if (!error) return null

	return (
		<div className='w-full rounded-xl border border-[#ff2d55] bg-[#2a1218] p-3 mb-3'>
			<p className='text-[#ff2d55] text-sm mb-2'>{error.message}</p>
			<button
				type='button'
				onClick={onRetry}
				className='text-white text-sm underline'
			>
				Попробовать снова
			</button>
		</div>
	)
}
