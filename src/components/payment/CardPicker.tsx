import { CreditCard } from 'lucide-react'

import { IPaymentMethod } from '../../types/payment-method.types'
import Loading from '../ui/loader/loading'

type Props = {
	linkedMethod: IPaymentMethod | null
	methods: IPaymentMethod[]
	isSelecting: boolean
	isSwitching: boolean
	onChangePress: () => void
	onCancelSelect: () => void
	onSelect: (id: string) => void
}

export default function CardPicker({
	linkedMethod,
	methods,
	isSelecting,
	isSwitching,
	onChangePress,
	onCancelSelect,
	onSelect
}: Props) {
	const showList = isSelecting || !linkedMethod

	return (
		<div className='bg-[#1c1c1e] rounded-[22px] p-[15px] flex flex-col gap-3 w-full'>
			<div className='flex items-center gap-2.5'>
				<CreditCard
					className='size-[18px] text-white'
					strokeWidth={1.75}
				/>
				<p className='text-white text-sm font-semibold'>Способ оплаты</p>
			</div>

			{linkedMethod && !showList && (
				<div className='flex items-center justify-between'>
					<p className='text-white text-sm'>{linkedMethod.cardPanMasked}</p>
					<button
						type='button'
						onClick={onChangePress}
						disabled={isSwitching}
						className='text-[#ff383c] text-sm font-semibold disabled:opacity-50'
					>
						Сменить карту
					</button>
				</div>
			)}

			{showList &&
				(methods.length > 0 ? (
					<>
						{!linkedMethod && (
							<p className='text-[#505050] text-xs'>Выберите карту для оплаты подписки</p>
						)}
						{methods.map(method => {
							const selected = method.id === linkedMethod?.id
							return (
								<button
									key={method.id}
									type='button'
									disabled={isSwitching || selected}
									onClick={() => onSelect(method.id)}
									className={`w-full flex items-center justify-between rounded-xl px-3 py-3 border ${
										selected ? 'border-[#d70c0c] bg-[#2a1518]' : 'border-[#505050]'
									} disabled:opacity-70`}
								>
									<span className='text-white text-sm'>{method.cardPanMasked}</span>
									{isSwitching && !selected ? (
										<Loading />
									) : (
										<span
											className={`size-5 rounded-full border flex items-center justify-center ${
												selected ? 'border-[#d70c0c]' : 'border-[#505050]'
											}`}
										>
											{selected && <span className='size-2.5 rounded-full bg-[#d70c0c]' />}
										</span>
									)}
								</button>
							)
						})}
						{linkedMethod && (
							<button
								type='button'
								onClick={onCancelSelect}
								disabled={isSwitching}
								className='text-[#ddded8] text-sm self-start disabled:opacity-50'
							>
								Отмена
							</button>
						)}
					</>
				) : (
					<div className='flex flex-col items-center gap-2 py-4'>
						<CreditCard
							className='size-8 text-[#505050]'
							strokeWidth={1.5}
						/>
						<p className='text-[#505050] text-sm'>Нет сохранённых карт</p>
					</div>
				))}
		</div>
	)
}
