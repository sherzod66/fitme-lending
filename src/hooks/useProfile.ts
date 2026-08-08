import { useQuery } from '@tanstack/react-query'

import { userService } from '../service/user.service'

export function useProfile() {
	const { data, isLoading, isSuccess, refetch } = useQuery({
		queryKey: ['profile'],
		queryFn: () => userService.getProfile(),
		select: data => data.data,
		refetchInterval: 1800000
	})
	return { profile: data, isLoading, isSuccess, refetch }
}
