import { User } from 'lucide-react'

import { IUser } from '../../types/user.types'

type Props = {
	user: IUser
}

export default function ProfileUserHeader({ user }: Props) {
	return (
		<div className='flex flex-col items-center gap-[5px] py-5 w-full'>
			{user.avatar ? (
				<img
					src={user.avatar}
					alt={user.name}
					className='size-[60px] rounded-full object-cover bg-[#2a2a2a]'
				/>
			) : (
				<div className='size-[60px] rounded-full bg-[#2a2a2a] flex items-center justify-center'>
					<User
						className='size-8 text-[#8e8e8e]'
						strokeWidth={1.5}
					/>
				</div>
			)}
			<p className='text-white text-xs font-medium'>{user.name}</p>
			<p className='text-[#ddded8] text-[10.5px] text-center'>{user.email}</p>
		</div>
	)
}
