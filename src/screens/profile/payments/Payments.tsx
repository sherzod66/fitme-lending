import { ListX } from 'lucide-react'

import TransactionCard from '../../../components/payment/TransactionCard'
import BackLink from '../../../components/profile/BackLink'
import ProfileShell from '../../../components/profile/ProfileShell'
import { Button } from '../../../components/ui/Button.tsx/Button'
import Loading from '../../../components/ui/loader/loading'

import { usePayments } from './hooks'

export default function Payments() {
	const { transactions, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } = usePayments()

	return (
		<ProfileShell>
			<BackLink />
			<h1 className='text-white text-[21px] font-semibold w-full'>История платежей</h1>

			{isLoading ? (
				<div className='py-16 flex justify-center'>
					<Loading />
				</div>
			) : transactions.length === 0 ? (
				<div className='flex flex-col items-center gap-2 py-10'>
					<ListX
						className='size-8 text-[#505050]'
						strokeWidth={1.5}
					/>
					<p className='text-white text-sm font-medium'>Платежей пока нет</p>
					<p className='text-[#505050] text-xs text-center'>
						После оформления подписки история платежей появится здесь
					</p>
				</div>
			) : (
				<div className='flex flex-col gap-2.5 w-full'>
					{transactions.map(tx => (
						<TransactionCard
							key={tx.id}
							transaction={tx}
						/>
					))}
					{hasNextPage && (
						<Button
							type='button'
							size='big'
							loading={isFetchingNextPage}
							onClick={() => fetchNextPage()}
							extra='w-full !rounded-[10px]'
						>
							Загрузить больше
						</Button>
					)}
				</div>
			)}
		</ProfileShell>
	)
}
