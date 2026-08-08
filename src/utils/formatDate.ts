const MONTHS_RU = [
	'января',
	'февраля',
	'марта',
	'апреля',
	'мая',
	'июня',
	'июля',
	'августа',
	'сентября',
	'октября',
	'ноября',
	'декабря'
]

export const formatDateTime = (date: Date | string | undefined): string => {
	if (!date) return '—'
	const d = new Date(date)
	const day = d.getDate().toString().padStart(2, '0')
	const month = (d.getMonth() + 1).toString().padStart(2, '0')
	const year = d.getFullYear()
	const hours = d.getHours().toString().padStart(2, '0')
	const minutes = d.getMinutes().toString().padStart(2, '0')
	return `${day}.${month}.${year} ${hours}:${minutes}`
}

export const formatDateShort = (date: Date | string | undefined): string => {
	if (!date) return '—'
	const d = new Date(date)
	const day = d.getDate().toString().padStart(2, '0')
	const month = (d.getMonth() + 1).toString().padStart(2, '0')
	const year = d.getFullYear()
	return `${day}.${month}.${year}`
}

export const formatDateRuLong = (date: Date | string | undefined): string => {
	if (!date) return '—'
	const d = new Date(date)
	return `${d.getDate()} ${MONTHS_RU[d.getMonth()]} ${d.getFullYear()}`
}
