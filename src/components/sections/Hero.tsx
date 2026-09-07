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
		<section className='grain relative isolate flex flex-col overflow-hidden bg-ink min-h-[100svh]'>
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
				className='pointer-events-none absolute inset-x-0 bottom-32 sm:bottom-0'
			>
				{/* Both sources are cropped to the same 1011:941 box, so on phones the
				    shot's height is always `100 / 1.074 = 93vw` — the figure the headline
				    below is anchored to. From `sm` up the box owns the size instead and
				    `object-contain` fits the shot inside it, so a narrow or short window
				    scales the athletes down rather than cutting an arm off the frame.
				    `picture` has to carry the sizing: as a bare child it shrinks to the
				    image's intrinsic width and this all falls apart. */}
				<picture className='block w-full sm:h-[58svh] xl:h-[64svh]'>
					<source
						media='(max-width: 639px)'
						srcSet='/images/hero-mobile.webp'
						type='image/webp'
					/>
					<img
						src='/images/hero.webp'
						alt=''
						width={1011}
						height={941}
						draggable={false}
						className='w-full select-none sm:h-full sm:object-contain sm:object-bottom'
					/>
				</picture>
			</motion.div>

			{/* Seats them into the darkness and carries the buttons */}
			<div className='pointer-events-none absolute inset-x-0 bottom-0 h-[28svh] bg-gradient-to-t from-ink via-ink/80 to-transparent' />

			<div className='relative mx-auto flex w-full max-w-edge flex-1 flex-col items-center justify-end px-5 pb-8 text-center sm:justify-between sm:px-8 sm:pb-16 sm:pt-28 lg:px-14 lg:pt-32'>
				{/* On phones the headline hangs off the top edge of the shot, so the dark
				    space gathers above the words instead of splitting them from the
				    athletes. From `sm` up it goes back to the top of the frame.
				    The mobile scale is the largest that still keeps "Твой прогресс." on
				    one line at 320px — raising it wraps the line. */}
				<h1 className='absolute inset-x-5 bottom-[calc(93vw_+_12rem)] text-[clamp(2.25rem,11vw,4rem)] font-semibold leading-[0.94] tracking-tightest sm:static sm:inset-x-auto sm:bottom-auto sm:text-[clamp(2.1rem,5vw,3.4rem)] lg:text-[clamp(2.5rem,3.6vw,4rem)]'>
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
