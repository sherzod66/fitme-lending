import { ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

type Props = {
	to?: string
	label?: string
}

export default function BackLink({ to = '/profile', label = 'Назад' }: Props) {
	return (
		<Link
			to={to}
			className='inline-flex items-center gap-1 text-white text-sm font-semibold hover:opacity-80 transition'
		>
			<ChevronLeft className='size-6' />
			{label}
		</Link>
	)
}
