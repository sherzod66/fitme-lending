import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

import { Button } from '../../components/ui/Button.tsx/Button'
import { useProfile } from '../../hooks/useProfile'
import { authService } from '../../service/auth/auth.service'
import { setUser, useAuth } from '../../store/useAuth'
import { TServerError } from '../../types/error.types'

export default function Profile() {
	const { profile, isLoading, isSuccess } = useProfile()
	const user = useAuth(store => store.user)
	const navigate = useNavigate()
	const { mutate: logout } = useMutation({
		mutationFn: () => authService.logout(),
		onSuccess: () => {
			navigate('/auth')
		},
		onError: (error: AxiosError<TServerError>) => {
			toast.error(`${error.response?.data.message}`)
		}
	})

	useEffect(() => {
		if (isSuccess && profile) {
			setUser(profile)
		}
	}, [profile])

	return (
		<div>
			{isLoading ? <div>Loading...</div> : <div>{user?.name}</div>}
			<Button onClick={() => logout()}>Logout</Button>
		</div>
	)
}
