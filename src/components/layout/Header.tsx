import clsx from 'clsx'
import { motion, useMotionValueEvent, useReducedMotion, useScroll } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useLocation } from 'react-router-dom'

import { NAV_SECTIONS } from '../../constants/nav'
import { useActiveSection } from '../../hooks/useActiveSection'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { useStoreLink } from '../../hooks/useStoreLink'
import { getAccessToken } from '../../service/auth/auth.helper'
import LanguageMenu from '../ui/LanguageMenu'
import { EASE_PREMIUM } from '../ui/motion/easing'

import MobileNav from './MobileNav'

const SECTION_IDS = NAV_SECTIONS.map(section => section.id)

type Props = {
	accountMode?: boolean
}

export default function Header({ accountMode }: Props) {
	const { t } = useTranslation()
	const { pathname } = useLocation()
	const { scrollY } = useScroll()

	const [isScrolled, setIsScrolled] = useState(false)
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const shouldReduceMotion = useReducedMotion()
	const isDesktop = useMediaQuery('(min-width: 1024px)')
	const isLanding = !accountMode && pathname === '/'
	const activeId = useActiveSection(SECTION_IDS, isLanding)
	const storeLink = useStoreLink()

	const isAuthed = !!getAccessToken()
	const accountTo = isAuthed || accountMode ? '/profile' : '/auth'
	const accountLabel = isAuthed || accountMode ? t('nav.account') : t('nav.login')

	useMotionValueEvent(scrollY, 'change', (value: number) => setIsScrolled(value > 24))

	// The overlay is mobile-only, so it must not stay mounted across a resize.
	useEffect(() => {
		if (isDesktop) setIsMenuOpen(false)
	}, [isDesktop])

	// Interior pages never get the tall variant, their content starts right below.
	const isCompact = isScrolled || !isLanding
	const height = isDesktop ? (isCompact ? 68 : 92) : isCompact ? 56 : 68

	const scrollToSection = (id: string) => {
		document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
		setIsMenuOpen(false)
	}

	return (
		<>
			<motion.header
				initial={false}
				animate={{ height }}
				transition={{ duration: shouldReduceMotion ? 0 : 0.6, ease: EASE_PREMIUM }}
				className='fixed inset-x-0 top-0 z-50 font-premium'
			>
				<motion.div
					initial={false}
					animate={{ opacity: isCompact ? 1 : 0 }}
					transition={{ duration: 0.5, ease: EASE_PREMIUM }}
					className='absolute inset-0 border-b border-ink-line bg-ink/70 backdrop-blur-xl'
				/>

				<div className='relative mx-auto flex h-full max-w-edge items-center justify-between gap-6 px-5 sm:px-8 lg:px-14'>
					<Link
						to='/'
						className='shrink-0'
					>
						<img
							src='/FitMe.png'
							alt='FIT.ME'
							className='h-6 w-auto object-contain lg:h-7'
						/>
					</Link>

					{isLanding && (
						<nav className='absolute left-1/2 hidden -translate-x-1/2 items-center gap-9 lg:flex'>
							{NAV_SECTIONS.map(section => (
								<button
									key={section.id}
									onClick={() => scrollToSection(section.id)}
									className={clsx(
										'relative text-[12px] uppercase tracking-[0.2em] transition-colors duration-500',
										activeId === section.id ? 'text-accent' : 'text-white/65 hover:text-accent'
									)}
								>
									{t(section.labelKey)}
									{activeId === section.id && (
										<motion.span
											layoutId='header-active-section'
											className='absolute -bottom-2 left-0 h-px w-full bg-accent'
											transition={{ duration: 0.5, ease: EASE_PREMIUM }}
										/>
									)}
								</button>
							))}
						</nav>
					)}

					<div className='flex items-center gap-5 lg:gap-7'>
						<LanguageMenu className='hidden lg:block' />

						{isLanding ? (
							<a
								href={storeLink}
								target='_blank'
								rel='noopener noreferrer'
								className='hidden rounded-full bg-accent px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.12em] text-white transition-colors duration-500 hover:bg-accent-soft lg:inline-flex'
							>
								{t('nav.downloadApp')}
							</a>
						) : (
							<Link
								to={accountTo}
								className='hidden text-[12px] uppercase tracking-[0.2em] text-white/65 transition-colors duration-500 hover:text-accent lg:inline-flex'
							>
								{accountLabel}
							</Link>
						)}

						<button
							onClick={() => setIsMenuOpen(true)}
							aria-label={t('nav.menu')}
							className='group flex items-center gap-3 lg:hidden'
						>
							<span className='hidden text-[11px] uppercase tracking-[0.2em] text-white/65 transition-colors duration-500 group-hover:text-accent sm:block'>
								{t('nav.menu')}
							</span>
							<span className='flex w-6 flex-col items-end gap-[6px]'>
								<span className='block h-px w-full bg-white transition-colors duration-500 group-hover:bg-accent' />
								<span className='block h-px w-2/3 bg-white transition-all duration-500 group-hover:w-full group-hover:bg-accent' />
							</span>
						</button>
					</div>
				</div>
			</motion.header>

			<MobileNav
				open={isMenuOpen}
				onClose={() => setIsMenuOpen(false)}
				onNavigate={scrollToSection}
				headerHeight={height}
				showSections={isLanding}
				activeId={activeId}
				storeLink={storeLink}
				accountTo={accountTo}
				accountLabel={accountLabel}
			/>
		</>
	)
}
