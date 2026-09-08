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
		<section className='grain relative isolate min-h-[88svh] flex flex-col overflow-hidden bg-ink sm:min-h-[100svh]'>
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
			<div className='max-w-3xl mx-auto pointer-events-none absolute inset-x-0 bottom-0 h-[15svh] bg-gradient-to-t from-ink via-ink/80 to-transparent' />

			<div className='relative mx-auto flex w-full max-w-edge flex-1 flex-col items-center justify-end px-5 pb-8 text-center sm:justify-between sm:px-8 sm:pb-16 sm:pt-28 lg:px-14 lg:pt-32'>
				{/* On phones the headline hangs off the top edge of the shot, so the dark
				    space gathers above the words instead of splitting them from the
				    athletes. From `sm` up it goes back to the top of the frame.
				    Mobile scale is capped so each of the three long lines stays on one
				    row down to ~360px with Russo One. */}
				<h1 className='absolute inset-x-3 bottom-[calc(95vw_+_12rem)] text-[clamp(0.7rem,3.55vw,1.1rem)] font-premium leading-[1.2] sm:static sm:inset-x-auto sm:bottom-auto sm:px-0 sm:text-[clamp(1.35rem,2.8vw,2.1rem)] lg:text-[clamp(1.75rem,2.4vw,2.6rem)]'>
					<RevealLine delay={0.15}>
						<span className='block whitespace-nowrap'>{t('hero.line1')}</span>
					</RevealLine>
					<RevealLine delay={0.27}>
						<span className='block whitespace-nowrap'>{t('hero.line2')}</span>
					</RevealLine>
					<RevealLine delay={0.39}>
						<span className='block whitespace-nowrap'>
							{t('hero.line3')} <span className='text-accent'>{t('hero.line3Accent')}</span>
						</span>
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
