import {
	EnumTransactionProduct,
	ITransaction,
	getTransactionStatusMeta
} from '../../types/transaction.types'
import { formatDateShort } from '../../utils/formatDate'
import { formatPrice } from '../../utils/formatPrice'

type Props = {
	transaction: ITransaction
}

const getTitle = (tx: ITransaction) => {
	if (tx.product === EnumTransactionProduct.SUBSCRIPTION) {
		return tx.plan?.name?.ru || 'PREMIUM'
	}
	return 'Платеж'
}

export default function TransactionCard({ transaction }: Props) {
	const status = getTransactionStatusMeta(transaction.status)
	const oldPrice = transaction.plan?.oldPrice

	return (
		<div className='bg-[#1c1c1e] rounded-[22px] p-2.5 flex flex-col gap-2.5 w-full'>
			<p className='text-[#ff383c] text-base font-semibold'>{getTitle(transaction)}</p>
			<div className='flex items-start justify-between w-full'>
				<div className='flex flex-col gap-0.5'>
					<p className='text-[#505050] text-xs font-semibold'>ID транзакции</p>
					<p className='text-white text-sm font-medium'>
						{transaction.providerOrderId ||
							transaction.providerTransactionId ||
							transaction.id.slice(0, 10)}
					</p>
				</div>
				<div className='flex flex-col gap-0.5 items-end'>
					<p className='text-[#505050] text-xs font-semibold'>Статус</p>
					<p
						className='text-sm font-medium'
						style={{ color: status.color }}
					>
						{status.label}
					</p>
				</div>
			</div>
			<div className='flex gap-2.5 items-start text-sm font-medium'>
				<span className='text-white'>
					{formatPrice(transaction.amount)} {transaction.currency === 'UZS' ? 'сум' : transaction.currency}
				</span>
				{!!oldPrice && oldPrice > transaction.amount && (
					<span className='text-[#505050] line-through'>{formatPrice(oldPrice)} сум</span>
				)}
			</div>
			<p className='text-[#505050] text-sm font-medium'>{formatDateShort(transaction.createdAt)}</p>
		</div>
	)
}
