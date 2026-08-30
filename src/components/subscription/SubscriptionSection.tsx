import { useQuery } from '@tanstack/react-query'
import clsx from 'clsx'
import { Check } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { subscriptionPlanService } from '../../service/subscription-plan.service'
import { ISubscriptionPlan } from '../../types/subscription-plan.types'
import { formatSum } from '../../utils/formatPrice'
import SectionIntro from '../sections/SectionIntro'
import Loading from '../ui/loader/loading'
import Reveal from '../ui/motion/Reveal'

const featureKeys = [
	'workoutDiary',
	'workoutPrograms',
	'nutritionPlans',
	'foodScanner',
	'trainerInteraction',
	'customPrograms',
	'trainingVideos'
] as const

const getPlanLabel = (plan: ISubscriptionPlan, language: string) => {
	const lang = language.startsWith('uz') ? 'uz' : language.startsWith('en') ? 'en' : 'ru'
	return plan.name[lang] ?? plan.name.ru
}

type PlanProps = {
	plan: ISubscriptionPlan
	language: string
	delay: number
}

/** One tariff. Red is reserved for the price and the popular marker. */
function Plan({ plan, language, delay }: PlanProps) {
	const { t } = useTranslation()
	const perMonth = plan.durationMonths > 0 ? plan.price / plan.durationMonths : plan.price

	return (
		<Reveal
			delay={delay}
			y={16}
			duration={0.9}
			amount={0.3}
		>
			<div
				className={clsx(
					'relative rounded-2xl border p-5',
					plan.isPopular
						? 'border-accent/40 bg-ink-card shadow-[0_0_50px_rgba(215,12,12,0.10)]'
						: 'border-ink-line bg-ink-card/70'
				)}
			>
				{plan.isPopular && (
					<span className='absolute -top-2.5 left-5 rounded-full bg-accent px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] text-white'>
						{t('subscription.popular')}
					</span>
				)}

				<div className='flex items-end justify-between gap-5'>
					<div className='min-w-0'>
						<p className='truncate text-[13px] font-medium tracking-tight'>
							{getPlanLabel(plan, language)}
						</p>

						<div className='mt-2.5 flex flex-wrap items-baseline gap-2.5'>
							{plan.oldPrice > 0 && (
								<span className='text-[12px] text-muted line-through'>
									{formatSum(plan.oldPrice)}
								</span>
							)}
							<span className='text-[26px] font-semibold leading-none tracking-tightest text-accent'>
								{formatSum(plan.price)}
							</span>
						</div>
					</div>

					<div className='shrink-0 text-right'>
						<p className='text-[9px] uppercase tracking-[0.16em] text-muted'>
							{t('subscription.perMonth')}
						</p>
						<p className='mt-1.5 text-[14px] font-semibold tracking-tight'>
							{formatSum(Math.round(perMonth))}
						</p>
					</div>
				</div>
			</div>
		</Reveal>
	)
}

export default function SubscriptionSection() {
	const { t, i18n } = useTranslation()

	const { data: plans = [], isLoading } = useQuery({
		queryKey: ['subscription-plans'],
		queryFn: () => subscriptionPlanService.getAll(),
		select: data => data.data
	})

	const activePlans = [...plans]
		.filter(plan => plan.isActive)
		.sort((a, b) => a.position - b.position)

	return (
		<section
			id='subscription'
			className='grain relative isolate overflow-hidden bg-ink py-28 sm:py-32 lg:py-40'
		>
			<div className='relative mx-auto max-w-edge px-5 sm:px-8 lg:px-14'>
				<SectionIntro
					index='05'
					label={t('nav.subscription')}
					headline={t('subscription.title')}
					description={t('subscription.subtitle')}
				/>

				<div className='mt-16 lg:mt-24 lg:grid lg:grid-cols-12 lg:gap-8'>
					{/* What is included: a flat list, not another card */}
					<div className='lg:col-span-5 lg:col-start-1'>
						<Reveal
							y={14}
							duration={0.9}
						>
							<p className='text-[11px] uppercase tracking-[0.28em] text-muted'>
								{t('subscription.featuresTitle')}
							</p>
						</Reveal>

						<ul className='mt-7 divide-y divide-ink-line border-y border-ink-line'>
							{featureKeys.map((key, index) => (
								<li key={key}>
									<Reveal
										delay={0.1 + index * 0.07}
										y={12}
										duration={0.8}
										amount={0.4}
									>
										<div className='flex items-center gap-3.5 py-3.5'>
											<Check
												className='h-3.5 w-3.5 shrink-0 text-accent'
												strokeWidth={3}
											/>
											<span className='text-[14px] leading-snug'>
												{t(`subscription.features.${key}`)}
											</span>
										</div>
									</Reveal>
								</li>
							))}
						</ul>
					</div>

					{/* Tariffs */}
					<div className='relative mt-14 lg:col-span-6 lg:col-start-7 lg:mt-0'>
						<div className='pointer-events-none absolute right-[4%] top-[8%] h-[34vh] w-[34vh] rounded-full bg-accent/[0.08] blur-[150px]' />

						<Reveal
							y={14}
							duration={0.9}
							className='relative'
						>
							<p className='text-[11px] uppercase tracking-[0.28em] text-muted'>
								{t('subscription.plansTitle')}
							</p>
						</Reveal>

						<div className='relative mt-7 space-y-4'>
							{isLoading ? (
								<div className='flex justify-center py-10'>
									<Loading />
								</div>
							) : activePlans.length === 0 ? (
								<p className='text-[14px] text-muted'>{t('subscription.noPlans')}</p>
							) : (
								activePlans.map((plan, index) => (
									<Plan
										key={plan.id}
										plan={plan}
										language={i18n.language}
										delay={0.12 + index * 0.1}
									/>
								))
							)}
						</div>

						<Reveal
							delay={0.35}
							y={12}
							className='relative'
						>
							<p className='mt-6 text-[12px] leading-relaxed text-muted'>
								{t('subscription.paymeNote')}
							</p>
						</Reveal>

						<Reveal
							delay={0.45}
							y={18}
							className='relative mt-9'
						>
							<Link
								to='/profile'
								className='inline-block w-full rounded-2xl bg-accent px-8 py-4 text-center text-[15px] font-semibold text-white transition-colors duration-500 ease-premium hover:bg-accent-soft sm:w-auto'
							>
								{t('subscription.buyButton')}
							</Link>

							<p className='mt-6 max-w-[46ch] text-[12px] leading-relaxed text-muted'>
								{t('subscription.termsPrefix')}{' '}
								<Link
									to='/subscription-terms'
									className='text-accent underline decoration-accent/40 underline-offset-4 transition-colors duration-500 ease-premium hover:text-accent-soft'
								>
									{t('subscription.termsLink')}
								</Link>
							</p>
						</Reveal>
					</div>
				</div>
			</div>
		</section>
	)
}
