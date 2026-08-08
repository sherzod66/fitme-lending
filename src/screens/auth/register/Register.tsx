import { useMutation } from '@tanstack/react-query'
import { AxiosError } from 'axios'
import type { Dispatch, SetStateAction } from 'react'
import { type SubmitHandler, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { Link } from 'react-router-dom'

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
	name: string
}

export default function Register({ setPage }: Props) {
	const {
		register,
		handleSubmit,
		formState: { errors }
	} = useForm<TUserId>({
		mode: 'onSubmit'
	})
	const { isPending, mutate } = useMutation({
		mutationKey: ['admin-login'],
		mutationFn: (body: { email: string; name: string }) => authService.register(body),
		onSuccess: data => setPage({ page: 'examination-key', email: data.data.email }),
		onError: (error: AxiosError<TServerError>) => {
			toast.error(`${error.response?.data.message}`)
		}
	})
	const onSubmit: SubmitHandler<TUserId> = data => {
		mutate(data)
	}
	return (
		<div className='mt-8'>
			<div className='text-center mb-8'>
				<h1 className='text-2xl font-semibold text-white mb-2'>Регстрация</h1>
			</div>
			<form
				onSubmit={handleSubmit(onSubmit)}
				className='space-y-4'
			>
				<Field
					label='Как вас зовут?'
					registration={register('name', { required: 'Поле обязательно для заполнения' })}
					type='text'
					placeholder='Как вас зовут?'
					variant='client'
					error={errors.name?.message}
				/>
				<Field
					label='Введите вашу почту'
					registration={register('email', { required: 'Поле обязательно для заполнения' })}
					type='email'
					placeholder='Введите вашу почту'
					variant='client'
					error={errors.email?.message}
				/>
				<Link
					to='/policy'
					className='block text-center text-gray-500 underline text-sm'
				>
					Регистрируясь, вы принимаете наши Правила и условия
				</Link>
				<Button
					type='submit'
					loading={isPending}
					extra='w-full text-base font-medium'
					size='big'
					disabled={isPending}
				>
					Зарегистрироваться
				</Button>
			</form>
			<h3 className='text-center text-gray-300 mt-8'>Если у вас уже есть аккаунт</h3>
			<Button
				type='button'
				size='big'
				variant='secondary'
				extra='w-full mt-2 text-base font-medium'
				onClick={() => setPage({ page: 'login', email: '' })}
			>
				Войти
			</Button>
		</div>
	)
}
