import { useEffect, useState } from 'react'

/**
 * Tracks which of the given sections currently sits in the middle of the
 * viewport. Sections that are not rendered yet are simply ignored.
 */
export function useActiveSection(ids: string[], enabled = true) {
	const [activeId, setActiveId] = useState<string | null>(null)
	const key = ids.join(',')

	useEffect(() => {
		if (!enabled) {
			setActiveId(null)
			return
		}

		const sections = key
			.split(',')
			.map(id => document.getElementById(id))
			.filter((element): element is HTMLElement => Boolean(element))

		if (!sections.length) return

		const observer = new IntersectionObserver(
			entries => {
				const visible = entries
					.filter(entry => entry.isIntersecting)
					.sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

				if (visible) setActiveId(visible.target.id)
			},
			{ rootMargin: '-45% 0px -50% 0px', threshold: [0, 0.25, 0.5, 1] }
		)

		sections.forEach(section => observer.observe(section))

		return () => observer.disconnect()
	}, [key, enabled])

	return activeId
}
