import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import PhoneShot from '../ui/PhoneShot'
import Reveal from '../ui/motion/Reveal'

import SectionIntro from './SectionIntro'

type ShowcasePhoneProps = {
	delay: number
	className?: string
}

function ShowcasePhone({ delay, className }: ShowcasePhoneProps) {
	return (
		<div className={clsx('relative w-[min(80vw,330px)] sm:w-[340px]', className)}>
			<Reveal
				delay={delay}
				y={48}
				duration={1.2}
				amount={0.15}
			>
				<PhoneShot className='w-full' />
			</Reveal>
		</div>
	)
}

export default function Training() {
	const { t } = useTranslation()

	return (
		<section
			id='training'
			className='grain relative isolate overflow-hidden bg-ink py-28 sm:py-32 lg:py-40'
		>
			<div className='relative mx-auto max-w-edge px-5 sm:px-8 lg:px-14'>
				<SectionIntro
					index='01'
					label={t('nav.training')}
					headline={t('training.headline')}
					description={t('training.statement')}
				/>

				<div className='relative mt-20 lg:mt-32'>
					{/* Subtle red atmospheric light behind the composition */}
					<div className='pointer-events-none absolute left-1/2 top-1/2 h-[55vh] w-[85vw] max-w-[880px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.08] blur-[150px]' />

					<div className='relative flex flex-col items-center gap-16 sm:gap-20 lg:flex-row lg:items-end lg:justify-center lg:gap-8 xl:gap-12'>
						<ShowcasePhone
							delay={0}
							className='lg:w-[262px] lg:translate-y-16 xl:w-[290px]'
						/>

						<ShowcasePhone
							delay={0.16}
							className='z-10 lg:w-[300px] lg:-translate-y-8 xl:w-[340px]'
						/>

						<ShowcasePhone
							delay={0.32}
							className='lg:w-[262px] lg:translate-y-6 xl:w-[290px]'
						/>
					</div>
				</div>
			</div>
		</section>
	)
}
