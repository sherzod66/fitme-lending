import { CalendarDays, CreditCard, LogOut } from 'lucide-react'

import { MenuAction, MenuLink } from './MenuRow'

type Props = {
	onLogout: () => void
}

export default function ProfileMenu({ onLogout }: Props) {
	return (
		<div className='bg-[#1c1c1e] rounded-[22px] p-[15px] flex flex-col gap-2.5 w-full'>
			<MenuLink
				to='/profile/payment-methods'
				icon={CreditCard}
				label='Способ оплаты'
			/>
			<MenuLink
				to='/profile/payments'
				icon={CalendarDays}
				label='История платежей'
			/>
			<MenuAction
				icon={LogOut}
				label='Выйти'
				danger
				onClick={onLogout}
			/>
		</div>
	)
}
