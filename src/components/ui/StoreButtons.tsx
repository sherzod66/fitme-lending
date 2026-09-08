import clsx from 'clsx'
import { useTranslation } from 'react-i18next'

import { STORES } from '../../constants/stores'
import type { StorePlatform } from '../../constants/stores'
import { usePlatform } from '../../hooks/useStoreLink'

type Props = {
	className?: string
}

/**
 * The page's main action: both stores, side by side. The one matching the
 * visitor's device is listed first and filled red, so the choice is already
 * made for them while the other store stays one click away.
 */
export default function StoreButtons({ className }: Props) {
	const { t } = useTranslation()
	const platform = usePlatform()

	const order: StorePlatform[] = platform === 'ios' ? ['ios', 'android'] : ['android', 'ios']

	return (
		<div
			className={clsx('flex flex-col gap-3 sm:flex-row sm:justify-center font-premium', className)}
		>
			{order.map((key, index) => {
				const store = STORES[key]

				return (
					<a
						key={key}
						href={store.href}
						target='_blank'
						rel='noopener noreferrer'
						className={clsx(
							'inline-flex items-center justify-center gap-3 rounded-2xl px-7 py-4 text-[15px] font-semibold transition-colors duration-500 ease-premium',
							index === 0
								? 'bg-accent text-white hover:bg-accent-soft'
								: 'border border-ink-line bg-ink-card/70 text-white backdrop-blur-md hover:border-white/20'
						)}
					>
						<svg
							viewBox='0 0 24 24'
							fill='currentColor'
							aria-hidden='true'
							className='h-5 w-5'
						>
							<path d={store.glyph} />
						</svg>
						{t(store.labelKey)}
					</a>
				)
			})}
		</div>
	)
}
