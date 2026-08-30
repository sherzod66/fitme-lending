import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'
import { Flame } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import ProgressLineChart from '../ui/ProgressLineChart'
import { EASE_PREMIUM } from '../ui/motion/easing'

const STRENGTH = [62, 64, 63, 68, 71, 69, 74, 76, 75, 78, 79, 80]

const DAYS_IN_MONTH = 31
const TRAINED = new Set([2, 4, 6, 9, 11, 13, 16, 18, 20, 23, 25, 27])
const TODAY = 27

const MEASUREMENTS = [
	{ key: 'weight', value: '78,4' },
	{ key: 'chest', value: '104' },
	{ key: 'waist', value: '82' }
]

type Props = {
	className?: string
}

/** Floating slice of the FIT.ME progress dashboard. */
export default function ProgressDashboard({ className }: Props) {
	const { t } = useTranslation()
	const shouldReduceMotion = useReducedMotion()

	return (
		<div
			className={clsx(
				'rounded-2xl border border-ink-line bg-ink-card/85 p-5 backdrop-blur-xl',
				className
			)}
		>
			<div className='flex items-start justify-between'>
				<div>
					<p className='text-[9px] uppercase tracking-[0.2em] text-muted'>
						{t('progress.panel.exercise')}
					</p>
					<p className='mt-1.5 text-[22px] font-semibold leading-none tracking-tight'>80 кг</p>
				</div>
				<p className='text-[10px] uppercase tracking-[0.16em] text-muted'>
					{t('progress.panel.range')}
				</p>
			</div>

			<div className='relative mt-4'>
				{/* Very subtle red glow under the curve */}
				<div className='pointer-events-none absolute inset-x-4 bottom-0 h-16 bg-accent/20 blur-[42px]' />
				<ProgressLineChart
					values={STRENGTH}
					className='relative'
				/>
			</div>

			<div className='mt-2 flex items-baseline justify-between text-[10px]'>
				<span className='text-muted'>62 кг</span>
				<span className='font-semibold text-accent'>80 кг</span>
			</div>

			{/* Monthly calendar */}
			<div className='mt-4 border-t border-ink-line pt-4'>
				<p className='text-[9px] uppercase tracking-[0.2em] text-muted'>
					{t('progress.panel.month')}
				</p>
				<div className='mt-2.5 grid grid-cols-7 gap-1.5'>
					{Array.from({ length: DAYS_IN_MONTH }, (_, index) => index + 1).map(day => (
						<motion.span
							key={day}
							initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.6 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true, amount: 0.4 }}
							transition={{
								duration: 0.5,
								delay: shouldReduceMotion ? 0 : 0.6 + day * 0.018,
								ease: EASE_PREMIUM
							}}
							className={clsx(
								'h-4 rounded-[3px]',
								TRAINED.has(day)
									? 'bg-accent'
									: day === TODAY
										? 'border border-white bg-transparent'
										: day > TODAY
											? 'bg-[#1a1a1a]'
											: 'bg-[#262626]'
							)}
						/>
					))}
				</div>
			</div>

			{/* Body measurements + achievement */}
			<div className='mt-4 flex items-end justify-between border-t border-ink-line pt-4'>
				<div className='flex gap-5'>
					{MEASUREMENTS.map(item => (
						<div key={item.key}>
							<p className='text-[13px] font-semibold tracking-tight'>{item.value}</p>
							<p className='text-[9px] uppercase tracking-[0.14em] text-muted'>
								{t(`progress.panel.${item.key}`)}
							</p>
						</div>
					))}
				</div>
				<span className='inline-flex items-center gap-1.5 rounded-full bg-accent/15 px-2 py-1 text-[9px] font-medium text-accent'>
					<Flame className='h-3 w-3' />
					{t('progress.panel.streak')}
				</span>
			</div>
		</div>
	)
}
