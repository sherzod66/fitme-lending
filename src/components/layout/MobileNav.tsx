import clsx from 'clsx'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { LANGUAGES, NAV_SECTIONS } from '../../constants/nav'
import { EASE_PREMIUM } from '../ui/motion/easing'

type Props = {
	open: boolean
	onClose: () => void
	onNavigate: (id: string) => void
	/** Keeps the overlay logo row aligned with the header it replaces. */
	headerHeight: number
	showSections: boolean
	activeId: string | null
	storeLink: string
	accountTo: string
	accountLabel: string
}

export default function MobileNav({
	open,
	onClose,
	onNavigate,
	headerHeight,
	showSections,
	activeId,
	storeLink,
	accountTo,
	accountLabel
}: Props) {
	const { t, i18n } = useTranslation()
	const shouldReduceMotion = useReducedMotion()
	const current = i18n.resolvedLanguage ?? i18n.language ?? 'ru'

	useEffect(() => {
		if (!open) return

		const previousOverflow = document.body.style.overflow
		document.body.style.overflow = 'hidden'

		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') onClose()
		}
		document.addEventListener('keydown', onKeyDown)

		return () => {
			document.body.style.overflow = previousOverflow
			document.removeEventListener('keydown', onKeyDown)
		}
	}, [open, onClose])

	return (
		<AnimatePresence>
			{open && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.45, ease: EASE_PREMIUM }}
					className='grain fixed inset-0 z-[60] flex flex-col bg-ink lg:hidden'
				>
					<div
						style={{ height: headerHeight }}
						className='relative flex shrink-0 items-center justify-between px-5 sm:px-8'
					>
						<img
							src='/FitMe.png'
							alt='FIT.ME'
							className='h-6 w-auto object-contain'
						/>
						<button
							onClick={onClose}
							aria-label={t('nav.close')}
							className='relative h-9 w-9 text-white transition-colors duration-500 hover:text-accent'
						>
							<span className='absolute left-1/2 top-1/2 block h-px w-5 -translate-x-1/2 -translate-y-1/2 rotate-45 bg-current' />
							<span className='absolute left-1/2 top-1/2 block h-px w-5 -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-current' />
						</button>
					</div>

					<nav className='flex flex-1 flex-col justify-center px-5 sm:px-8'>
						{showSections &&
							NAV_SECTIONS.map((section, index) => (
								<motion.button
									key={section.id}
									initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 26 }}
									animate={{ opacity: 1, y: 0 }}
									transition={{
										duration: 0.7,
										delay: 0.12 + index * 0.07,
										ease: EASE_PREMIUM
									}}
									onClick={() => onNavigate(section.id)}
									className='group flex items-baseline gap-4 border-b border-ink-line py-5 text-left'
								>
									<span className='text-[10px] tracking-[0.2em] text-muted/60'>
										{String(index + 1).padStart(2, '0')}
									</span>
									<span
										className={clsx(
											'text-[clamp(1.9rem,9vw,2.75rem)] font-semibold uppercase leading-none tracking-tightest transition-colors duration-500',
											activeId === section.id
												? 'text-accent'
												: 'text-white group-hover:text-accent'
										)}
									>
										{t(section.labelKey)}
									</span>
								</motion.button>
							))}
					</nav>

					<motion.div
						initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7, delay: 0.4, ease: EASE_PREMIUM }}
						className='shrink-0 px-5 pb-10 sm:px-8'
					>
						<a
							href={storeLink}
							target='_blank'
							rel='noopener noreferrer'
							onClick={onClose}
							className='flex w-full items-center justify-center rounded-2xl bg-accent px-6 py-4 text-[15px] font-semibold text-white transition-colors duration-500 hover:bg-accent-soft'
						>
							{t('nav.downloadApp')}
						</a>

						<div className='mt-6 flex items-center justify-between'>
							<div className='flex items-center gap-4'>
								{LANGUAGES.map(language => (
									<button
										key={language.code}
										onClick={() => i18n.changeLanguage(language.code)}
										className={clsx(
											'text-[11px] uppercase tracking-[0.2em] transition-colors duration-500',
											current.startsWith(language.code)
												? 'text-accent'
												: 'text-muted hover:text-white'
										)}
									>
										{language.short}
									</button>
								))}
							</div>

							<Link
								to={accountTo}
								onClick={onClose}
								className='text-[11px] uppercase tracking-[0.2em] text-muted transition-colors duration-500 hover:text-white'
							>
								{accountLabel}
							</Link>
						</div>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
