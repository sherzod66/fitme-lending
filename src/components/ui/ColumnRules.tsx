/**
 * The page's editorial column rules. Every section renders its own copy as the
 * first child, so the hairlines line up into one continuous rule down the page.
 * Must stay before the section content in the DOM to paint behind it.
 */
export default function ColumnRules() {
	return (
		<div
			aria-hidden='true'
			className='pointer-events-none absolute inset-y-0 left-1/2 hidden w-full max-w-edge -translate-x-1/2 border-x border-white/[0.06] lg:block'
		/>
	)
}
