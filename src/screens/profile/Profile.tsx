import { useNavigate } from 'react-router-dom'

import ActiveSubscriptionCard from '../../components/profile/ActiveSubscriptionCard'
import EmptySubscriptionCard from '../../components/profile/EmptySubscriptionCard'
import ProfileMenu from '../../components/profile/ProfileMenu'
import ProfileShell from '../../components/profile/ProfileShell'
import ProfileUserHeader from '../../components/profile/ProfileUserHeader'
import Loading from '../../components/ui/loader/loading'

import { useProfilePage } from './hooks/useProfilePage'

export default function Profile() {
	const navigate = useNavigate()
	const { user, subscription, hasActiveSubscription, isLoading, onLogout } = useProfilePage()

	return (
		<ProfileShell>
			{isLoading || !user ? (
				<div className='py-16 flex justify-center'>
					<Loading />
				</div>
			) : (
				<>
					<ProfileUserHeader user={user} />
					{hasActiveSubscription && subscription ? (
						<ActiveSubscriptionCard
							subscription={subscription}
							onManage={() => navigate('/profile/payment-methods')}
						/>
					) : (
						<EmptySubscriptionCard />
					)}
					<ProfileMenu onLogout={onLogout} />
				</>
			)}
		</ProfileShell>
	)
}
