import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { LanguageSwitcher } from '../LanguageSwitcher'

export default function Header() {
	const { t } = useTranslation()
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	const scrollToSection = (id: string) => {
		const element = document.getElementById(id)
		element?.scrollIntoView({ behavior: 'smooth' })
		setIsMenuOpen(false)
	}

	return (
		<header className='fixed w-full z-50 bg-black/95 border-b border-red-800'>
			<nav className='max-w-7xl mx-auto px-4 lg:px-8'>
				<div className='flex justify-between items-center h-16'>
					<a
						href='#'
						className='block w-36 h-14 p-2'
					>
						<img
							className='object-contain'
							src='/FitMe.png'
							alt=''
						/>
					</a>

					{/* Desktop Navigation */}
					<div className='hidden md:flex items-center gap-8'>
						<button
							onClick={() => scrollToSection('features')}
							className='text-gray-300 hover:text-red-500 transition'
						>
							{t('nav.features')}
						</button>
						<button
							onClick={() => scrollToSection('roles')}
							className='text-gray-300 hover:text-red-500 transition'
						>
							{t('nav.forEveryone')}
						</button>
						<LanguageSwitcher />
						<button
							className='bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-3xl transition'
							type='button'
						>
							Авторизация
						</button>
					</div>

					{/* Mobile Menu Button */}
					<button
						className='md:hidden text-gray-300 hover:text-white'
						onClick={() => setIsMenuOpen(!isMenuOpen)}
					>
						{isMenuOpen ? <X className='w-6 h-6' /> : <Menu className='w-6 h-6' />}
					</button>
				</div>

				{/* Mobile Navigation */}
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
								onClick={() => scrollToSection('roles')}
								className='text-gray-300 hover:text-red-500 transition'
							>
								{t('nav.forEveryone')}
							</button>
							<LanguageSwitcher />
							<button
								className='bg-red-600 hover:bg-red-700 text-white p-2 rounded transition'
								type='button'
							>
								Авторизация
							</button>
						</div>
					</div>
				)}
			</nav>
		</header>
	)
}
