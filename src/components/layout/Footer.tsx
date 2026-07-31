import { Mail } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export default function Footer() {
	const { t } = useTranslation()
	return (
		<footer className='py-12 px-4 lg:px-8 bg-zinc-950'>
			<div className='max-w-7xl mx-auto'>
				<div className='flex flex-col md:flex-row justify-between items-center gap-8'>
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
					<div className='flex gap-6'>
						<a
							href='mailto:info@fitme.uz'
							className='text-gray-400 hover:text-red-500 transition'
						>
							<Mail className='w-6 h-6' />
						</a>
						{/* <a
						href="#"
						className="text-gray-400 hover:text-red-500 transition"
					>
						<Instagram className="w-6 h-6" />
					</a>
					<a
						href="#"
						className="text-gray-400 hover:text-red-500 transition"
					>
						<Facebook className="w-6 h-6" />
					</a>
					<a
						href="#"
						className="text-gray-400 hover:text-red-500 transition"
					>
						<Twitter className="w-6 h-6" />
					</a> */}
					</div>
				</div>
				<div className='mt-8 text-center text-gray-400'>
					<p>{t('footer.rights')}</p>
				</div>
			</div>
		</footer>
	)
}
