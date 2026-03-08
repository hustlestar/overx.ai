interface LegalSection {
  title: string
  content: string
}

interface LegalContent {
  pageTitle: string
  lastUpdated: string
  disclaimerTitle: string
  disclaimerText: string
  sections: LegalSection[]
}

export const privacyContent: Record<'en' | 'ru' | 'es', LegalContent> = {
  en: {
    pageTitle: 'Privacy Policy',
    lastUpdated: 'Last Updated: February 2026',
    disclaimerTitle: 'Note',
    disclaimerText:
      'Refresher is not a medical device and is not intended to diagnose, treat, cure, or prevent any medical condition. Consult a healthcare professional before beginning any breathing practice if you have a health condition.',
    sections: [
      {
        title: '1. Introduction',
        content:
          'OverX AI (\u201cwe,\u201d \u201cus,\u201d or \u201cour\u201d) is committed to protecting your privacy. This Privacy Policy explains our data practices for the Refresher: Meditation &amp; Focus iOS application and the refresher.overx.ai website. Our approach is simple: we designed Refresher to work entirely on your device, without collecting or transmitting your personal data to our servers.',
      },
      {
        title: '2. Information We Collect',
        content:
          '<p><strong>We collect no personal information from the iOS app.</strong> Specifically:</p><ul><li><strong>HealthKit data</strong> (breathing sessions, mindfulness minutes, heart rate) is stored on your device and, if you enable iCloud sync, in your private iCloud account. This data is never transmitted to OverX AI servers and we have no access to it.</li><li><strong>iCloud sync</strong> is entirely opt-in and user-controlled. Synced data resides in your personal iCloud account governed by Apple\u2019s privacy policy, not ours.</li><li><strong>In-app purchases</strong> are processed exclusively by Apple via StoreKit. We receive only confirmation that a purchase was completed \u2014 no payment card details or billing information.</li><li><strong>Live Activities, Widgets, and Siri shortcuts</strong> operate entirely locally on your device. No data is sent to our servers.</li><li><strong>Session history and preferences</strong> are stored locally using SwiftData and UserDefaults. They are not transmitted to us.</li></ul>',
      },
      {
        title: '3. Third-Party Services',
        content:
          '<p>Refresher contains <strong>no third-party analytics or advertising SDKs</strong>. We do not integrate Firebase, Amplitude, Mixpanel, Facebook SDK, Google Analytics, or any advertising network into the app.</p><p>The app interacts with Apple\u2019s own services \u2014 App Store, HealthKit, iCloud, StoreKit \u2014 which are governed by <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">Apple\u2019s Privacy Policy</a>.</p>',
      },
      {
        title: '4. Website Analytics',
        content:
          '<p>When you visit refresher.overx.ai, our web server may log:</p><ul><li>Your IP address</li><li>Pages visited and referrer URL</li><li>Browser type and operating system</li></ul><p>These server logs are retained for a maximum of 30 days and are used solely for security and performance monitoring. We also store a language preference cookie (<code>overx-locale</code>) on the <code>.overx.ai</code> domain to remember your preferred language across OverX AI sites.</p>',
      },
      {
        title: '5. Your Privacy Rights',
        content:
          '<p><strong>GDPR (European Union):</strong> Since we do not store personal data on our servers, most GDPR rights (access, erasure, portability) are satisfied by your device and Apple\u2019s infrastructure. For any website data (server logs), you may contact us to request deletion.</p><p><strong>CCPA (California):</strong> We do not sell personal information, as defined by the CCPA.</p><p><strong>Children:</strong> Refresher is rated 4+ on the App Store. We do not knowingly collect personal data from users of any age, and our privacy-by-design approach means no data collection occurs regardless of user age.</p>',
      },
      {
        title: '6. Data Security',
        content:
          'Your breathing session data, HealthKit records, and preferences remain on your device or within Apple\u2019s encrypted iCloud infrastructure. We have no access to this data, which means there is nothing for us to protect on our end \u2014 or for bad actors to steal from us. All data transmission to iCloud uses Apple\u2019s end-to-end encryption where applicable.',
      },
      {
        title: '7. Changes to This Policy',
        content:
          'We may update this Privacy Policy from time to time. When we do, we will update the \u201cLast Updated\u201d date at the top of this page. For material changes, we may also post a notice within the app. Continued use of Refresher after changes constitutes acceptance of the updated policy.',
      },
      {
        title: '8. Contact Us',
        content:
          'For privacy-related questions or requests, please email us at <a href="mailto:privacy@overx.ai">privacy@overx.ai</a>.',
      },
    ],
  },

  ru: {
    pageTitle: 'Политика конфиденциальности',
    lastUpdated: 'Последнее обновление: февраль 2026',
    disclaimerTitle: 'Примечание',
    disclaimerText:
      'Refresher не является медицинским устройством и не предназначен для диагностики, лечения или профилактики каких-либо заболеваний. Проконсультируйтесь с врачом перед началом любых дыхательных практик при наличии заболеваний.',
    sections: [
      {
        title: '1. Введение',
        content:
          'OverX AI (\u00abмы\u00bb, \u00abнас\u00bb или \u00abнаш\u00bb) стремится защитить вашу конфиденциальность. Настоящая Политика конфиденциальности описывает наши практики обработки данных для iOS-приложения Refresher: Meditation &amp; Focus и веб-сайта refresher.overx.ai. Наш подход прост: мы разработали Refresher для работы полностью на вашем устройстве, без сбора или передачи ваших персональных данных на наши серверы.',
      },
      {
        title: '2. Собираемая информация',
        content:
          '<p><strong>Мы не собираем персональную информацию из iOS-приложения.</strong> В частности:</p><ul><li><strong>Данные HealthKit</strong> (сеансы дыхания, минуты осознанности, пульс) хранятся на вашем устройстве и, при включении синхронизации iCloud, в вашей личной учётной записи iCloud. Эти данные никогда не передаются на серверы OverX AI, и мы не имеем к ним доступа.</li><li><strong>Синхронизация iCloud</strong> полностью добровольна и контролируется пользователем. Синхронизированные данные находятся в вашей личной учётной записи iCloud и регулируются политикой конфиденциальности Apple, а не нашей.</li><li><strong>Встроенные покупки</strong> обрабатываются исключительно Apple через StoreKit. Мы получаем только подтверждение совершения покупки \u2014 без данных платёжных карт или платёжной информации.</li><li><strong>Live Activities, виджеты и быстрые команды Siri</strong> работают полностью локально на вашем устройстве. Никакие данные не отправляются на наши серверы.</li><li><strong>История сеансов и настройки</strong> хранятся локально с использованием SwiftData и UserDefaults. Они не передаются нам.</li></ul>',
      },
      {
        title: '3. Сторонние сервисы',
        content:
          '<p>Refresher <strong>не содержит сторонних аналитических или рекламных SDK</strong>. Мы не интегрируем Firebase, Amplitude, Mixpanel, Facebook SDK, Google Analytics или какие-либо рекламные сети в приложение.</p><p>Приложение взаимодействует с собственными сервисами Apple \u2014 App Store, HealthKit, iCloud, StoreKit \u2014 которые регулируются <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">Политикой конфиденциальности Apple</a>.</p>',
      },
      {
        title: '4. Аналитика веб-сайта',
        content:
          '<p>При посещении refresher.overx.ai наш веб-сервер может регистрировать:</p><ul><li>Ваш IP-адрес</li><li>Посещённые страницы и URL-адрес источника перехода</li><li>Тип браузера и операционная система</li></ul><p>Журналы сервера хранятся не более 30 дней и используются исключительно для мониторинга безопасности и производительности. Мы также сохраняем cookie-файл языковых предпочтений (<code>overx-locale</code>) на домене <code>.overx.ai</code> для запоминания предпочитаемого языка на сайтах OverX AI.</p>',
      },
      {
        title: '5. Ваши права на конфиденциальность',
        content:
          '<p><strong>GDPR (Европейский союз):</strong> Поскольку мы не храним персональные данные на наших серверах, большинство прав GDPR (доступ, удаление, переносимость) обеспечиваются вашим устройством и инфраструктурой Apple. Для данных веб-сайта (журналы сервера) вы можете связаться с нами для запроса удаления.</p><p><strong>CCPA (Калифорния):</strong> Мы не продаём персональную информацию в соответствии с определением CCPA.</p><p><strong>Дети:</strong> Refresher имеет рейтинг 4+ в App Store. Мы сознательно не собираем персональные данные пользователей любого возраста, и наш подход «конфиденциальность по умолчанию» означает, что сбор данных не происходит независимо от возраста пользователя.</p>',
      },
      {
        title: '6. Безопасность данных',
        content:
          'Данные о дыхательных сеансах, записи HealthKit и настройки остаются на вашем устройстве или в зашифрованной инфраструктуре iCloud от Apple. Мы не имеем доступа к этим данным, что означает, что нам нечего защищать на нашей стороне \u2014 и злоумышленникам нечего у нас украсть. Вся передача данных в iCloud использует сквозное шифрование Apple, где это применимо.',
      },
      {
        title: '7. Изменения в настоящей Политике',
        content:
          'Мы можем время от времени обновлять настоящую Политику конфиденциальности. При этом мы обновим дату \u00abПоследнее обновление\u00bb в верхней части этой страницы. При существенных изменениях мы также можем разместить уведомление в приложении. Продолжение использования Refresher после внесения изменений означает принятие обновлённой Политики.',
      },
      {
        title: '8. Свяжитесь с нами',
        content:
          'По вопросам, связанным с конфиденциальностью, обращайтесь к нам по электронной почте <a href="mailto:privacy@overx.ai">privacy@overx.ai</a>.',
      },
    ],
  },

  es: {
    pageTitle: 'Política de Privacidad',
    lastUpdated: 'Última actualización: febrero de 2026',
    disclaimerTitle: 'Nota',
    disclaimerText:
      'Refresher no es un dispositivo médico y no está destinado a diagnosticar, tratar, curar ni prevenir ninguna condición médica. Consulte a un profesional de la salud antes de comenzar cualquier práctica de respiración si tiene alguna condición médica.',
    sections: [
      {
        title: '1. Introducción',
        content:
          'OverX AI (\u201cnosotros\u201d o \u201cnuestro\u201d) está comprometido con la protección de su privacidad. Esta Política de Privacidad explica nuestras prácticas de datos para la aplicación iOS Refresher: Meditation &amp; Focus y el sitio web refresher.overx.ai. Nuestro enfoque es simple: diseñamos Refresher para funcionar completamente en su dispositivo, sin recopilar ni transmitir sus datos personales a nuestros servidores.',
      },
      {
        title: '2. Información que Recopilamos',
        content:
          '<p><strong>No recopilamos información personal de la aplicación iOS.</strong> Específicamente:</p><ul><li><strong>Datos de HealthKit</strong> (sesiones de respiración, minutos de atención plena, frecuencia cardíaca) se almacenan en su dispositivo y, si habilita la sincronización de iCloud, en su cuenta privada de iCloud. Estos datos nunca se transmiten a los servidores de OverX AI y no tenemos acceso a ellos.</li><li><strong>La sincronización de iCloud</strong> es completamente voluntaria y controlada por el usuario. Los datos sincronizados residen en su cuenta personal de iCloud, regida por la política de privacidad de Apple, no la nuestra.</li><li><strong>Las compras dentro de la aplicación</strong> son procesadas exclusivamente por Apple a través de StoreKit. Solo recibimos confirmación de que se completó una compra, sin datos de tarjetas de pago ni información de facturación.</li><li><strong>Live Activities, Widgets y atajos de Siri</strong> operan completamente de forma local en su dispositivo. No se envían datos a nuestros servidores.</li><li><strong>El historial de sesiones y preferencias</strong> se almacenan localmente usando SwiftData y UserDefaults. No se nos transmiten.</li></ul>',
      },
      {
        title: '3. Servicios de Terceros',
        content:
          '<p>Refresher <strong>no contiene SDK de análisis o publicidad de terceros</strong>. No integramos Firebase, Amplitude, Mixpanel, Facebook SDK, Google Analytics ni ninguna red publicitaria en la aplicación.</p><p>La aplicación interactúa con los propios servicios de Apple \u2014 App Store, HealthKit, iCloud, StoreKit \u2014 que se rigen por la <a href="https://www.apple.com/legal/privacy/" target="_blank" rel="noopener noreferrer">Política de Privacidad de Apple</a>.</p>',
      },
      {
        title: '4. Analítica del Sitio Web',
        content:
          '<p>Cuando visita refresher.overx.ai, nuestro servidor web puede registrar:</p><ul><li>Su dirección IP</li><li>Páginas visitadas y URL de referencia</li><li>Tipo de navegador y sistema operativo</li></ul><p>Estos registros del servidor se conservan durante un máximo de 30 días y se utilizan exclusivamente para el monitoreo de seguridad y rendimiento. También almacenamos una cookie de preferencia de idioma (<code>overx-locale</code>) en el dominio <code>.overx.ai</code> para recordar su idioma preferido en los sitios de OverX AI.</p>',
      },
      {
        title: '5. Sus Derechos de Privacidad',
        content:
          '<p><strong>RGPD (Unión Europea):</strong> Dado que no almacenamos datos personales en nuestros servidores, la mayoría de los derechos del RGPD (acceso, supresión, portabilidad) se satisfacen mediante su dispositivo y la infraestructura de Apple. Para cualquier dato del sitio web (registros del servidor), puede contactarnos para solicitar su eliminación.</p><p><strong>CCPA (California):</strong> No vendemos información personal, según la definición del CCPA.</p><p><strong>Niños:</strong> Refresher tiene una clasificación de 4+ en el App Store. No recopilamos deliberadamente datos personales de usuarios de ninguna edad, y nuestro enfoque de privacidad por diseño significa que no se produce ninguna recopilación de datos independientemente de la edad del usuario.</p>',
      },
      {
        title: '6. Seguridad de los Datos',
        content:
          'Sus datos de sesiones de respiración, registros de HealthKit y preferencias permanecen en su dispositivo o dentro de la infraestructura cifrada de iCloud de Apple. No tenemos acceso a estos datos, lo que significa que no hay nada que proteger de nuestra parte, ni que los malos actores puedan robarnos. Toda la transmisión de datos a iCloud utiliza el cifrado de extremo a extremo de Apple cuando corresponda.',
      },
      {
        title: '7. Cambios en esta Política',
        content:
          'Podemos actualizar esta Política de Privacidad de vez en cuando. Cuando lo hagamos, actualizaremos la fecha de \u201cÚltima actualización\u201d en la parte superior de esta página. Para cambios sustanciales, también podemos publicar un aviso dentro de la aplicación. El uso continuado de Refresher después de los cambios constituye la aceptación de la política actualizada.',
      },
      {
        title: '8. Contáctenos',
        content:
          'Para preguntas o solicitudes relacionadas con la privacidad, envíenos un correo electrónico a <a href="mailto:privacy@overx.ai">privacy@overx.ai</a>.',
      },
    ],
  },
}
