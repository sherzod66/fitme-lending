import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import type { Dispatch, SetStateAction } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

import { Button } from '../../../components/ui/Button.tsx/Button'
import { Field } from '../../../components/ui/field/Field'
import { authService } from '../../../service/auth/auth.service'
import { TServerError } from '../../../types/error.types'
import type { TAuthWrapper } from '../Auth'

interface Props {
	setPage: Dispatch<SetStateAction<TAuthWrapper>>
}
type TUserId = {
	email: string
}

export default function Login({ setPage }: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<TUserId>({
		mode: 'onSubmit'
	})
	const { isPending, mutate } = useMutation({
		mutationKey: ['admin-login'],
		mutationFn: (email: string) => authService.login(email),
		onSuccess: data => setPage({ page: 'examination-key', email: data.data.email }),
		onError: (error: AxiosError<TServerError>) => {
			toast.error(`${error.response?.data.message}`)
		}
	})
	const onSubmit: SubmitHandler<TUserId> = data => {
		mutate(data.email)
	}
	return (
		<div className='mt-8'>
			<div className='text-center mb-8'>
				<h1 className='text-2xl font-semibold text-white mb-2'>Вход в аккаунт</h1>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='space-y-8'
			>
				<Field
					label='Введите вашу почту'
					registration={register('email', { required: 'Поле обязательно для заполнения' })}
					type='email'
					placeholder='Введите вашу почту'
					variant='client'
					error={errors.email?.message}
				/>
				<Button
					type='submit'
					loading={isPending}
					extra='w-full py-3 text-base font-medium'
					size='big'
					disabled={isPending}
				>
					Войти
				</Button>
			</form>
			<Button
				type='button'
				size='big'
				variant='secondary'
				extra='w-full mt-8 text-base font-medium'
				onClick={() => setPage({ page: 'registration', email: '' })}
			>
				Регистрация
			</Button>
		</div>
	)
}
