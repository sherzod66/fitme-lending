import { ReactNode } from 'react'

import Header from '../layout/Header'

type Props = {
	children: ReactNode
	className?: string
}

export default function ProfileShell({ children, className = '' }: Props) {
	return (
		<>
			<Header accountMode />
			<main className='min-h-screen w-full bg-black px-4 pb-10 pt-24 flex justify-center'>
				<div
					className={`bg-[#151515] w-full max-w-sm rounded-[30px] p-5 flex flex-col gap-5 h-fit ${className}`}
				>
					{children}
				</div>
			</main>
		</>
	)
}
