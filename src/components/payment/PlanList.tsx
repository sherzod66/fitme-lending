import { ISubscriptionPlan } from '../../types/subscription-plan.types'
import Loading from '../ui/loader/loading'

import PlanCard from './PlanCard'

type Props = {
	plans: ISubscriptionPlan[]
	selectedPlanId: string
	onSelect: (id: string) => void
	isLoading: boolean
	disabled?: boolean
}

export default function PlanList({ plans, selectedPlanId, onSelect, isLoading, disabled }: Props) {
	if (isLoading) {
		return (
			<div className='py-8 flex justify-center'>
				<Loading />
			</div>
		)
	}

	const sorted = [...plans].filter(p => p.isActive).sort((a, b) => a.position - b.position)

	return (
		<div className='flex flex-col gap-2.5 w-full'>
			{sorted.map(plan => (
				<PlanCard
					key={plan.id}
					plan={plan}
					selected={selectedPlanId === plan.id}
					onSelect={onSelect}
					disabled={disabled}
				/>
			))}
		</div>
	)
}
