import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { useStoreLink } from '../../hooks/useStoreLink'
import ColumnRules from '../ui/ColumnRules'
import PhoneShot from '../ui/PhoneShot'
import StoreLink from '../ui/StoreLink'
import Reveal from '../ui/motion/Reveal'
import { EASE_PREMIUM } from '../ui/motion/easing'

const VIEWPORT = { once: true, amount: 0.2 } as const

/**
 * Closing frame of the page. Centred on purpose — every other section is
 * asymmetric, so the symmetry reads as an ending.
 */
export default function Download() {
	const { t } = useTranslation()
	const shouldReduceMotion = useReducedMotion()
	const storeLink = useStoreLink()

	return (
		<section
			id='download'
			className='grain relative isolate overflow-hidden bg-ink py-32 text-center sm:py-40 lg:py-48'
		>
			<ColumnRules />

			<div className='relative mx-auto flex max-w-edge flex-col items-center px-5 sm:px-8 lg:px-14'>
				<Reveal
					delay={0.5}
					y={26}
					amount={0.2}
				>
					<h2 className='text-[clamp(2.4rem,10.5vw,5.5rem)] font-premium leading-[0.92] lg:text-[clamp(3rem,5.4vw,5.75rem)]'>
						{t('download.headline')}
					</h2>
				</Reveal>

				<Reveal
					delay={0.72}
					y={18}
				>
					<p className='mt-6 text-[15px] leading-relaxed text-muted sm:text-lg'>
						{t('download.statement')}
					</p>
				</Reveal>

				{/* The device anchors the frame */}
				<div className='relative mt-16 sm:mt-20 lg:mt-24'>
					<motion.div
						aria-hidden='true'
						initial={{ opacity: 0 }}
						whileInView={{ opacity: 1 }}
						viewport={VIEWPORT}
						transition={{ duration: 2, delay: 0.3, ease: EASE_PREMIUM }}
						className='pointer-events-none absolute left-1/2 top-1/2 h-[50vh] w-[50vh] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.11] blur-[160px]'
					/>

					<motion.div
						initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.9 }}
						whileInView={{ opacity: 1, scale: 1 }}
						viewport={VIEWPORT}
						transition={{ duration: 2.2, ease: EASE_PREMIUM }}
						className='relative mx-auto w-[min(72vw,300px)] sm:w-[330px] lg:w-[380px]'
					>
						{/* <PhoneShot className='w-full' /> */}
					</motion.div>
				</div>

				<Reveal
					delay={1}
					y={20}
					className='mt-16 w-full sm:mt-20'
				>
					<a
						href={storeLink}
						target='_blank'
						rel='noopener noreferrer'
						className='inline-block w-full rounded-2xl bg-accent px-10 py-4 text-[15px] font-premium text-white transition-colors duration-500 ease-premium hover:bg-accent-soft sm:w-auto'
					>
						{t('download.cta')}
					</a>
				</Reveal>

				<Reveal
					delay={1.2}
					y={16}
					className='mt-8'
				>
					<div className='flex items-center justify-center gap-8'>
						<StoreLink platform='ios' />
						<StoreLink platform='android' />
					</div>
				</Reveal>
			</div>
		</section>
	)
}
