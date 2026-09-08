import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import Reveal from '../ui/motion/Reveal'
import { EASE_PREMIUM } from '../ui/motion/easing'

const ENTRIES = [
	{ key: 'legs', day: 27, minutes: 58, exercises: 12, today: true },
	{ key: 'push', day: 25, minutes: 52, exercises: 10 },
	{ key: 'pull', day: 23, minutes: 61, exercises: 11 },
	{ key: 'cardio', day: 20, minutes: 35, exercises: 6 }
]

/** How much history stays behind the four visible entries. */
const REMAINING = 18

type Props = {
	className?: string
}

/** The user's own history: a quiet list of what already happened, not a widget. */
export default function DiaryTimeline({ className }: Props) {
	const { t } = useTranslation()
	const shouldReduceMotion = useReducedMotion()

	return (
		<div className={className}>
			<div className='relative'>
				{/* The rail draws itself downwards, then fades out: history continues. */}
				<motion.div
					aria-hidden='true'
					initial={{ scaleY: shouldReduceMotion ? 1 : 0 }}
					whileInView={{ scaleY: 1 }}
					viewport={{ once: true, amount: 0.2 }}
					transition={{ duration: 1.8, ease: EASE_PREMIUM }}
					className='absolute bottom-0 left-[5px] top-[10px] w-px origin-top bg-gradient-to-b from-ink-line via-ink-line to-transparent'
				/>

				<ul className='relative space-y-7'>
					{ENTRIES.map((entry, index) => (
						<li key={entry.key}>
							<Reveal
								delay={0.2 + index * 0.14}
								y={16}
								duration={0.9}
								amount={0.3}
							>
								<div className='flex items-start gap-4'>
									<span
										className={clsx(
											'mt-1 h-[11px] w-[11px] shrink-0 rounded-full',
											entry.today ? 'bg-accent' : 'bg-[#262626]'
										)}
									/>

									<div className='min-w-0 flex-1'>
										<div className='flex items-baseline justify-between gap-3'>
											<p className='truncate text-[13px] font-medium'>
												{t(`diary.entries.${entry.key}`)}
											</p>
											<p
												className={clsx(
													'shrink-0 text-[10px] uppercase tracking-[0.16em]',
													entry.today ? 'text-white' : 'text-muted'
												)}
											>
												{entry.today ? t('diary.today') : `${entry.day} ${t('diary.month')}`}
											</p>
										</div>

										<p className='mt-1.5 text-[11px] text-muted'>
											{t('diary.meta', {
												minutes: entry.minutes,
												exercises: entry.exercises
											})}
										</p>
									</div>
								</div>
							</Reveal>
						</li>
					))}
				</ul>
			</div>

			<Reveal
				delay={0.2 + ENTRIES.length * 0.14}
				y={12}
				duration={0.9}
				amount={0.3}
				className='pl-[27px]'
			>
				<p className='mt-7 text-[11px] uppercase tracking-[0.18em] text-muted'>
					{t('diary.more', { entries: REMAINING })}
				</p>
			</Reveal>
		</div>
	)
}
