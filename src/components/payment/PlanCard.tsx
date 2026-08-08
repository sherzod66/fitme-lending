import { Award, Check } from 'lucide-react'

import { ISubscriptionPlan } from '../../types/subscription-plan.types'
import { formatSum } from '../../utils/formatPrice'

type Props = {
	plan: ISubscriptionPlan
	selected: boolean
	onSelect: (id: string) => void
	disabled?: boolean
}

export default function PlanCard({ plan, selected, onSelect, disabled }: Props) {
	const perMonth = plan.durationMonths > 0 ? plan.price / plan.durationMonths : plan.price

	return (
		<div className='w-full'>
			<button
				type='button'
				disabled={disabled}
				onClick={() => onSelect(plan.id)}
				className={`relative w-full rounded-[22px] border-2 overflow-hidden flex items-center justify-between text-left transition ${
					selected ? 'border-[#d70c0c]' : 'border-[#505050]'
				} disabled:opacity-60`}
			>
				<div className='flex-1 flex flex-col min-w-0'>
					{plan.isPopular && (
						<span className='bg-[#d70c0c] text-white text-xs font-semibold px-[15px] py-[5px] rounded-br-[10px] rounded-tl-[10px] w-fit'>
							Самый популярный
						</span>
					)}
					<div className={`flex flex-col gap-[5px] pl-[15px] ${plan.isPopular ? 'pb-[15px]' : 'py-[15px]'}`}>
						<p className='text-white text-sm font-semibold'>{plan.name.ru}</p>
						{plan.oldPrice > 0 && (
							<p className='text-sm'>
								<span className='line-through text-[#505050] text-xs font-normal mr-1'>
									{formatSum(plan.oldPrice)}
								</span>
								<span className='text-white font-semibold'>{formatSum(plan.price)}</span>
							</p>
						)}
					</div>
				</div>
				<div className='flex flex-col items-end pr-[15px] py-[15px] shrink-0'>
					{plan.isPopular && selected && (
						<Award
							className='size-8 text-[#d70c0c] mb-1'
							strokeWidth={1.75}
						/>
					)}
					<p className='text-white text-xs font-semibold whitespace-nowrap'>
						{formatSum(Math.round(perMonth))} / мес.
					</p>
				</div>
				{selected && (
					<span className='absolute right-3 bottom-3 bg-[#d70c0c] rounded-full size-5 flex items-center justify-center'>
						<Check
							className='size-[15px] text-white'
							strokeWidth={3}
						/>
					</span>
				)}
			</button>
			{!!plan.description?.ru && selected && (
				<p className='text-[#505050] text-[11px] font-semibold text-center mt-0.5'>
					{plan.description.ru}
				</p>
			)}
		</div>
	)
}
