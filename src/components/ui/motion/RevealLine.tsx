import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

import { EASE_PREMIUM } from './easing'

type Props = {
	children: ReactNode
	className?: string
	delay?: number
}

/**
 * Editorial headline reveal: the line slides up from behind a clipping mask.
 * Requires a block-level child, so it is kept separate from `Reveal`.
 */
export default function RevealLine({ children, className, delay = 0 }: Props) {
	const shouldReduceMotion = useReducedMotion()

	return (
		// The padding keeps ascenders and descenders inside the mask at tight
		// leading; the negative margins give the original line rhythm back.
		<span className='-mb-[0.18em] -mt-[0.1em] block overflow-hidden pb-[0.2em] pt-[0.1em]'>
			<motion.span
				className={className}
				initial={{ y: shouldReduceMotion ? 0 : '135%', opacity: shouldReduceMotion ? 0 : 1 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{
					duration: shouldReduceMotion ? 0 : 1.1,
					delay: shouldReduceMotion ? 0 : delay,
					ease: EASE_PREMIUM
				}}
				style={{ display: 'block' }}
			>
				{children}
			</motion.span>
		</span>
	)
}
