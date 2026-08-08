import cn from 'clsx'
import type { LucideIcon } from 'lucide-react'
import type { InputHTMLAttributes } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
	label: string
	error?: string
	registration?: UseFormRegisterReturn
	variant?: 'client' | 'admin' | 'secondary'
	isMarginBottom?: boolean
	Icon?: LucideIcon
}

export function Field({
	label,
	variant = 'client',
	registration,
	error,
	isMarginBottom = true,
	Icon,
	disabled,
	...props
}: Props) {
	return (
		<div className={cn('w-full', isMarginBottom && 'mb-4')}>
			<label>
				<span className={cn('block mb-2 text-gray-300', Icon && 'flex items-center gap-2')}>
					{Icon && (
						<Icon
							size={18}
							className='text-tg-accent-text'
						/>
					)}
					{label}
				</span>
				<input
					className={cn(
						'w-full block px-3 py-2 text-white text-lg rounded-xl disabled:opacity-50 outline-none',
						variant === 'admin' && 'bg-black-950 text-white-50',
						variant === 'client' && 'bg-[#505050]',
						variant === 'secondary' && 'bg-[var(--tg-theme-secondary-bg-color)]',
						error ? 'border-red-500' : 'border-border'
					)}
					disabled={disabled}
					{...registration}
					{...props}
				/>
			</label>
			{error && (
				<p
					role='alert'
					className='text-red-500 text-sm mt-1'
				>
					{error}
				</p>
			)}
		</div>
	)
}
