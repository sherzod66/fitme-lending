import { ChevronRight, LucideIcon } from 'lucide-react'
import { Link } from 'react-router-dom'

type LinkProps = {
	to: string
	icon: LucideIcon
	label: string
	danger?: boolean
}

export function MenuLink({ to, icon: Icon, label, danger }: LinkProps) {
	return (
		<Link
			to={to}
			className='flex items-start justify-between py-[5px] w-full border-b border-[#505050] hover:opacity-80 transition'
		>
			<div className='flex gap-2.5 items-start'>
				<Icon
					className={`size-6 shrink-0 ${danger ? 'text-[#d70c0c]' : 'text-white'}`}
					strokeWidth={1.75}
				/>
				<span className={`text-sm ${danger ? 'text-[#d70c0c]' : 'text-white'}`}>{label}</span>
			</div>
			<ChevronRight
				className='size-6 text-white shrink-0'
				strokeWidth={1.75}
			/>
		</Link>
	)
}

type ActionProps = {
	icon: LucideIcon
	label: string
	onClick: () => void
	danger?: boolean
}

export function MenuAction({ icon: Icon, label, onClick, danger }: ActionProps) {
	return (
		<button
			type='button'
			onClick={onClick}
			className='flex items-start justify-between py-[5px] w-full border-b border-[#505050] hover:opacity-80 transition text-left'
		>
			<div className='flex gap-2.5 items-start'>
				<Icon
					className={`size-6 shrink-0 ${danger ? 'text-[#d70c0c]' : 'text-white'}`}
					strokeWidth={1.75}
				/>
				<span className={`text-sm ${danger ? 'text-[#d70c0c]' : 'text-white'}`}>{label}</span>
			</div>
		</button>
	)
}
