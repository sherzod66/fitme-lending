import cn from 'clsx'

import styles from './loading.module.css'

export default function Loading({ isTransparent = true }: { isTransparent?: boolean }) {
	return (
		<div className={cn(styles.loading, isTransparent && styles.transparent)}>
			<span className={styles.loader}></span>
		</div>
	)
}
