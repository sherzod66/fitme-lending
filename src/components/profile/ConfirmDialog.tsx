type Props = {
	open: boolean
	title: string
	message: string
	confirmLabel: string
	cancelLabel?: string
	loading?: boolean
	onConfirm: () => void
	onCancel: () => void
}

export default function ConfirmDialog({
	open,
	title,
	message,
	confirmLabel,
	cancelLabel = 'Нет',
	loading,
	onConfirm,
	onCancel
}: Props) {
	if (!open) return null

	return (
		<div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-4'>
			<div className='bg-[#1c1c1e] rounded-2xl p-5 w-full max-w-sm flex flex-col gap-4'>
				<h3 className='text-white text-lg font-semibold'>{title}</h3>
				<p className='text-[#ddded8] text-sm leading-relaxed'>{message}</p>
				<div className='flex gap-3'>
					<button
						type='button'
						onClick={onCancel}
						disabled={loading}
						className='flex-1 rounded-xl border border-[#505050] py-2.5 text-white text-sm disabled:opacity-50'
					>
						{cancelLabel}
					</button>
					<button
						type='button'
						onClick={onConfirm}
						disabled={loading}
						className='flex-1 rounded-xl bg-[#d70c0c] py-2.5 text-white text-sm font-semibold disabled:opacity-50'
					>
						{loading ? '…' : confirmLabel}
					</button>
				</div>
			</div>
		</div>
	)
}
