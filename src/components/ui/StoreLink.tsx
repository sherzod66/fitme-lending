import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { STORES } from '../../constants/stores'
import type { StorePlatform } from '../../constants/stores'

type Props = {
	platform: StorePlatform
	className?: string
}

/** Secondary store option: glyph plus name, deliberately never a big badge. */
export default function StoreLink({ platform, className }: Props) {
	const { t } = useTranslation()
	const store = STORES[platform]

	return (
		<a
			href={store.href}
			target='_blank'
			rel='noopener noreferrer'
			className={clsx(
				'inline-flex items-center gap-2.5 text-[13px] text-muted transition-colors duration-500 ease-premium hover:text-white',
				className
			)}
		>
			<svg
				viewBox='0 0 24 24'
				fill='currentColor'
				aria-hidden='true'
				className='h-[17px] w-[17px]'
			>
				<path d={store.glyph} />
			</svg>
			{t(store.labelKey)}
		</a>
	)
}
