import { Navigate, Outlet, useLocation } from 'react-router-dom'

import { getAccessToken } from '../../service/auth/auth.helper'

export default function ProtectedRoute() {
	const location = useLocation()
	const token = getAccessToken()

	if (!token) {
		return (
			<Navigate
				to='/auth'
				replace
				state={{ from: location.pathname }}
			/>
		)
	}

	return <Outlet />
}
