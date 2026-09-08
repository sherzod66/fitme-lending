import clsx from 'clsx'

import Reveal from '../ui/motion/Reveal'

type Props = {
	/** Editorial section index, e.g. "01". */
	index: string
	label: string
	headline: string
	description?: string
	className?: string
}

export default function SectionIntro({ index, label, headline, description, className }: Props) {
	return (
		<div className={clsx('max-w-3xl', className)}>
			<Reveal
				y={12}
				duration={0.9}
			>
				<p className='text-[11px] uppercase tracking-[0.28em]'>
					<span className='text-accent'>{index}</span>
					<span className='text-muted'> / {label}</span>
				</p>
			</Reveal>

			<Reveal
				delay={0.12}
				y={26}
			>
				<h2 className='mt-6 text-[clamp(2.4rem,9vw,5rem)] font-premium leading-[1.1] lg:text-[clamp(3rem,5vw,5.25rem)]'>
					{headline}
				</h2>
			</Reveal>

			{description && (
				<Reveal
					delay={0.24}
					y={22}
				>
					<p className='mt-7 max-w-[38ch] text-pretty text-[15px] leading-relaxed text-muted sm:text-lg'>
						{description}
					</p>
				</Reveal>
			)}
		</div>
	)
}
