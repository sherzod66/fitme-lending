import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'

import { EASE_PREMIUM } from '../ui/motion/easing'

type Props = {
	icon: LucideIcon
	title: string
	meta?: string
	/** Completion state. The only place this card is allowed to turn red. */
	accent?: boolean
	delay?: number
	className?: string
	/** Offsets the idle float so several cards never drift in unison. */
	floatOffset?: number
}

/** A diary event exactly as the app surfaces it: one line, one small state icon. */
export default function DiaryCard({
	icon: Icon,
	title,
	meta,
	accent,
	delay = 0,
	className,
	floatOffset = 0
}: Props) {
	const shouldReduceMotion = useReducedMotion()

	return (
		<motion.div
			initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 18, scale: 0.97 }}
			whileInView={{ opacity: 1, y: 0, scale: 1 }}
			viewport={{ once: true, amount: 0.5 }}
			transition={{ duration: 1, delay, ease: EASE_PREMIUM }}
			className={clsx('z-20', className)}
		>
			<motion.div
				animate={shouldReduceMotion ? undefined : { y: [0, -6, 0] }}
				transition={{
					duration: 10,
					delay: floatOffset,
					repeat: Infinity,
					ease: 'easeInOut'
				}}
				className='flex items-center gap-3 rounded-2xl border border-ink-line bg-ink-card/80 px-4 py-3 backdrop-blur-md'
			>
				<span
					className={clsx(
						'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg',
						accent ? 'bg-accent/15 text-accent' : 'bg-white/[0.05] text-muted'
					)}
				>
					<Icon
						className='h-3.5 w-3.5'
						strokeWidth={2.5}
					/>
				</span>

				<span className='min-w-0'>
					<span className='block truncate text-[12px] font-medium leading-tight'>{title}</span>
					{meta && (
						<span className='mt-1 block truncate text-[10px] uppercase tracking-[0.14em] text-muted'>
							{meta}
						</span>
					)}
				</span>
			</motion.div>
		</motion.div>
	)
}
