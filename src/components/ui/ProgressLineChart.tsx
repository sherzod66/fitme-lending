import clsx from 'clsx'
import { motion, useReducedMotion } from 'framer-motion'
import { useId } from 'react'

import { EASE_PREMIUM } from './motion/easing'

const WIDTH = 300
const HEIGHT = 110
const PADDING = 8

/** Catmull-Rom through the points, converted to cubic beziers. */
function buildPath(values: number[]) {
	const stepX = WIDTH / (values.length - 1)
	const max = Math.max(...values)
	const min = Math.min(...values)
	const scaleY = (value: number) =>
		PADDING + (1 - (value - min) / (max - min || 1)) * (HEIGHT - PADDING * 2)

	const points = values.map((value, index) => [index * stepX, scaleY(value)] as const)

	let line = `M ${points[0][0]} ${points[0][1]}`

	for (let i = 0; i < points.length - 1; i++) {
		const previous = points[i - 1] ?? points[i]
		const current = points[i]
		const next = points[i + 1]
		const following = points[i + 2] ?? next

		const c1x = current[0] + (next[0] - previous[0]) / 6
		const c1y = current[1] + (next[1] - previous[1]) / 6
		const c2x = next[0] - (following[0] - current[0]) / 6
		const c2y = next[1] - (following[1] - current[1]) / 6

		line += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${next[0]} ${next[1]}`
	}

	return { line, area: `${line} L ${WIDTH} ${HEIGHT} L 0 ${HEIGHT} Z`, points }
}

type Props = {
	values: number[]
	className?: string
	delay?: number
}

export default function ProgressLineChart({ values, className, delay = 0.35 }: Props) {
	const shouldReduceMotion = useReducedMotion()
	const gradientId = useId()
	const { line, area, points } = buildPath(values)
	const last = points[points.length - 1]

	return (
		// No explicit height: the viewBox keeps the curve undistorted at any width.
		<svg
			viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
			className={clsx('block h-auto w-full overflow-visible', className)}
		>
			<defs>
				<linearGradient
					id={gradientId}
					x1='0'
					y1='0'
					x2='0'
					y2='1'
				>
					<stop
						offset='0%'
						stopColor='#D70C0C'
						stopOpacity='0.28'
					/>
					<stop
						offset='100%'
						stopColor='#D70C0C'
						stopOpacity='0'
					/>
				</linearGradient>
			</defs>

			<motion.path
				d={area}
				fill={`url(#${gradientId})`}
				initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
				whileInView={{ opacity: 1 }}
				viewport={{ once: true, amount: 0.4 }}
				transition={{ duration: 1.2, delay: delay + 0.8, ease: EASE_PREMIUM }}
			/>

			<motion.path
				d={line}
				fill='none'
				stroke='#D70C0C'
				strokeWidth='2.5'
				strokeLinecap='round'
				vectorEffect='non-scaling-stroke'
				initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
				whileInView={{ pathLength: 1 }}
				viewport={{ once: true, amount: 0.4 }}
				transition={{ duration: 2.2, delay, ease: EASE_PREMIUM }}
			/>

			<motion.circle
				cx={last[0]}
				cy={last[1]}
				r='3.5'
				fill='#D70C0C'
				stroke='#050505'
				strokeWidth='2'
				vectorEffect='non-scaling-stroke'
				initial={{ opacity: shouldReduceMotion ? 1 : 0, scale: shouldReduceMotion ? 1 : 0.4 }}
				whileInView={{ opacity: 1, scale: 1 }}
				viewport={{ once: true, amount: 0.4 }}
				transition={{ duration: 0.6, delay: delay + 1.9, ease: EASE_PREMIUM }}
			/>
		</svg>
	)
}
