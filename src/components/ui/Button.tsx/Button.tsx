import cn from 'clsx'
import type { ButtonHTMLAttributes } from 'react'

import Loader from '../loader/Loader'

import styles from './button.module.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode
	variant?: 'primary' | 'secondary' | 'danger'
	isRun?: boolean
	size?: 'default' | 'big'
	loading?: boolean
	extra?: string
}

export function Button({
	loading,
	size = 'default',
	variant = 'primary',
	children,
	extra,
	isRun = false,
	...rest
}: Props) {
	return (
		<button
			className={cn(
				styles.button,
				{
					[styles.primary]: variant === 'primary',
					[styles.secondary]: variant === 'secondary',
					[styles.danger]: variant === 'danger',
					[styles.run]: isRun,
					[styles.big]: size === 'big'
				},
				extra
			)}
			disabled={loading || rest.disabled}
			{...rest}
		>
			{loading ? (
				<div className='h-7 relative min-w-5'>
					<Loader />
				</div>
			) : (
				<div className='relative z-1'>{children}</div>
			)}
		</button>
	)
}
