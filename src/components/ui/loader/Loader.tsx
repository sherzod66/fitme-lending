import cn from 'clsx'
import type { FC } from 'react'

import styles from './loader.module.css'

const Loader: FC<{ black?: boolean }> = ({ black }) => {
	return (
		<div className={styles.loading}>
			<div className={cn(styles.spinner, { [styles.black]: black })}></div>
		</div>
	)
}

export default Loader
