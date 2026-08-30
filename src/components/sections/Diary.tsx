import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { Check, Flame, TrendingUp } from 'lucide-react'
import { useRef } from 'react'
import { useTranslation } from 'react-i18next'

import DiaryCard from '../mockups/DiaryCard'
import DiaryTimeline from '../mockups/DiaryTimeline'
import ColumnRules from '../ui/ColumnRules'
import PhoneShot from '../ui/PhoneShot'
import { EASE_PREMIUM } from '../ui/motion/easing'

import SectionIntro from './SectionIntro'

/** Desktop anchor points around the device; mobile falls back to a row below it. */
const CARD_POSITIONS = [
	'hidden lg:absolute lg:block lg:-left-16 lg:top-[19%] xl:-left-24',
	'hidden lg:absolute lg:block lg:-right-6 lg:top-[5%]',
	'hidden lg:absolute lg:block lg:-left-10 lg:bottom-[15%] xl:-left-16'
]

export default function Diary() {
	const sectionRef = useRef<HTMLElement>(null)
	const shouldReduceMotion = useReducedMotion()
	const { t } = useTranslation()

	const { scrollYProgress } = useScroll({
		target: sectionRef,
		offset: ['start end', 'end start']
	})
	const phoneLift = useTransform(scrollYProgress, [0, 1], [36, -36])

	const cards = [
		{
			key: 'completed',
			icon: Check,
			accent: true,
			title: t('diary.cards.completed.title'),
			meta: t('diary.meta', { minutes: 58, exercises: 12 })
		},
		{
			key: 'streak',
			icon: Flame,
			title: t('diary.cards.streak.title', { days: 14 }),
			meta: t('diary.cards.streak.meta')
		},
		{
			key: 'record',
			icon: TrendingUp,
			title: t('diary.cards.record.title'),
			meta: t('diary.cards.record.meta', { weight: 80 })
		}
	]

	return (
		<section
			ref={sectionRef}
			id='diary'
			className='grain relative isolate overflow-hidden bg-ink py-28 sm:py-32 lg:py-40'
		>
			<ColumnRules />

			<div className='relative mx-auto max-w-edge px-5 sm:px-8 lg:px-14'>
				{/* Text and history share the left column; the device owns the right one. */}
				<div className='lg:grid lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-8'>
					<SectionIntro
						index='04'
						label={t('nav.diary')}
						headline={t('diary.headline')}
						description={t('diary.statement')}
						className='lg:col-span-5 lg:col-start-1 lg:row-start-1'
					/>

					<div className='relative mt-16 lg:col-span-6 lg:col-start-7 lg:row-span-2 lg:row-start-1 lg:mt-0'>
						{/* Faintest red light on the page: this section stays calm */}
						<div className='pointer-events-none absolute right-[6%] top-[4%] h-[36vh] w-[36vh] rounded-full bg-accent/[0.07] blur-[150px]' />

						<motion.div
							style={{ y: shouldReduceMotion ? 0 : phoneLift }}
							className='relative mx-auto w-[min(78vw,320px)] sm:w-[340px] lg:mx-0 lg:ml-auto lg:w-[400px] xl:w-[460px]'
						>
							<motion.div
								initial={{ opacity: 0, scale: shouldReduceMotion ? 1 : 0.97 }}
								whileInView={{ opacity: 1, scale: 1 }}
								viewport={{ once: true, amount: 0.2 }}
								transition={{ duration: 1.6, ease: EASE_PREMIUM }}
							>
								<PhoneShot className='w-full' />
							</motion.div>

							{cards.map((card, index) => (
								<DiaryCard
									key={card.key}
									icon={card.icon}
									title={card.title}
									meta={card.meta}
									accent={card.accent}
									delay={0.5 + index * 0.18}
									floatOffset={index * 1.6}
									className={CARD_POSITIONS[index]}
								/>
							))}
						</motion.div>

						{/* Mobile keeps the two cards that carry the feeling, at full width */}
						<div className='mt-6 grid gap-3 sm:grid-cols-2 lg:hidden'>
							{cards.slice(0, 2).map((card, index) => (
								<DiaryCard
									key={card.key}
									icon={card.icon}
									title={card.title}
									meta={card.meta}
									accent={card.accent}
									delay={0.15 + index * 0.15}
									floatOffset={index * 1.6}
								/>
							))}
						</div>
					</div>

					<DiaryTimeline className='mt-14 lg:col-span-4 lg:col-start-1 lg:row-start-2 lg:mt-16 lg:self-start' />
				</div>
			</div>
		</section>
	)
}
