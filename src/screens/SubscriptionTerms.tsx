import { useEffect, useMemo, useState } from 'react'

type Language = 'ru' | 'uz'

type Section = {
	id: string
	title: string
	content: string[]
}

const mockCompany = {
	name: 'OOO «FIT.ME»',
	address: "SAMARQANDVILOYATI, SAMARQANDSHAHRI, SHODLIK MFY, AMIR TEMUR KO'CHASI, 224- UY",
	inn: '311874007',
	email: 'fitme.uz@gmail.com',
	phone: '+998900303777',
	website: 'www.fitme.uz'
}

const sectionsByLanguage: Record<Language, Section[]> = {
	ru: [
		{
			id: 'general',
			title: '1. Общие положения',
			content: [
				'Настоящее Пользовательское соглашение об оплате подписки и автоматическом продлении регулирует порядок оплаты подписки в сервисе «FIT.ME».',
				'Оплачивая подписку и устанавливая отметку о согласии перед оплатой, Пользователь подтверждает, что ознакомился и согласен с условиями настоящего соглашения.',
				'Реквизиты правообладателя и получателя платежей указаны в разделе «Контакты и реквизиты».'
			]
		},
		{
			id: 'subscription',
			title: '2. Подписка и тарифы',
			content: [
				'Сервис предоставляет доступ к платным функциям по подписке. Тарифы формируются динамически и отображаются Пользователю в интерфейсе сайта или мобильного приложения перед оплатой.',
				'Подписка может оформляться на различные периоды, включая один месяц, три месяца, шесть месяцев и один год, а также на иные сроки, указанные в выбранном тарифе.',
				'Стоимость подписки, срок действия тарифа, перечень включенных функций и иные существенные условия указываются до подтверждения оплаты.'
			]
		},
		{
			id: 'payments',
			title: '3. Порядок оплаты',
			content: [
				'Все платежи по подписке осуществляются в национальной валюте Республики Узбекистан - UZS.',
				'В качестве платежного провайдера Сервис использует Payme. При проведении платежа Пользователь может быть перенаправлен на интерфейсы или платежные формы Payme.',
				'Пользователь соглашается с тем, что обработка платежей, подтверждение оплаты и связанные с этим технические операции могут выполняться с участием Payme в соответствии с его правилами и техническими требованиями.'
			]
		},
		{
			id: 'autopay',
			title: '4. Автоматическое продление и автосписание',
			content: [
				'Оформляя подписку, Пользователь предоставляет согласие на автоматическое продление подписки и автоматическое списание денежных средств по выбранному тарифу с использованием сохраненного платежного метода, если такой механизм поддерживается платежным провайдером и интерфейсом оплаты.',
				'Списание производится периодически по завершении каждого оплаченного периода в размере, соответствующем выбранному на момент оформления или продления тарифу, если иное не было прямо сообщено Пользователю до очередного списания.',
				'Автосписание выполняется до момента отмены подписки Пользователем. Если на дату очередного списания оплата не может быть успешно проведена, доступ к платным функциям может быть ограничен или приостановлен до момента успешной оплаты.'
			]
		},
		{
			id: 'acceptance',
			title: '5. Акцепт условий',
			content: [
				'Согласие Пользователя с настоящим соглашением подтверждается путем установки чекбокса перед оплатой подписки.',
				'Установка чекбокса означает, что Пользователь понимает и принимает условия о платном характере подписки, ее автоматическом продлении, периодичности списаний и использовании Payme в качестве платежного провайдера.',
				'При отсутствии согласия Пользователь обязан воздержаться от оформления и оплаты подписки.'
			]
		},
		{
			id: 'cancellation',
			title: '6. Отмена подписки',
			content: [
				'Пользователь вправе отменить подписку в личном кабинете на сайте или в мобильном приложении.',
				'После отмены подписка продолжает действовать до окончания уже оплаченного периода, если иное не предусмотрено условиями конкретного тарифа или обязательными требованиями законодательства.',
				'После отмены новые автоматические списания за последующие периоды не производятся, если Пользователь не оформит подписку повторно.'
			]
		},
		{
			id: 'refunds',
			title: '7. Возвраты',
			content: [
				'Если оплаченный период подписки уже начался, денежные средства за такой период, как правило, не возвращаются.',
				'Возврат может быть рассмотрен в исключительных случаях, прямо предусмотренных применимым законодательством или дополнительными правилами Сервиса.',
				'Для рассмотрения вопроса о возврате Пользователь может обратиться по контактам, указанным в настоящем соглашении.'
			]
		},
		{
			id: 'changes',
			title: '8. Изменение условий',
			content: [
				'Сервис вправе обновлять настоящее соглашение. Актуальная редакция размещается на соответствующей странице сайта и/или в мобильном приложении.',
				'Новая редакция применяется с момента ее публикации, если иной срок не указан дополнительно.'
			]
		},
		{
			id: 'contacts',
			title: '9. Контакты и реквизиты',
			content: [
				`Компания: ${mockCompany.name}`,
				`Юридический адрес: ${mockCompany.address}`,
				`ИНН: ${mockCompany.inn}`,
				`Телефон поддержки: ${mockCompany.phone}`,
				`Email: ${mockCompany.email}`,
				`Сайт: ${mockCompany.website}`
			]
		}
	],
	uz: [
		{
			id: 'general',
			title: '1. Umumiy qoidalar',
			content: [
				"Ushbu obunani to'lash va avtomatik uzaytirish bo'yicha foydalanuvchi kelishuvi «FIT.ME» servisida obunani to'lash tartibini belgilaydi.",
				"Foydalanuvchi obunani to'lashdan oldin rozilik belgisini qo'yish va to'lovni amalga oshirish orqali ushbu kelishuv shartlari bilan tanishganini hamda ularga rozi ekanini tasdiqlaydi.",
				"Huquq egasi va to'lovlarni qabul qiluvchi rekvizitlari «Kontaktlar va rekvizitlar» bo'limida ko'rsatiladi."
			]
		},
		{
			id: 'subscription',
			title: '2. Obuna va tariflar',
			content: [
				"Servis pullik funksiyalardan obuna asosida foydalanish imkonini beradi. Tariflar dinamik shakllantiriladi va to'lovni tasdiqlashdan oldin foydalanuvchiga sayt yoki mobil ilova interfeysida ko'rsatiladi.",
				"Obuna turli muddatlarga, jumladan bir oy, uch oy, olti oy va bir yilga, shuningdek tanlangan tarifda ko'rsatilgan boshqa muddatlarga rasmiylashtirilishi mumkin.",
				"Obuna narxi, tarif muddati, kiritilgan funksiyalar ro'yxati va boshqa muhim shartlar to'lovni tasdiqlashdan oldin ko'rsatiladi."
			]
		},
		{
			id: 'payments',
			title: "3. To'lov tartibi",
			content: [
				"Obuna bo'yicha barcha to'lovlar O'zbekiston Respublikasi milliy valyutasida - UZS da amalga oshiriladi.",
				"Servis to'lov provayderi sifatida Payme'dan foydalanadi. To'lovni amalga oshirish vaqtida foydalanuvchi Payme interfeysi yoki to'lov shakliga yo'naltirilishi mumkin.",
				"Foydalanuvchi to'lovlarni qayta ishlash, to'lovni tasdiqlash va shunga bog'liq texnik amallar Payme qoidalari va texnik talablari asosida uning ishtirokida bajarilishi mumkinligiga rozilik bildiradi."
			]
		},
		{
			id: 'autopay',
			title: '4. Avtomatik uzaytirish va avtomatik yechib olish',
			content: [
				"Obunani rasmiylashtirish orqali foydalanuvchi tanlangan tarif bo'yicha obunaning avtomatik uzaytirilishiga va agar bunday mexanizm to'lov provayderi hamda to'lov interfeysi tomonidan qo'llab-quvvatlansa, saqlangan to'lov usulidan avtomatik mablag' yechib olinishiga rozilik beradi.",
				"Yechib olish har bir to'langan davr tugagach, tanlangan yoki uzaytirilayotgan tarif miqdorida davriy ravishda amalga oshiriladi, agar navbatdagi yechib olishdan oldin foydalanuvchiga boshqacha tartib alohida bildirilmagan bo'lsa.",
				"Foydalanuvchi obunani bekor qilmaguncha avtomatik yechib olish davom etadi. Agar navbatdagi yechib olish sanasida to'lov muvaffaqiyatli amalga oshmasa, pullik funksiyalardan foydalanish muvaffaqiyatli to'lov amalga oshirilguncha cheklanishi yoki to'xtatilishi mumkin."
			]
		},
		{
			id: 'acceptance',
			title: '5. Shartlarni qabul qilish',
			content: [
				"Foydalanuvchining ushbu kelishuvga roziligi obuna to'lovi oldidan чекбоксni belgilash orqali tasdiqlanadi.",
				"Chekboksni belgilash foydalanuvchi obunaning pullik ekanini, uning avtomatik uzaytirilishini, davriy yechib olishlarni va Payme to'lov provayderi sifatida qo'llanilishini tushunganini va qabul qilganini anglatadi.",
				"Agar foydalanuvchi rozi bo'lmasa, u obunani rasmiylashtirish va to'lashdan voz kechishi kerak."
			]
		},
		{
			id: 'cancellation',
			title: '6. Obunani bekor qilish',
			content: [
				'Foydalanuvchi obunani sayt shaxsiy kabinetida yoki mobil ilovada bekor qilish huquqiga ega.',
				"Bekor qilingandan so'ng, agar muayyan tarif shartlarida yoki qonunchilikda boshqacha ko'zda tutilmagan bo'lsa, obuna allaqachon to'langan davr oxirigacha amal qiladi.",
				'Bekor qilingandan keyin foydalanuvchi obunani qayta rasmiylashtirmasa, keyingi davrlar uchun yangi avtomatik yechib olishlar amalga oshirilmaydi.'
			]
		},
		{
			id: 'refunds',
			title: '7. Qaytarishlar',
			content: [
				"Agar obunaning to'langan davri boshlangan bo'lsa, odatda ushbu davr uchun to'langan mablag' qaytarilmaydi.",
				"Qaytarish faqat amaldagi qonunchilikda yoki servisning qo'shimcha qoidalarida bevosita nazarda tutilgan istisno holatlarda ko'rib chiqilishi mumkin.",
				"Qaytarish masalasini ko'rib chiqish uchun foydalanuvchi ushbu kelishuvda ko'rsatilgan kontaktlar orqali murojaat qilishi mumkin."
			]
		},
		{
			id: 'changes',
			title: "8. Shartlarni o'zgartirish",
			content: [
				"Servis ushbu kelishuvni yangilash huquqini o'zida saqlab qoladi. Amaldagi tahrir saytning tegishli sahifasida va/yoki mobil ilovada joylashtiriladi.",
				"Agar boshqacha muddat alohida ko'rsatilmagan bo'lsa, yangi tahrir e'lon qilingan paytdan kuchga kiradi."
			]
		},
		{
			id: 'contacts',
			title: '9. Kontaktlar va rekvizitlar',
			content: [
				`Kompaniya: ${mockCompany.name}`,
				`Yuridik manzil: ${mockCompany.address}`,
				`STIR: ${mockCompany.inn}`,
				`Qo'llab-quvvatlash telefoni: ${mockCompany.phone}`,
				`Email: ${mockCompany.email}`,
				`Sayt: ${mockCompany.website}`
			]
		}
	]
}

const languageMeta: Record<Language, { title: string; updated: string; label: string }> = {
	ru: {
		title: 'Пользовательское соглашение об оплате подписки',
		updated: 'Последнее обновление: 04.08.2026',
		label: 'Русский'
	},
	uz: {
		title: "Obunani to'lash bo'yicha foydalanuvchi kelishuvi",
		updated: 'Oxirgi yangilanish: 04.08.2026',
		label: "O'zbekcha"
	}
}

const SubscriptionTerms = () => {
	const [language, setLanguage] = useState<Language>('ru')
	const sections = useMemo(() => sectionsByLanguage[language], [language])
	const [activeSection, setActiveSection] = useState(sections[0].id)

	useEffect(() => {
		setActiveSection(sections[0].id)
	}, [sections])

	return (
		<div className='flex flex-col lg:flex-row max-w-6xl mx-auto px-4 py-8 font-sans gap-8'>
			<aside className='lg:w-1/4'>
				<div className='sticky top-24 space-y-4'>
					<div className='bg-white p-2 rounded-lg shadow-sm border border-gray-100'>
						<div className='grid grid-cols-2 gap-2'>
							{(['ru', 'uz'] as Language[]).map(lang => (
								<button
									key={lang}
									type='button'
									onClick={() => setLanguage(lang)}
									className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
										language === lang
											? 'bg-blue-600 text-white'
											: 'bg-gray-50 text-gray-700 hover:bg-gray-100'
									}`}
								>
									{languageMeta[lang].label}
								</button>
							))}
						</div>
					</div>

					<nav className='bg-white p-4 rounded-lg shadow-sm border border-gray-100'>
						<h2 className='text-lg font-semibold mb-4 text-gray-800'>
							{language === 'ru' ? 'Содержание' : 'Mundarija'}
						</h2>
						<ul className='space-y-2'>
							{sections.map(section => (
								<li key={section.id}>
									<a
										href={`#${section.id}`}
										className={`block py-2 px-3 text-sm rounded-md transition-colors ${
											activeSection === section.id
												? 'bg-blue-50 text-blue-600 font-medium'
												: 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
										}`}
										onClick={() => setActiveSection(section.id)}
									>
										{section.title}
									</a>
								</li>
							))}
						</ul>
					</nav>
				</div>
			</aside>

			<div className='lg:w-3/4 bg-white p-6 rounded-lg shadow-sm border border-gray-100'>
				<header className='mb-8 pb-6 border-b border-gray-200'>
					<h1 className='text-3xl font-bold text-gray-800 mb-2'>{languageMeta[language].title}</h1>
					<p className='text-sm text-gray-500'>{languageMeta[language].updated}</p>
				</header>

				<div className='prose prose-gray max-w-none'>
					{sections.map(section => (
						<section
							key={section.id}
							id={section.id}
							className='scroll-mt-24 mb-10'
						>
							<h2 className='text-2xl font-semibold text-gray-800 mb-4'>{section.title}</h2>
							{section.content.map(paragraph => (
								<p
									key={paragraph}
									className='mb-4 text-gray-700 leading-relaxed'
								>
									{paragraph}
								</p>
							))}
						</section>
					))}
				</div>
			</div>
		</div>
	)
}

export default SubscriptionTerms
