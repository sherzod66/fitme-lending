import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

import { getAccessToken } from '../../service/auth/auth.helper'
import { LanguageSwitcher } from '../LanguageSwitcher'

type Props = {
	accountMode?: boolean
}

export default function Header({ accountMode }: Props) {
	const { t } = useTranslation()
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const isAuthed = !!getAccessToken()
	const accountTo = isAuthed || accountMode ? '/profile' : '/auth'
	const accountLabel = isAuthed || accountMode ? 'Аккаунт' : 'Авторизация'

	const scrollToSection = (id: string) => {
		const element = document.getElementById(id)
		element?.scrollIntoView({ behavior: 'smooth' })
		setIsMenuOpen(false)
	}

	return (
		<header className='fixed w-full z-50 bg-black/95 border-b border-red-800'>
			<nav className='max-w-7xl mx-auto px-4 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					<Link
						to='/'
						className='block w-36 h-14 p-2'
					>
						<img
							className='object-contain'
							src='/FitMe.png'
							alt=''
						/>
					</Link>

					<div className='hidden md:flex items-center gap-8'>
						<button
							onClick={() => scrollToSection('features')}
							className='text-gray-300 hover:text-red-500 transition'
						>
							{t('nav.features')}
						</button>
						<button
							onClick={() => scrollToSection('subscription')}
							className='text-gray-300 hover:text-red-500 transition'
						>
							{t('nav.subscription')}
						</button>
						<button
							onClick={() => scrollToSection('roles')}
							className='text-gray-300 hover:text-red-500 transition'
						>
							{t('nav.forEveryone')}
						</button>
						<LanguageSwitcher />
						<Link
							to={accountTo}
							className='bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-3xl transition'
						>
							{accountLabel}
						</Link>
					</div>

					<button
						className='md:hidden text-gray-300 hover:text-white'
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
					</button>
				</div>

				{isMenuOpen && (
					<div className='md:hidden py-4 border-t border-red-800'>
						<div className='flex flex-col gap-4'>
							<button
								onClick={() => scrollToSection('features')}
								className='text-gray-300 hover:text-red-500 transition'
							>
								{t('nav.features')}
							</button>
							<button
								onClick={() => scrollToSection('subscription')}
								className='text-gray-300 hover:text-red-500 transition'
							>
								{t('nav.subscription')}
							</button>
							<button
								onClick={() => scrollToSection('roles')}
								className='text-gray-300 hover:text-red-500 transition'
							>
								{t('nav.forEveryone')}
							</button>
							<LanguageSwitcher />
							<Link
								className='bg-red-600 hover:bg-red-700 text-white p-2 rounded transition text-center'
								to={accountTo}
							>
								{accountLabel}
							</Link>
						</div>
					</div>
				)}
			</nav>
		</header>
	)
}
