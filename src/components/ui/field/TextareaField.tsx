import cn from 'clsx'
import type { TextareaHTMLAttributes } from 'react'
import type { UseFormRegisterReturn } from 'react-hook-form'

interface Props extends TextareaHTMLAttributes<HTMLTextAreaElement> {
	label: string
	error?: string
	registration: UseFormRegisterReturn
	variant?: 'client' | 'admin'
}

export function TextareaField({ label, variant = 'client', registration, error, ...props }: Props) {
	return (
		<div className='mb-4'>
			<label>
				<span className='block mb-2'>{label}</span>
				<textarea
					rows={4}
					className={cn(
						'w-full block px-3 py-2 bg-[var(--tg-theme-section-bg-color)] text-[var(--tg-theme-text-color)] text-lg rounded-xl border border-solid border-gray-300 transition-colors focus:outline-none focus:ring-0 focus:border-secondary',
						variant === 'admin' && 'bg-black-950 text-white-50',
						error ? 'border-red-500' : 'border-border'
					)}
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
