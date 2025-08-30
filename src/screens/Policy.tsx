import { useState } from "react";

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  // Навигационные пункты
  const sections = [
    { id: "introduction", title: "1. Введение" },
    { id: "data-collection", title: "2. Собираемая информация" },
    { id: "data-usage", title: "3. Использование собранной информации" },
    { id: "disclosure", title: "4. Раскрытие информации третьим лицам" },
    { id: "security", title: "5. Безопасность данных" },
    { id: "rights", title: "6. Права и контроль" },
    { id: "changes", title: "7. Изменения в политике конфиденциальности" },
    { id: "contacts", title: "8. Контакты" },
  ];

  return (
    <div className="flex flex-col lg:flex-row max-w-6xl mx-auto px-4 py-8 font-sans gap-8">
      {/* Боковая панель навигации */}
      <aside className="lg:w-1/4">
        <nav className="sticky top-24 bg-white p-4 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Содержание
          </h2>
          <ul className="space-y-2">
            {sections.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  className={`block py-2 px-3 text-sm rounded-md transition-colors ${
                    activeSection === section.id
                      ? "bg-blue-50 text-blue-600 font-medium"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                  onClick={() => setActiveSection(section.id)}
                >
                  {section.title}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {/* Основной контент */}
      <div className="lg:w-3/4 bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <header className="mb-8 pb-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Политика конфиденциальности мобильного приложения «FIT.ME»
          </h1>
          <p className="text-sm text-gray-500">
            Последнее обновление: 01 января 2024 г.
          </p>
        </header>

        <div className="prose prose-gray max-w-none">
          <section id="introduction" className="scroll-mt-24 mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              1. Введение
            </h2>
            <p className="mb-4 text-gray-700 leading-relaxed">
              Политика конфиденциальности мобильного приложения «FIT.ME» (далее
              "FIT.ME") действует в отношении той информации, которую FIT.ME
              может получить с устройств(а) Пользователя во время использования
              им мобильного приложения мобильного приложения «FIT.ME».
            </p>
            <p className="mb-4 text-gray-700 leading-relaxed">
              FIT.ME прилагает максимум усилий для обеспечения безопасности и
              конфиденциальности данных Пользователя. В данной политике
              конфиденциальности мы описываем, как FIT.ME собирает, использует,
              раскрывает и защищает информацию, которую Пользователь
              предоставляет FIT.ME при использовании нашего мобильного
              приложения «FIT.ME» (далее «Приложение»).
            </p>
            <p className="mb-4 text-gray-700 leading-relaxed">
              Пожалуйста, внимательно ознакомьтесь с содержанием настоящей
              политики. Использование Приложения означает согласие Пользователя
              с настоящей политикой и указанными в ней условиями обработки
              информации, получаемой с устройства Пользователя. Если
              Пользователь с ней не согласен, ему необходимо воздержаться от
              использования Приложения.
            </p>
          </section>

          <section id="data-collection" className="scroll-mt-24 mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              2. Собираемая информация
            </h2>

            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-800 mb-3">
                2.1. Личная информация:
              </h3>
              <p className="mb-3 text-gray-700">
                FIT.ME может собирать следующую личную информацию:
              </p>
              <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-700">
                <li>Фамилия Имя Отчество Пользователя</li>
                <li>Дата рождения</li>
                <li>Место рождения</li>
                <li>Номер телефона</li>
                <li>Адрес электронной почты</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-800 mb-3">
                2.2. Финансовая информация:
              </h3>
              <p className="mb-3 text-gray-700">
                Для выполнения финансовых операций через Приложение, FIT.ME
                может собирать следующую информацию:
              </p>
              <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-700">
                <li>Данные о банковском счет(е/ах)</li>
                <li>Информацию о транзакциях</li>
                <li>Данные о кредитной истории и другие финансовые данные</li>
                <li>Данные по вкладам</li>
                <li>Данные о покупках внутри приложения</li>
                <li>Данные о месте покупки</li>
                <li>Данные о покупках с использованием приложения</li>
                <li>
                  Данные о балансе и транзакциям карт других банков введенные
                  (добавленные) в приложение
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-800 mb-3">
                2.3. Информация об устройстве:
              </h3>
              <p className="mb-3 text-gray-700">
                FIT.ME автоматически собирает следующую информацию об
                устройстве, на котором установлено Приложение:
              </p>
              <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-700">
                <li>Модель устройства</li>
                <li>Операционная система</li>
                <li>Версия приложения</li>
                <li>IP-адрес</li>
                <li>Уникальный идентификатор устройства</li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-800 mb-3">
                2.4. Информация о местоположении:
              </h3>
              <p className="text-gray-700">
                FIT.ME может собирать информацию о местоположении Пользователя с
                использованием GPS и других технологий для предоставления
                Пользователю контента, связанного с текущим местоположением, а
                также для обеспечения безопасности и контроля местоположения в
                рамках банковских операций.
              </p>
            </div>
          </section>

          <section id="data-usage" className="scroll-mt-24 mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              3. Использование собранной информации
            </h2>

            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-800 mb-3">3.1.</h3>
              <p className="mb-3 text-gray-700">
                FIT.ME использует собранную о Пользователе информацию для:
              </p>
              <ul className="list-disc pl-5 mb-4 space-y-2 text-gray-700">
                <li>
                  предоставления тренерских услуг через мобильное приложение,
                  включая диеты, и управление тренировочным процессом;
                </li>
                <li>обеспечения безопасности учетной записи;</li>
                <li>
                  предоставления персонализированных предложений и уведомлений;
                </li>
                <li>
                  соблюдения юридических требований и обязательств в
                  соответствии с законодательством Республики Узбекистан.
                </li>
              </ul>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-800 mb-3">3.2.</h3>
              <p className="mb-3 text-gray-700">
                Для целей, изложенных в пункте 3.1 настоящей Политики, FIT.ME
                вправе привлекать к обработке информации Партнёров, с которыми у
                FIT.ME заключены соответствующие соглашения о
                конфиденциальности. Передача Партнёрам обезличенных данных об
                использовании Приложения для целей улучшения работы Приложения
                осуществляется на основании договоров с Партнерами.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-800 mb-3">3.3.</h3>
              <p className="text-gray-700">
                Информация может сохраняться на ресурсах FIT.ME и ее Партнеров в
                течение сроков действия договорных отношений между FIT.ME и
                Пользователем, а также в течение 5 лет после расторжения таких
                договоров, или более длительный срок, если таковой установлен
                законодательством Республики Узбекистан.
              </p>
            </div>
          </section>

          <section id="disclosure" className="scroll-mt-24 mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              4. Раскрытие информации третьим лицам
            </h2>

            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-800 mb-3">4.1.</h3>
              <p className="text-gray-700">
                FIT.ME может раскрывать информацию о Пользователе третьим лицам
                только в следующих случаях:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-700">
                <li>при явном согласии Пользователя;</li>
                <li>
                  когда это необходимо в рамках предоставления Пользователю
                  Тренерских продуктов и услуг через приложение;
                </li>
                <li>
                  в иных случаях в соответствии с положениями действующего
                  законодательства Республики Узбекистан.
                </li>
              </ul>
            </div>
          </section>

          <section id="security" className="scroll-mt-24 mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              5. Безопасность данных
            </h2>

            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-800 mb-3">5.1.</h3>
              <p className="mb-3 text-gray-700">
                FIT.ME принимает разумные меры для защиты данных Пользователя от
                несанкционированного доступа, использования и раскрытия. Мы
                используем современные методы шифрования и другие технологии для
                обеспечения безопасности ваших личных данных.
              </p>
            </div>

            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-800 mb-3">5.2.</h3>
              <p className="text-gray-700">
                FIT.ME не несёт ответственности за раскрытие данных Пользователя
                третьим лицам, в случае:
              </p>
              <ul className="list-disc pl-5 mt-3 space-y-2 text-gray-700">
                <li>раскрытия данных самим Пользователем;</li>
                <li>
                  взлома и/или наличия уязвимостей и/или заражения устройств(а)
                  Пользователя вредоносными вирусами и сбоев в их работе;
                </li>
                <li>
                  иных ситуациях, находящихся вне контроля FIT.ME, связанных со
                  сбоями в работе Интернета, сетей связи и иных внешних
                  организаций и сетей, повлекшие за собой несанкционированное
                  раскрытие данных.
                </li>
              </ul>
            </div>
          </section>

          <section id="rights" className="scroll-mt-24 mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              6. Права и контроль
            </h2>

            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-800 mb-3">6.1.</h3>
              <p className="text-gray-700">
                Пользователь имеет право на доступ к своей личной информации и
                на её обновление, исправление или удаление. Пользователь также
                может управлять настройками конфиденциальности в приложении.
              </p>
            </div>
          </section>

          <section id="changes" className="scroll-mt-24 mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              7. Изменения в политике конфиденциальности
            </h2>

            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-800 mb-3">7.1.</h3>
              <p className="text-gray-700">
                FIT.ME оставляет за собой право вносить изменения в настоящую
                политику конфиденциальности. Обновленная версия политики будет
                доступна в приложении.
              </p>
            </div>
          </section>

          <section id="contacts" className="scroll-mt-24 mb-10">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              8. Контакты
            </h2>

            <div className="mb-6">
              <h3 className="text-xl font-medium text-gray-800 mb-3">8.1.</h3>
              <p className="mb-3 text-gray-700">
                Если у Пользователя есть возникли вопросы или предложения
                относительно нашей политики конфиденциальности, с нами можно
                связаться по следующим реквизитам:
              </p>
              <div className="bg-gray-50 p-4 rounded-md mt-4">
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">OOO «FIT.ME»</span>
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Адрес (местонахождение):</span>{" "}
                  Республика Узбекистан, 100140, город Самарканд, улица Буйук
                  Ипак йули, 17
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">
                    Телефоны для справок (Контакт-Центр Банка):
                  </span>{" "}
                  (+998 90) 030-37-77
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Телефон доверия:</span> (+998
                  90) 030-37-77
                </p>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">
                    Официальный сайт в сети Интернет:
                  </span>{" "}
                  www.fit.me.uz
                </p>
                <p className="text-gray-700">
                  <span className="font-medium">E-mail:</span>{" "}
                  fit.me.company.rn@gmail.com
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
