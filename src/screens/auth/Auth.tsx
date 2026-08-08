import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Header from '../../components/layout/Header'
import { useAuth } from '../../store/useAuth'

import Login from './login/Login'
import Register from './register/Register'
import Verification from './verification/Verification'

export type TAuthWrapper = {
	page: 'login' | 'examination-key' | 'registration'
	email: string
}

const Auth = () => {
	const user = useAuth(store => store.user)
	const navigate = useNavigate()
	useEffect(() => {
		if (user) {
			navigate('/profile')
		}
	}, [user])
	const [page, setPage] = useState<TAuthWrapper>({
		page: 'login',
		email: ''
	})

	return (
		<>
			<Header />
			<main className='w-full h-screen flex flex-col justify-center items-center bg-black px-4 gap-5'>
				<div className='bg-[#151515] w-full max-w-sm animate-scale p-8 rounded-3xl'>
					<div className='flex justify-center items-center'>
						<img
							draggable={false}
							src='/images/Logo.png'
							alt='FIT.ME'
						/>
					</div>
					{page.page === 'login' && <Login setPage={setPage} />}
					{page.page === 'registration' && <Register setPage={setPage} />}
					{page.page === 'examination-key' && (
						<Verification
							email={page.email}
							setPage={setPage}
						/>
					)}
				</div>
			</main>
		</>
	)
}

export default Auth
