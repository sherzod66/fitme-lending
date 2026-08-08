import { createBrowserRouter } from 'react-router-dom'

import WrappedApp from '../App'
import FeedbackForm from '../screens/DeleteAccount'
import PrivacyPolicy from '../screens/Policy'
import SubscriptionTerms from '../screens/SubscriptionTerms'
import Auth from '../screens/auth/Auth'
import Profile from '../screens/profile/Profile'
import Stats from '../screens/stats/Stats'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <WrappedApp />
	},
	{
		path: '/auth',
		element: <Auth />
	},
	{
		path: '/policy',
		element: <PrivacyPolicy />
	},
	{
		path: '/subscription-terms',
		element: <SubscriptionTerms />
	},
	{
		path: '/delete-account',
		element: <FeedbackForm />
	},
	{
		path: '/stats',
		element: <Stats />
	},
	{
		path: '/profile',
		element: <Profile />
	}
])
