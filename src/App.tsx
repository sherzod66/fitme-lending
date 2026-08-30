import { Brain, Dumbbell, LineChart, PersonStanding, Users, Utensils, Video } from 'lucide-react'
import { Suspense } from 'react'
import { useTranslation } from 'react-i18next'

import Layout from './components/layout/Layout'
import Hero from './components/sections/Hero'
import Nutrition from './components/sections/Nutrition'
import Progress from './components/sections/Progress'
import Training from './components/sections/Training'
import SubscriptionSection from './components/subscription/SubscriptionSection'
import { android_link, ios_link } from './constants/constants'

function App() {
	const { t } = useTranslation()

	return (
		<div className='min-h-screen bg-ink text-white'>
			<Hero />
			<Training />
			<Progress />
			<Nutrition />

			{/* Features Section */}
			<section
				id='features'
				className='py-20 px-4 lg:px-8 bg-zinc-950'
			>
				<div className='max-w-7xl mx-auto'>
					<h2 className='text-3xl md:text-4xl font-bold text-center mb-16'>
						{t('features.title')}
					</h2>
					<div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
						{[
							{
								icon: <Users className='w-8 h-8 text-red-500' />,
								titleKey: 'features.trainers.title',
								descriptionKey: 'features.trainers.description'
							},
							{
								icon: <LineChart className='w-8 h-8 text-red-500' />,
								titleKey: 'features.tracking.title',
								descriptionKey: 'features.tracking.description'
							},
							{
								icon: <PersonStanding className='w-8 h-8 text-red-500' />,
								titleKey: 'features.measurements.title',
								descriptionKey: 'features.measurements.description'
							},
							{
								icon: <Video className='w-8 h-8 text-red-500' />,
								titleKey: 'features.library.title',
								descriptionKey: 'features.library.description'
							},
							{
								icon: <Utensils className='w-8 h-8 text-red-500' />,
								titleKey: 'features.nutrition.title',
								descriptionKey: 'features.nutrition.description'
							},
							{
								icon: <Dumbbell className='w-8 h-8 text-red-500' />,
								titleKey: 'features.workouts.title',
								descriptionKey: 'features.workouts.description'
							}
						].map((feature, index) => (
							<div
								key={index}
								className='bg-black border border-red-900/20 p-6 rounded-lg hover:border-red-900 transition'
							>
								<div className='mb-4'>{feature.icon}</div>
								<h3 className='text-xl font-semibold mb-2'>{t(feature.titleKey)}</h3>
								<p className='text-gray-400'>{t(feature.descriptionKey)}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			<SubscriptionSection />

			{/* User Roles Section */}
			<section
				id='roles'
				className='py-20 px-4 lg:px-8'
			>
				<div className='max-w-7xl mx-auto'>
					<h2 className='text-3xl md:text-4xl font-bold text-center mb-16'>{t('roles.title')}</h2>
					<div className='grid md:grid-cols-3 gap-8'>
						{[
							{
								titleKey: 'roles.beginners.title',
								descriptionKey: 'roles.beginners.description',
								icon: <Brain className='w-12 h-12 text-red-400' />
							},
							{
								titleKey: 'roles.advanced.title',
								descriptionKey: 'roles.advanced.description',
								icon: <Dumbbell className='w-12 h-12 text-red-500' />
							},
							{
								titleKey: 'roles.trainers.title',
								descriptionKey: 'roles.trainers.description',
								icon: <Users className='w-12 h-12 text-red-600' />
							}
						].map((role, index) => (
							<div
								key={index}
								className='text-center p-6'
							>
								<div className='flex justify-center mb-4'>{role.icon}</div>
								<h3 className='text-xl font-semibold mb-2'>{t(role.titleKey)}</h3>
								<p className='text-gray-400'>{t(role.descriptionKey)}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className='py-20 px-4 lg:px-8 bg-gradient-to-r from-red-950 to-black'>
				<div className='max-w-4xl mx-auto text-center'>
					<h2 className='text-3xl md:text-4xl font-bold mb-6'>{t('cta.title')}</h2>
					<p className='text-xl text-gray-300 mb-8'>{t('cta.subtitle')}</p>
					<div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
						{/* Google Play кнопка */}
						<a
							href={android_link}
							target='_blank'
							rel='noopener noreferrer'
							className='inline-block'
						>
							<div className='flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105'>
								<svg
									className='w-6 h-6'
									viewBox='0 0 24 24'
									fill='currentColor'
								>
									<path d='M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z' />
								</svg>
								<span className='font-semibold'>Google Play</span>
							</div>
						</a>

						{/* App Store кнопка */}
						<a
							href={ios_link}
							target='_blank'
							rel='noopener noreferrer'
							className='inline-block'
						>
							<div className='flex items-center gap-2 bg-white text-black hover:bg-gray-200 px-6 py-3 rounded-lg transition-all duration-300 transform hover:scale-105'>
								<svg
									className='w-6 h-6'
									viewBox='0 0 24 24'
									fill='currentColor'
								>
									<path d='M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z' />
								</svg>
								<span className='font-semibold'>App Store</span>
							</div>
						</a>

						<button className='bg-transparent border-2 border-red-500 text-red-500 px-8 py-3 rounded-lg hover:bg-red-500 hover:text-white transition'>
							{t('cta.becomeTrainer')}
						</button>
					</div>
				</div>
			</section>
		</div>
	)
}

export default function WrappedApp() {
	return (
		<Suspense
			fallback={
				<div className='h-screen w-screen flex items-center justify-center bg-black text-white'>
					Loading...
				</div>
			}
		>
			<Layout>
				<App />
			</Layout>
		</Suspense>
	)
}
