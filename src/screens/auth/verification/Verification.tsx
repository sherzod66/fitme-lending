import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import type { Dispatch, SetStateAction } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from '../../../components/ui/Button.tsx/Button'
import { Field } from '../../../components/ui/field/Field'
import { saveTokenStorage } from '../../../service/auth/auth.helper'
import { authService } from '../../../service/auth/auth.service'
import { setUser } from '../../../store/useAuth'
import { TServerError } from '../../../types/error.types'
import type { TAuthWrapper } from '../Auth'

interface Props {
	setPage: Dispatch<SetStateAction<TAuthWrapper>>
	email: string
}
type TUserId = {
	code: string
}

export default function Verification({ setPage, email }: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<TUserId>({
		mode: 'onSubmit'
	})
	const { isPending, mutate } = useMutation({
		mutationKey: ['admin-login'],
		mutationFn: (body: { email: string; code: string }) => authService.verifyCode(body),
		onSuccess: response => {
			if (response.data.accessToken) {
				saveTokenStorage(response.data.accessToken)
				setUser(response.data)
			}
		},
		onError: (error: AxiosError<TServerError>) => {
			toast.error(`${error.response?.data.message}`)
		}
	})
	const onSubmit: SubmitHandler<TUserId> = data => {
		mutate({ email, code: data.code })
	}
	return (
		<div className='mt-8'>
			<div className='text-center mb-8'>
				<h1 className='text-2xl font-semibold text-white mb-2'>Подтверждение почты</h1>
				<p className='text-sm text-gray-300'>
					Мы отправили вам код подтверждения на {email}{' '}
					<button
						type='button'
						className='underline text-sm'
						onClick={() => setPage({ page: 'login', email: '' })}
					>
						Изменить почту
					</button>
				</p>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='space-y-8'
			>
				<Field
					label='Введите код подтверждения'
					registration={register('code', { required: 'Поле обязательно для заполнения' })}
					type='text'
					placeholder='Введите код'
					variant='client'
					error={errors.code?.message}
				/>
				<Button
					type='submit'
					loading={isPending}
					extra='w-full py-3 text-base font-medium'
					size='big'
					disabled={isPending}
				>
					Подтвердить
				</Button>
			</form>
		</div>
	)
}
