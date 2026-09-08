import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { images } from '../../assets/images'
import ProgressDashboard from '../mockups/ProgressDashboard'
import ColumnRules from '../ui/ColumnRules'
import CountUp from '../ui/CountUp'
import FloatingStat from '../ui/FloatingStat'
import PhoneShot from '../ui/PhoneShot'

import SectionIntro from './SectionIntro'

/** Desktop anchor points around the device, mobile falls back to a row. */
const STAT_POSITIONS = [
	'hidden lg:absolute lg:block lg:-left-10 lg:top-[10%]',
	'hidden lg:absolute lg:block lg:-right-14 lg:top-[27%]',
	'hidden lg:absolute lg:block lg:-left-8 lg:top-[52%]'
]

export default function Progress() {
	const sectionRef = useRef<HTMLElement>(null)
	const shouldReduceMotion = useReducedMotion()
	const { t, i18n } = useTranslation()

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start end', 'end start']
	})
	const phoneLift = useTransform(scrollYProgress, [0, 1], [48, -48])

	const stats = [
		{
			key: 'workouts',
			value: (
				<CountUp
					to={24}
					delay={0.3}
				/>
			),
			label: t('progress.stats.workouts')
		},
		{
			key: 'strength',
			value: (
				<CountUp
					to={18}
					prefix='+'
					suffix='%'
					delay={0.45}
				/>
			),
			label: t('progress.stats.strength'),
			accent: true
		},
		{
			key: 'consistency',
			value: (
				<CountUp
					to={86}
					suffix='%'
					delay={0.6}
				/>
			),
			label: t('progress.stats.consistency')
		}
	]

	return (
		<section
			ref={sectionRef}
			id='progress'
			className='grain relative isolate overflow-hidden bg-ink py-24 sm:py-32 lg:py-40'
		>
			<ColumnRules />

			<div className='relative mx-auto max-w-edge px-5 sm:px-8 lg:px-14'>
				<div className='lg:grid lg:grid-cols-12 lg:gap-8'>
					{/* Text sits low on the right, deliberately off the visual centre */}
					<SectionIntro
						index='02'
						label={t('nav.progress')}
						headline={t('progress.headline')}
						description={t('progress.statement')}
						className='lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:mt-36'
					/>

					<div className='mt-16 lg:col-span-6 lg:col-start-1 lg:row-start-1 lg:mt-0'>
						<motion.div
							style={{ y: shouldReduceMotion ? 0 : phoneLift }}
							className='relative mx-auto w-[min(80vw,320px)] sm:w-[340px] lg:mx-0 lg:w-[350px] xl:w-[380px]'
						>
							<PhoneShot
								className='w-full'
								src={images['4'][i18n.language as 'ru'].src}
							/>

							{/* {stats.map((stat, index) => (
								<FloatingStat
									key={stat.key}
									value={stat.value}
									label={stat.label}
									accent={stat.accent}
									delay={0.2 + index * 0.15}
									floatOffset={index * 1.3}
									className={STAT_POSITIONS[index]}
								/>
							))}

							<ProgressDashboard className='hidden lg:absolute lg:bottom-4 lg:-right-[180px] lg:z-20 lg:block lg:w-[300px] xl:-right-[200px] xl:w-[330px]' /> */}
						</motion.div>

						{/* Mobile gets the full column width instead of the device width */}
						{/* <ProgressDashboard className='mt-8 lg:hidden' /> */}

						{/* Mobile keeps the same numbers, stacked under the visual */}
						{/* <div className='mt-6 grid grid-cols-3 gap-3 lg:hidden'>
							{stats.map((stat, index) => (
								<FloatingStat
									key={stat.key}
									value={stat.value}
									label={stat.label}
									accent={stat.accent}
									delay={0.15 + index * 0.12}
									floatOffset={index * 1.3}
								/>
							))}
						</div> */}
					</div>
				</div>
			</div>
		</section>
	)
}
