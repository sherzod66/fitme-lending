import { motion, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'
import type { ReactNode } from 'react'

import { EASE_PREMIUM } from './easing'

type Props = {
	children: ReactNode
	className?: string
	/** Seconds before the animation starts. Use to stagger siblings. */
	delay?: number
	/** Distance in px the element travels upwards while fading in. */
	y?: number
	duration?: number
	/** Portion of the element that must be visible before it animates in. */
	amount?: number
}

export default function Reveal({
	children,
	className,
	delay = 0,
	y = 28,
	duration = 1,
	amount = 0.25
}: Props) {
	const shouldReduceMotion = useReducedMotion()

	const variants: Variants = {
		hidden: { opacity: 0, y: shouldReduceMotion ? 0 : y },
		visible: {
			opacity: 1,
			y: 0,
			transition: {
				duration: shouldReduceMotion ? 0 : duration,
				delay: shouldReduceMotion ? 0 : delay,
				ease: EASE_PREMIUM
			}
		}
	}

	return (
		<motion.div
			className={className}
			variants={variants}
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true, amount }}
		>
			{children}
		</motion.div>
	)
}
