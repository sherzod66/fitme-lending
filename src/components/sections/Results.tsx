import clsx from 'clsx'
import { ImageOff } from 'lucide-react'
import { useTranslation } from 'react-i18next'

import ColumnRules from '../ui/ColumnRules'
import Reveal from '../ui/motion/Reveal'

/**
 * Real client photos go here. Drop the files under `public/images/results` and
 * fill in `before` / `after`; the placeholders then disappear on their own.
 * Portrait shots (3:4) crop best.
 */
const PAIRS: { key: string; before?: string; after?: string }[] = [
	{ key: 'one', before: '/images/results/before-1.webp', after: '/images/results/after-1.webp' },
	{ key: 'two' },
	{ key: 'three' }
]

type ShotProps = {
	src?: string
	label: string
	/** Marks the "after" shot: the only red in this section. */
	accent?: boolean
}

function Shot({ src, label, accent }: ShotProps) {
	return (
		<figure className='relative overflow-hidden rounded-xl border border-ink-line bg-ink-card'>
			<div className='aspect-[3/4]'>
				{src ? (
					<img
						src={src}
						alt=''
						loading='lazy'
						className='h-full w-full object-cover'
					/>
				) : (
					<div className='flex h-full w-full items-center justify-center'>
						<ImageOff className='h-5 w-5 text-muted/40' />
					</div>
				)}
			</div>

			<figcaption
				className={clsx(
					'absolute left-2.5 top-2.5 rounded-full px-2.5 py-1 text-[9px] font-semibold uppercase tracking-[0.16em] backdrop-blur-md',
					accent ? 'bg-accent text-white' : 'bg-ink/70 text-muted'
				)}
			>
				{label}
			</figcaption>
		</figure>
	)
}

export default function Results() {
	const { t } = useTranslation()

	return (
		<section
			id='results'
			className='grain relative isolate overflow-hidden bg-ink py-28 sm:py-32 lg:py-40'
		>
			<ColumnRules />

			<div className='relative mx-auto max-w-edge px-5 sm:px-8 lg:px-14'>
				<Reveal y={22}>
					<h2 className='max-w-[18ch] text-[clamp(2rem,7vw,3.2rem)] leading-[1.1] lg:text-[clamp(2.4rem,3.4vw,3.75rem)] font-premium'>
						{t('results.headline')}
					</h2>
				</Reveal>

				<div className='mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3 lg:gap-6'>
					{PAIRS.map((pair, index) => (
						<Reveal
							key={pair.key}
							delay={index * 0.12}
							y={24}
							amount={0.2}
						>
							<div className='grid grid-cols-2 gap-2'>
								<Shot
									src={pair.before}
									label={t('results.before')}
								/>
								<Shot
									src={pair.after}
									label={t('results.after')}
									accent
								/>
							</div>
						</Reveal>
					))}
				</div>
			</div>
		</section>
	)
}
