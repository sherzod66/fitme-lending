import { animate, motion, useInView, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import { useEffect, useRef } from 'react'

import { EASE_PREMIUM } from './motion/easing'

type Props = {
	to: number
	prefix?: string
	suffix?: string
	duration?: number
	delay?: number
	className?: string
}

/** Counts a metric up once it scrolls into view. */
export default function CountUp({
	to,
	prefix = '',
	suffix = '',
	duration = 1.8,
	delay = 0,
	className
}: Props) {
	const ref = useRef<HTMLSpanElement>(null)
	const isInView = useInView(ref, { once: true, amount: 0.5 })
	const shouldReduceMotion = useReducedMotion()

	const count = useMotionValue(shouldReduceMotion ? to : 0)
	const text = useTransform(count, latest => `${prefix}${Math.round(latest)}${suffix}`)

	useEffect(() => {
		if (!isInView || shouldReduceMotion) return

		const controls = animate(count, to, { duration, delay, ease: EASE_PREMIUM })

		return () => controls.stop()
	}, [count, delay, duration, isInView, shouldReduceMotion, to])

	return (
		<motion.span
			ref={ref}
			className={className}
		>
			{text}
		</motion.span>
	)
}
