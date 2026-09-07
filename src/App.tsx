import { Suspense } from 'react'

import Layout from './components/layout/Layout'
import Diary from './components/sections/Diary'
import Download from './components/sections/Download'
import Hero from './components/sections/Hero'
import Nutrition from './components/sections/Nutrition'
import Progress from './components/sections/Progress'
import Results from './components/sections/Results'
import Training from './components/sections/Training'
import SubscriptionSection from './components/subscription/SubscriptionSection'

function App() {
	return (
		<div className='min-h-screen bg-ink text-white'>
			<Hero />
			<Results />
			<Training />
			<Progress />
			<Nutrition />
			<Diary />
			<SubscriptionSection />
			<Download />
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
