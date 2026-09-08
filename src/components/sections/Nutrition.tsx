import clsx from 'clsx'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type { MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { images } from '../../assets/images'
import NutritionPanel from '../mockups/NutritionPanel'
import ColumnRules from '../ui/ColumnRules'
import PhoneShot from '../ui/PhoneShot'
import { EASE_PREMIUM } from '../ui/motion/easing'

import SectionIntro from './SectionIntro'

type FoodProps = {
	src: string
	y: MotionValue<number> | number
	className?: string
	imageClassName?: string
}

/** Decorative food element: drifts a few pixels on scroll, never interactive. */
function Food({ src, y, className, imageClassName }: FoodProps) {
	return (
		<motion.div
			style={{ y }}
			aria-hidden='true'
			className={clsx('pointer-events-none absolute select-none', className)}
		>
			<img
				src={src}
				alt=''
				loading='lazy'
				draggable={false}
				className={clsx('h-full w-full object-cover', imageClassName)}
			/>
		</motion.div>
	)
}

export default function Nutrition() {
	const sectionRef = useRef<HTMLElement>(null)
	const shouldReduceMotion = useReducedMotion()
	const { t, i18n } = useTranslation()

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start end', 'end start']
	})

	const plateY = useTransform(scrollYProgress, [0, 1], [26, -26])
	const avocadoY = useTransform(scrollYProgress, [0, 1], [-16, 16])
	const berriesY = useTransform(scrollYProgress, [0, 1], [20, -20])
	const greensY = useTransform(scrollYProgress, [0, 1], [-12, 12])

	const drift = (value: MotionValue<number>) => (shouldReduceMotion ? 0 : value)

	return (
		<section
			ref={sectionRef}
			id='nutrition'
			className='grain relative isolate overflow-hidden bg-ink py-28 sm:py-32 lg:py-40'
		>
			<ColumnRules />

			<div className='relative mx-auto max-w-edge px-5 sm:px-8 lg:px-14'>
				<div className='lg:grid lg:grid-cols-12 lg:gap-8'>
					<SectionIntro
						index='03'
						label={t('nav.nutrition')}
						headline={t('nutrition.headline')}
						description={t('nutrition.statement')}
						className='lg:col-span-5 lg:col-start-1 lg:row-start-1 lg:mt-28'
					/>

					<div className='relative mt-16 lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:mt-0'>
						{/* Out-of-focus plate sets the scene behind everything */}
						<Food
							src='/images/food/plate.jpg'
							y={drift(plateY)}
							className='left-0 top-0 aspect-[3/2] w-[62%] max-w-[420px] lg:w-[56%]'
							imageClassName='rounded-[2rem] opacity-40 blur-[3px] [mask-image:radial-gradient(closest-side,black_50%,transparent_100%)]'
						/>

						<Food
							src='/images/food/berries.jpg'
							y={drift(berriesY)}
							className='right-[18%] top-[-26px] hidden h-24 w-24 lg:block xl:h-28 xl:w-28'
							imageClassName='rounded-full opacity-70 blur-[1px]'
						/>

						<Food
							src='/images/food/avocado.jpg'
							y={drift(avocadoY)}
							className='left-[3%] top-[26%] hidden h-28 w-28 lg:block xl:h-32 xl:w-32'
							imageClassName='rounded-full opacity-80'
						/>

						<Food
							src='/images/food/greens.jpg'
							y={drift(greensY)}
							className='-right-8 top-[44%] hidden h-28 w-28 lg:block xl:h-32 xl:w-32'
							imageClassName='rounded-full opacity-60 blur-[2px]'
						/>

						{/* Subtle red light, the only chromatic accent in the scene */}
						<div className='pointer-events-none absolute right-[6%] top-[14%] h-[42vh] w-[42vh] rounded-full bg-accent/[0.13] blur-[140px]' />

						<motion.div
							initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.96 }}
							whileInView={{ opacity: 1, scale: 1 }}
							viewport={{ once: true, amount: 0.25 }}
							transition={{ duration: 1.4, ease: EASE_PREMIUM }}
							className='relative mx-auto w-[min(78vw,320px)] sm:w-[340px] lg:mx-0 lg:ml-auto lg:w-[340px] xl:w-[380px]'
						>
							<PhoneShot
								className='w-full'
								src={images['5'][i18n.language as 'ru'].src}
							/>

							<NutritionPanel className='hidden lg:absolute lg:bottom-6 lg:-left-[190px] lg:z-20 lg:block lg:w-[300px] xl:-left-[210px] xl:w-[320px]' />
						</motion.div>

						{/* Mobile gets the panel below the device, at full width */}
						<NutritionPanel className='relative mt-8 lg:hidden' />
					</div>
				</div>
			</div>
		</section>
	)
}
