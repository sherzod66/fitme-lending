import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { useProfile } from '../../../hooks/useProfile'
import { authService } from '../../../service/auth/auth.service'
import { userService } from '../../../service/user.service'
import { setUser, useAuth } from '../../../store/useAuth'
import { isActiveSubscription } from '../../../utils/subscription'

export const useProfilePage = () => {
	const navigate = useNavigate()
	const user = useAuth(store => store.user)
	const { profile, isLoading: isProfileLoading, isSuccess } = useProfile()

	useEffect(() => {
		if (isSuccess && profile) {
			setUser(profile)
		}
	}, [isSuccess, profile])

	const {
		data: subscription,
		isLoading: isSubscriptionLoading,
		isError: isSubscriptionError
	} = useQuery({
		queryKey: ['my-subscription'],
		queryFn: () => userService.getMySubscriptions(),
		select: data => data.data,
		retry: false
	})

	const hasActiveSubscription = !isSubscriptionError && isActiveSubscription(subscription)

	const onLogout = async () => {
		try {
			await authService.logout()
		} catch {
			/* ignore */
		}
		setUser(null)
		navigate('/auth')
	}

	return {
		user: profile || user,
		subscription: isSubscriptionError ? null : subscription,
		hasActiveSubscription,
		isLoading: isProfileLoading || isSubscriptionLoading,
		onLogout
	}
}
