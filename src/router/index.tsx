import { createBrowserRouter } from 'react-router-dom'

import WrappedApp from '../App'
import ProtectedRoute from '../components/auth/ProtectedRoute'
import FeedbackForm from '../screens/DeleteAccount'
import PrivacyPolicy from '../screens/Policy'
import SubscriptionTerms from '../screens/SubscriptionTerms'
import Auth from '../screens/auth/Auth'
import Profile from '../screens/profile/Profile'
import PaymentMethods from '../screens/profile/payment-methods/PaymentMethods'
import Payments from '../screens/profile/payments/Payments'
import Subscribe from '../screens/profile/subscribe/Subscribe'
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
		element: <ProtectedRoute />,
		children: [
			{
				path: '/profile',
				element: <Profile />
			},
			{
				path: '/profile/payment-methods',
				element: <PaymentMethods />
			},
			{
				path: '/profile/payments',
				element: <Payments />
			},
			{
				path: '/profile/subscribe',
				element: <Subscribe />
			}
		]
	}
])
