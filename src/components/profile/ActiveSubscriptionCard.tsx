import { CalendarDays, Check, CreditCard, Crown } from 'lucide-react'

import { PREMIUM_FEATURES } from '../../constants/constants'
import { ISubscription } from '../../types/subscription.types'
import { formatDateTime } from '../../utils/formatDate'

type Props = {
	subscription: ISubscription
	onManage: () => void
}

export default function ActiveSubscriptionCard({ subscription, onManage }: Props) {
	const planName = subscription.plan?.name?.ru || 'PREMIUM'

	return (
		<div className='bg-[#1c1c1e] rounded-[22px] p-[15px] flex flex-col gap-2.5 w-full'>
			<div className='flex gap-2.5 items-center w-full'>
				<div className='flex-1 flex flex-col gap-[5px] min-w-0'>
					<p className='text-[#505050] text-base'>Текущий тариф</p>
					<p className='text-[#ff383c] text-lg font-bold break-words'>{planName}</p>
				</div>
				<div className='bg-[#321115] rounded-full size-[50px] flex items-center justify-center shrink-0'>
					<Crown
						className='size-8 text-[#ff383c]'
						strokeWidth={1.75}
					/>
				</div>
			</div>

			{PREMIUM_FEATURES.map((feature, index) => (
				<div
					key={`${feature.ru}-${index}`}
					className='flex items-center gap-2.5'
				>
					<span className='size-[15px] rounded-full bg-[#321115] flex items-center justify-center shrink-0'>
						<Check
							className='size-2.5 text-[#ff383c]'
							strokeWidth={3}
						/>
					</span>
					<span className='text-white text-sm'>{feature.ru}</span>
				</div>
			))}

			<div className='flex items-center gap-2.5 py-2.5'>
				<CalendarDays
					className='size-[18px] text-white shrink-0'
					strokeWidth={1.75}
				/>
				<span className='flex-1 text-white text-sm'>Автосписание:</span>
				<span className='text-[#8e8e8e] text-sm font-semibold'>
					{subscription.autoRenew ? 'Активно' : 'Отключено'}
				</span>
			</div>

			<div className='flex items-center gap-2.5 py-2.5'>
				<CreditCard
					className='size-[18px] text-white shrink-0'
					strokeWidth={1.75}
				/>
				<span className='flex-1 text-white text-sm'>Следующее списание:</span>
				<span className='text-[#ff383c] text-sm font-semibold'>
					{formatDateTime(subscription.nextBillingAt)}
				</span>
			</div>

			<button
				type='button'
				onClick={onManage}
				className='mt-1 w-full border border-[#42960E] rounded-xl px-6 py-2 text-[#42960E] text-sm text-center hover:bg-[#42960E]/10 transition'
			>
				Управление подпиской
			</button>
		</div>
	)
}
