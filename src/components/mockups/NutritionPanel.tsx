import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { EASE_PREMIUM } from '../ui/motion/easing'

const CALORIES = { eaten: 773, goal: 2400 }

const MACROS = [
	{ key: 'protein', current: 128, goal: 133 },
	{ key: 'fats', current: 3, goal: 52 },
	{ key: 'carbs', current: 130, goal: 350 }
]

const MEALS = [
	{ key: 'breakfast', kcal: 773, state: 'done' },
	{ key: 'lunch', kcal: 0, state: 'active' },
	{ key: 'dinner', kcal: 0, state: 'planned' }
] as const

type BarProps = {
	value: number
	delay: number
	className?: string
}

function ProgressBar({ value, delay, className }: BarProps) {
	const shouldReduceMotion = useReducedMotion()
	const width = `${Math.min(value, 100)}%`

	return (
		<div className={clsx('overflow-hidden rounded-full bg-[#1e1e1e]', className)}>
			<motion.div
				initial={{ width: shouldReduceMotion ? width : 0 }}
				whileInView={{ width }}
				viewport={{ once: true, amount: 0.5 }}
				transition={{ duration: 1.4, delay, ease: EASE_PREMIUM }}
				className='h-full rounded-full bg-accent'
			/>
		</div>
	)
}

type Props = {
	className?: string
}

/** Floating slice of the FIT.ME nutrition screen. */
export default function NutritionPanel({ className }: Props) {
	const { t } = useTranslation()
	const caloriePercent = (CALORIES.eaten / CALORIES.goal) * 100

	return (
		<div
			className={clsx(
				'rounded-2xl border border-ink-line bg-ink-card/85 p-5 backdrop-blur-xl',
				className
			)}
		>
			<div className='flex items-baseline justify-between'>
				<p className='text-[9px] uppercase tracking-[0.2em] text-muted'>
					{t('nutrition.panel.today')}
				</p>
				<p className='text-[10px] text-muted'>
					{t('nutrition.panel.goal')} {CALORIES.goal.toLocaleString('ru-RU')}
				</p>
			</div>

			<div className='mt-3 flex items-baseline gap-1.5'>
				<span className='text-[26px] font-semibold leading-none'>
					{CALORIES.eaten.toLocaleString('ru-RU')}
				</span>
				<span className='text-[10px] uppercase tracking-[0.16em] text-muted'>
					{t('nutrition.panel.kcal')}
				</span>
			</div>

			<ProgressBar
				value={caloriePercent}
				delay={0.3}
				className='mt-3 h-1.5'
			/>

			{/* Macros */}
			<div className='mt-4 space-y-2.5 border-t border-ink-line pt-4'>
				{MACROS.map((macro, index) => (
					<div key={macro.key}>
						<div className='flex items-baseline justify-between text-[10px]'>
							<span className='uppercase tracking-[0.14em] text-muted'>
								{t(`nutrition.panel.${macro.key}`)}
							</span>
							<span className='font-medium'>
								<span className='text-white'>{macro.current}</span>
								<span className='text-muted'> / {macro.goal} г</span>
							</span>
						</div>
						<ProgressBar
							value={(macro.current / macro.goal) * 100}
							delay={0.5 + index * 0.12}
							className='mt-1.5 h-[3px]'
						/>
					</div>
				))}
			</div>

			{/* Meals */}
			<div className='mt-4 space-y-1.5 border-t border-ink-line pt-4'>
				{MEALS.map(meal => (
					<div
						key={meal.key}
						className={clsx(
							'flex items-center justify-between rounded-lg px-2.5 py-2',
							meal.state === 'active'
								? 'border border-accent/40 bg-[#161616]'
								: 'border border-transparent'
						)}
					>
						<span className='flex items-center gap-2.5'>
							<span
								className={clsx(
									'h-1.5 w-1.5 rounded-full',
									meal.state === 'planned' ? 'bg-[#333333]' : 'bg-accent'
								)}
							/>
							<span
								className={clsx(
									'text-[12px]',
									meal.state === 'planned' ? 'text-muted' : 'text-white'
								)}
							>
								{t(`nutrition.panel.${meal.key}`)}
							</span>
						</span>
						<span
							className={clsx(
								'text-[11px] font-medium',
								meal.state === 'planned' ? 'text-muted' : 'text-white'
							)}
						>
							{meal.kcal}
						</span>
					</div>
				))}
			</div>
		</div>
	)
}
