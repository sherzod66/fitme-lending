import { useQuery } from '@tanstack/react-query'
import { Check, Crown } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { subscriptionPlanService } from '../../service/subscription-plan.service'
import { ISubscriptionPlan } from '../../types/subscription-plan.types'
import { formatSum } from '../../utils/formatPrice'
import Loading from '../ui/loader/loading'

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
			className='py-20 px-4 lg:px-8 bg-black'
		>
			<div className='max-w-7xl mx-auto'>
				<div className='text-center mb-12'>
					<h2 className='text-3xl md:text-4xl font-bold mb-4'>{t('subscription.title')}</h2>
					<p className='text-xl text-gray-400 max-w-3xl mx-auto'>{t('subscription.subtitle')}</p>
				</div>

				<div className='grid lg:grid-cols-2 gap-10 items-start'>
					<div className='bg-zinc-950 border border-red-900/20 rounded-2xl p-6 md:p-8'>
						<h3 className='text-2xl font-semibold mb-6'>{t('subscription.featuresTitle')}</h3>
						<ul className='space-y-4'>
							{featureKeys.map(key => (
								<li
									key={key}
									className='flex items-start gap-3'
								>
									<span className='mt-0.5 size-5 rounded-full bg-red-950 flex items-center justify-center shrink-0'>
										<Check
											className='size-3 text-red-500'
											strokeWidth={3}
										/>
									</span>
									<span className='text-gray-300'>{t(`subscription.features.${key}`)}</span>
								</li>
							))}
						</ul>
					</div>

					<div className='flex flex-col gap-4'>
						<h3 className='text-2xl font-semibold mb-2'>{t('subscription.plansTitle')}</h3>

						{isLoading ? (
							<div className='py-10 flex justify-center'>
								<Loading />
							</div>
						) : activePlans.length === 0 ? (
							<p className='text-gray-500'>{t('subscription.noPlans')}</p>
						) : (
							activePlans.map(plan => {
								const perMonth =
									plan.durationMonths > 0 ? plan.price / plan.durationMonths : plan.price

								return (
									<div
										key={plan.id}
										className={`relative bg-zinc-950 border rounded-2xl p-5 transition ${
											plan.isPopular
												? 'border-red-500 shadow-[0_0_30px_rgba(215,12,12,0.15)]'
												: 'border-red-900/20'
										}`}
									>
										{plan.isPopular && (
											<span className='absolute -top-3 left-5 bg-red-600 text-white text-xs font-semibold px-3 py-1 rounded-full'>
												{t('subscription.popular')}
											</span>
										)}

										<div className='flex items-start justify-between gap-4'>
											<div>
												<p className='text-lg font-semibold mb-2'>
													{getPlanLabel(plan, i18n.language)}
												</p>
												<div className='flex items-baseline gap-2 flex-wrap'>
													{plan.oldPrice > 0 && (
														<span className='text-sm text-gray-500 line-through'>
															{formatSum(plan.oldPrice)}
														</span>
													)}
													<span className='text-2xl font-bold text-red-500'>
														{formatSum(plan.price)}
													</span>
												</div>
											</div>

											<div className='text-right shrink-0'>
												<p className='text-sm text-gray-400'>{t('subscription.perMonth')}</p>
												<p className='text-white font-semibold'>
													{formatSum(Math.round(perMonth))}
												</p>
											</div>
										</div>
									</div>
								)
							})
						)}

						<p className='text-sm text-gray-500 mt-2'>{t('subscription.paymeNote')}</p>
					</div>
				</div>

				<div className='mt-10 flex flex-col items-center gap-4'>
					<Link
						to='/profile'
						className='inline-flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold transition transform hover:scale-105'
					>
						<Crown
							className='size-5'
							strokeWidth={2}
						/>
						{t('subscription.buyButton')}
					</Link>

					<p className='text-sm text-gray-500 text-center max-w-xl'>
						{t('subscription.termsPrefix')}{' '}
						<Link
							to='/subscription-terms'
							className='text-red-500 hover:text-red-400 underline underline-offset-2'
						>
							{t('subscription.termsLink')}
						</Link>
					</p>
				</div>
			</div>
		</section>
	)
}
