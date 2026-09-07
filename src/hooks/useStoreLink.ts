import { useMemo } from 'react'

import { STORES } from '../constants/stores'
import type { StorePlatform } from '../constants/stores'

/** Which store the visitor's device belongs to. */
export function usePlatform(): StorePlatform {
	return useMemo(() => {
		if (typeof navigator === 'undefined') return 'android'

		const ua = navigator.userAgent
		const isIpadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1
		const isApple = /iPhone|iPad|iPod|Macintosh/.test(ua) || isIpadOS

		return isApple ? 'ios' : 'android'
	}, [])
}

/** Points a single download CTA at the store matching the visitor's device. */
export function useStoreLink() {
	return STORES[usePlatform()].href
}
