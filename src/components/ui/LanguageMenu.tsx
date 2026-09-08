import clsx from 'clsx'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LANGUAGES } from '../../constants/nav'

import { EASE_PREMIUM } from './motion/easing'

type Props = {
	className?: string
}

export default function LanguageMenu({ className }: Props) {
	const { i18n } = useTranslation()
	const [isOpen, setIsOpen] = useState(false)
	const containerRef = useRef<HTMLDivElement>(null)

	const current = i18n.resolvedLanguage ?? i18n.language ?? 'uz'
	const active = LANGUAGES.find(language => current.startsWith(language.code)) ?? LANGUAGES[0]

	useEffect(() => {
		if (!isOpen) return

		const onPointerDown = (event: PointerEvent) => {
			if (!containerRef.current?.contains(event.target as Node)) setIsOpen(false)
		}
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') setIsOpen(false)
		}

		document.addEventListener('pointerdown', onPointerDown)
		document.addEventListener('keydown', onKeyDown)

		return () => {
			document.removeEventListener('pointerdown', onPointerDown)
			document.removeEventListener('keydown', onKeyDown)
		}
	}, [isOpen])

	return (
		<div
			ref={containerRef}
			className={clsx('relative', className)}
		>
			<button
				onClick={() => setIsOpen(open => !open)}
				aria-haspopup='listbox'
				aria-expanded={isOpen}
				className='text-[11px] uppercase tracking-[0.2em] text-white/60 transition-colors duration-500 hover:text-accent'
			>
				{active.short}
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.ul
						initial={{ opacity: 0, y: -6 }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: -6 }}
						transition={{ duration: 0.35, ease: EASE_PREMIUM }}
						role='listbox'
						className='absolute right-0 top-full mt-4 min-w-[132px] overflow-hidden rounded-xl border border-ink-line bg-ink-card/95 py-1.5 backdrop-blur-xl'
					>
						{LANGUAGES.map(language => (
							<li key={language.code}>
								<button
									role='option'
									aria-selected={language.code === active.code}
									onClick={() => {
										i18n.changeLanguage(language.code)
										setIsOpen(false)
									}}
									className={clsx(
										'block w-full px-4 py-2 text-left text-sm transition-colors duration-300',
										language.code === active.code
											? 'text-accent'
											: 'text-muted hover:text-white'
									)}
								>
									{language.name}
								</button>
							</li>
						))}
					</motion.ul>
				)}
			</AnimatePresence>
		</div>
	)
}
