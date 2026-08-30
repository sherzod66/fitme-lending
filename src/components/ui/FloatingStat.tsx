import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

import { EASE_PREMIUM } from './motion/easing'

type Props = {
	value: ReactNode
	label: string
	accent?: boolean
	delay?: number
	className?: string
	/** Offsets the idle float so several cards never drift in unison. */
	floatOffset?: number
}

/** Small piece of product UI that floats next to a device shot. */
export default function FloatingStat({
	value,
	label,
	accent,
	delay = 0,
	className,
	floatOffset = 0
}: Props) {
	const shouldReduceMotion = useReducedMotion()

	return (
		<motion.div
			initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16, scale: 0.96 }}
			whileInView={{ opacity: 1, y: 0, scale: 1 }}
			viewport={{ once: true, amount: 0.5 }}
			transition={{ duration: 0.9, delay, ease: EASE_PREMIUM }}
			className={clsx('z-20', className)}
		>
			<motion.div
				animate={shouldReduceMotion ? undefined : { y: [0, -7, 0] }}
				transition={{
					duration: 9,
					delay: floatOffset,
					repeat: Infinity,
					ease: 'easeInOut'
				}}
				className='rounded-2xl border border-ink-line bg-ink-card/80 px-4 py-3 backdrop-blur-md'
			>
				<p
					className={clsx(
						'text-[19px] font-semibold leading-none tracking-tight',
						accent ? 'text-accent' : 'text-white'
					)}
				>
					{value}
				</p>
				<p className='mt-1.5 text-[10px] uppercase tracking-[0.18em] text-muted'>{label}</p>
			</motion.div>
		</motion.div>
	)
}
