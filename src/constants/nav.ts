export type NavSection = {
	id: string
	labelKey: string
}

export const NAV_SECTIONS: NavSection[] = [
	{ id: 'training', labelKey: 'nav.training' },
	{ id: 'progress', labelKey: 'nav.progress' },
	{ id: 'nutrition', labelKey: 'nav.nutrition' },
	{ id: 'diary', labelKey: 'nav.diary' }
]

export const LANGUAGES = [
	{ code: 'ru', short: 'RU', name: 'Русский' },
	{ code: 'en', short: 'EN', name: 'English' },
	{ code: 'uz', short: 'UZ', name: "O'zbek" }
]
