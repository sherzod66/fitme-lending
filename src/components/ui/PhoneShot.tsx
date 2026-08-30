import clsx from 'clsx'

/** Placeholder device render. Swap this file's constant for the real shots. */
const SRC = '/images/screen.png'
const NATURAL_WIDTH = 1242
const NATURAL_HEIGHT = 2688

type Props = {
	/** Sizing is left to the caller: set a width or a height, never both. */
	className?: string
	alt?: string
	loading?: 'eager' | 'lazy'
}

export default function PhoneShot({ className, alt = 'FIT.ME', loading = 'lazy' }: Props) {
	return (
		<img
			src={SRC}
			alt={alt}
			width={NATURAL_WIDTH}
			height={NATURAL_HEIGHT}
			loading={loading}
			draggable={false}
			// The PNG ships its own device frame on transparent margins, so the
			// shadow follows the silhouette instead of a rectangle.
			className={clsx(
				'select-none object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.75)]',
				className
			)}
		/>
	)
}
