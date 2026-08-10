export const formatPrice = (price: number) => new Intl.NumberFormat('ru').format(price ? price : 0)

export const formatSum = (value: number) =>
	`${Math.round(value)
		.toString()
		.replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} UZS`
