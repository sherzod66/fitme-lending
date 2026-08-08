import { Check, Crown } from 'lucide-react'
import { Link } from 'react-router-dom'

import { PREMIUM_FEATURES } from '../../constants/constants'

export default function EmptySubscriptionCard() {
	return (
		<div className='bg-[#1c1c1e] rounded-[22px] p-[15px] flex flex-col gap-2.5 w-full'>
			<div className='flex gap-2.5 items-center w-full'>
				<div className='flex-1 flex flex-col gap-[5px] min-w-0'>
					<p className='text-[#505050] text-base'>Текущий тариф</p>
					<p className='text-[#ff383c] text-lg font-bold'>Нет активной подписки</p>
				</div>
				<div className='bg-[#321115] rounded-full size-[50px] flex items-center justify-center shrink-0'>
					<Crown
						className='size-8 text-[#ff383c]'
						strokeWidth={1.75}
					/>
				</div>
			</div>

			<p className='text-[#505050] text-base'>Откройте доступ ко всем функциям FIT.ME</p>

			{PREMIUM_FEATURES.map((feature, index) => (
				<div
					key={`${feature.ru}-${index}`}
					className={`flex items-center gap-2.5 ${
						index === PREMIUM_FEATURES.length - 1 ? 'pb-2.5' : ''
					}`}
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

			<Link
				to='/profile/subscribe'
				className='mt-1 bg-[#d70c0c] rounded-[10px] p-2.5 flex items-center justify-center gap-2.5 w-full hover:bg-[#b90a0a] transition'
			>
				<Crown
					className='size-4 text-white'
					strokeWidth={2}
				/>
				<span className='text-white text-sm font-semibold'>Оформить подписку</span>
			</Link>
		</div>
	)
}
