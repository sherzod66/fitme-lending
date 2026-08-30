import { useMemo } from 'react'

import { android_link, ios_link } from '../constants/constants'

/** Points the single download CTA at the store matching the visitor's device. */
export function useStoreLink() {
	return useMemo(() => {
		if (typeof navigator === 'undefined') return android_link

		const ua = navigator.userAgent
		const isIpadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1
		const isApple = /iPhone|iPad|iPod|Macintosh/.test(ua) || isIpadOS

		return isApple ? ios_link : android_link
	}, [])
}
