import { motion, useReducedMotion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import ColumnRules from '../ui/ColumnRules'
import StoreButtons from '../ui/StoreButtons'
import Reveal from '../ui/motion/Reveal'
import RevealLine from '../ui/motion/RevealLine'
import { EASE_PREMIUM } from '../ui/motion/easing'

/**
 * First frame: the athletes, the promise, the two stores. Nothing else — the
 * visitor should be able to decide without reading.
 */
export default function Hero() {
	const { t } = useTranslation()
	const shouldReduceMotion = useReducedMotion()

	return (
		<section className='grain relative isolate flex min-h-[100svh] flex-col overflow-hidden bg-ink'>
			{/* Single red light source, behind the athletes */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 2, ease: EASE_PREMIUM }}
				className='pointer-events-none absolute left-1/2 top-[18%] h-[58vh] w-[80vh] -translate-x-1/2 rounded-full bg-accent/[0.13] blur-[150px]'
			/>

			<ColumnRules />

			{/* The shot is cut out on transparency, so they stand straight on the
			    page black with no frame or mask of any kind. */}
			<motion.div
				initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 1.05 }}
				animate={{ opacity: 1, scale: 1 }}
				transition={{ duration: 2.4, ease: EASE_PREMIUM }}
				className='pointer-events-none absolute inset-x-0 bottom-0'
			>
				{/* The box owns the size and `object-contain` fits the shot inside it,
				    so a narrow window makes the athletes smaller instead of cutting an
				    arm off. `picture` must carry the box: as a bare flex/inline child it
				    would shrink to the image's intrinsic width instead. */}
				<picture className='block h-[46svh] w-full sm:h-[58svh] xl:h-[64svh]'>
					{/* Phones get the shot cropped tight to the silhouette, so fitting it
					    to the screen width leaves the bodies as large as possible. */}
					<source
						media='(max-width: 639px)'
						srcSet='/images/hero-mobile.webp'
						type='image/webp'
					/>
					<source
						srcSet='/images/hero.webp'
						type='image/webp'
					/>
					<img
						src='/images/hero.png'
						alt=''
						width={1536}
						height={1024}
						draggable={false}
						className='h-full w-full select-none object-contain object-bottom'
					/>
				</picture>
			</motion.div>

			{/* Seats them into the darkness and carries the buttons */}
			<div className='pointer-events-none absolute inset-x-0 bottom-0 h-[34svh] bg-gradient-to-t from-ink via-ink/80 to-transparent' />

			<div className='relative mx-auto flex w-full max-w-edge flex-1 flex-col items-center justify-between px-5 pb-14 pt-28 text-center sm:px-8 sm:pb-16 lg:px-14 lg:pt-32'>
				<h1 className='text-[clamp(4rem,7.5vw,3.4rem)] font-semibold leading-[0.94] tracking-tightest lg:text-[clamp(2.5rem,3.6vw,4rem)]'>
					<RevealLine delay={0.15}>{t('hero.line1')}</RevealLine>
					<RevealLine delay={0.27}>{t('hero.line2')}</RevealLine>
					<RevealLine delay={0.39}>
						{t('hero.line3') && <>{t('hero.line3')} </>}
						<span className='text-accent'>{t('hero.line3Accent')}</span>
					</RevealLine>
				</h1>

				<Reveal
					delay={0.9}
					y={22}
					className='w-full sm:w-auto'
				>
					<StoreButtons />
				</Reveal>
			</div>
		</section>
	)
}
