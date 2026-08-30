import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { useStoreLink } from '../../hooks/useStoreLink'
import FloatingStat from '../ui/FloatingStat'
import PhoneShot from '../ui/PhoneShot'
import Reveal from '../ui/motion/Reveal'
import RevealLine from '../ui/motion/RevealLine'
import { EASE_PREMIUM } from '../ui/motion/easing'

export default function Hero() {
	const { t } = useTranslation()
	const shouldReduceMotion = useReducedMotion()
	const storeLink = useStoreLink()

	return (
		<section className='grain relative isolate overflow-hidden bg-ink'>
			{/* Single soft red light source behind the phone */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 1.8, ease: EASE_PREMIUM }}
				className='pointer-events-none absolute inset-0'
			>
				<div className='absolute left-1/2 top-[6%] h-[62vh] w-[62vh] -translate-x-1/2 rounded-full bg-accent/[0.16] blur-[150px] lg:left-auto lg:right-[4%] lg:top-[2%] lg:translate-x-0 lg:bg-accent/20' />
			</motion.div>

			{/* Editorial column rules */}
			<div className='pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-edge -translate-x-1/2 border-x border-white/[0.06] lg:block' />

			<div className='relative mx-auto flex min-h-[92svh] max-w-edge flex-col justify-center px-5 pb-16 pt-28 sm:px-8 lg:min-h-[100svh] lg:px-14 lg:pb-0 lg:pt-24'>
				<div className='grid items-center gap-12 sm:gap-16 lg:grid-cols-12 lg:gap-6'>
					{/* Headline · description · CTA */}
					<div className='lg:col-span-6 xl:col-span-6'>
						<h1 className='text-[clamp(2.3rem,10.5vw,5.5rem)] font-semibold leading-[0.92] tracking-tightest lg:text-[clamp(3rem,5.4vw,5.75rem)]'>
							<RevealLine delay={0.1}>{t('hero.line1')}</RevealLine>
							<RevealLine delay={0.22}>{t('hero.line2')}</RevealLine>
							<RevealLine delay={0.34}>
								{t('hero.line3') && <>{t('hero.line3')} </>}
								<span className='text-accent'>{t('hero.line3Accent')}</span>
							</RevealLine>
						</h1>

						<Reveal
							delay={0.5}
							y={22}
						>
							<p className='mt-7 max-w-[34ch] text-pretty text-[15px] leading-relaxed text-muted sm:text-lg'>
								{t('hero.lead')}
							</p>
						</Reveal>

						<Reveal
							delay={0.65}
							y={22}
						>
							<div className='mt-9 flex flex-col items-start gap-4 sm:flex-row sm:items-center'>
								<a
									href={storeLink}
									target='_blank'
									rel='noopener noreferrer'
									className='w-full rounded-2xl bg-accent px-8 py-4 text-center text-[15px] font-semibold text-white transition-colors duration-500 ease-premium hover:bg-accent-soft sm:w-auto'
								>
									{t('hero.cta')}
								</a>
								<span className='text-xs uppercase tracking-[0.18em] text-muted'>
									{t('hero.stores')}
								</span>
							</div>
						</Reveal>
					</div>

					{/* Product visual, deliberately breaking out of the grid */}
					<div className='relative flex justify-center lg:col-span-6 lg:justify-end xl:col-span-6'>
						<motion.div
							initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.95 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{ duration: 1.5, delay: 0.3, ease: EASE_PREMIUM }}
							className='relative w-[min(82vw,330px)] sm:w-[350px] lg:-mb-16 lg:-mr-4 lg:h-[min(78vh,800px)] lg:w-auto xl:-mr-6'
						>
							<motion.div
								animate={shouldReduceMotion ? undefined : { y: [0, -12, 0] }}
								transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
								className='h-full'
							>
								<PhoneShot
									className='w-full lg:h-full lg:w-auto'
									loading='eager'
								/>
							</motion.div>

							<FloatingStat
								value={t('hero.cards.workouts.value')}
								label={t('hero.cards.workouts.label')}
								delay={1.05}
								className='absolute -left-6 top-[24%] hidden md:block lg:-left-20 xl:-left-28'
							/>
							<FloatingStat
								value={t('hero.cards.strength.value')}
								label={t('hero.cards.strength.label')}
								accent
								delay={1.2}
								floatOffset={1.4}
								className='absolute -right-4 top-[7%] hidden md:block lg:-right-6'
							/>
							<FloatingStat
								value={t('hero.cards.consistency.value')}
								label={t('hero.cards.consistency.label')}
								delay={1.35}
								floatOffset={2.6}
								className='absolute -left-4 bottom-[20%] hidden md:block lg:-left-14 xl:-left-20'
							/>
						</motion.div>
					</div>
				</div>
			</div>
		</section>
	)
}
