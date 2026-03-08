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

export const termsContent: Record<'en' | 'ru' | 'es', LegalContent> = {
  en: {
    pageTitle: 'Terms of Service',
    lastUpdated: 'Last Updated: February 2026',
    disclaimerTitle: '⚠️ Medical Disclaimer',
    disclaimerText:
      '<strong>Refresher is not a medical device.</strong> These breathing techniques are wellness practices, not medical treatments. If you have cardiovascular disease, respiratory conditions, epilepsy, or are pregnant, <strong>consult your doctor before use</strong>. <strong>NEVER practice the Wim Hof Method or any breath-holding techniques in water or while operating a vehicle or machinery.</strong>',
    sections: [
      {
        title: '1. Acceptance of Terms',
        content:
          'By downloading, installing, or using Refresher: Meditation &amp; Focus (\u201cthe App\u201d), you agree to be bound by these Terms of Service (\u201cTerms\u201d). If you do not agree to these Terms, do not use the App. These Terms constitute a legal agreement between you and OverX AI.',
      },
      {
        title: '2. License',
        content:
          'Subject to these Terms, OverX AI grants you a limited, non-exclusive, non-transferable, revocable license to use the App on Apple-branded devices that you own or control, solely for your personal, non-commercial purposes, in accordance with the App Store Terms of Service. This license does not include the right to sublicense, distribute, or create derivative works.',
      },
      {
        title: '3. In-App Purchases',
        content:
          '<p>Refresher may offer premium features available for purchase through Apple\u2019s in-app purchase system (StoreKit). All transactions are processed exclusively by Apple:</p><ul><li>Prices are displayed in your local currency as set in the App Store.</li><li>All refund requests must be submitted directly to Apple at <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener noreferrer">reportaproblem.apple.com</a>. OverX AI cannot process refunds.</li><li>To manage or cancel subscriptions: go to <strong>iPhone Settings \u2192 [Your Name] \u2192 Subscriptions</strong>.</li><li>Unused portions of a free trial are forfeited when you purchase a subscription.</li></ul>',
      },
      {
        title: '4. Acceptable Use',
        content:
          '<p>You agree not to:</p><ul><li>Reverse engineer, decompile, disassemble, or attempt to extract the source code of the App.</li><li>Use the App or any knowledge derived from it to develop competing products or services.</li><li>Attempt to bypass, disable, or circumvent any technical protections or limitations of the App.</li><li>Use the App for any unlawful purpose or in violation of any applicable laws or regulations.</li></ul>',
      },
      {
        title: '5. Intellectual Property',
        content:
          '\u201cRefresher\u201d and associated logos, graphics, and trade dress are trademarks of OverX AI. All content, design, code, and materials in the App are protected by copyright and other intellectual property laws. You may not use our trademarks or copyrighted materials without our prior written consent.',
      },
      {
        title: '6. Disclaimer of Warranties',
        content:
          'THE APP IS PROVIDED \u201cAS IS\u201d AND \u201cAS AVAILABLE\u201d WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. OVERX AI DOES NOT WARRANT THAT THE APP WILL BE UNINTERRUPTED, ERROR-FREE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS. YOUR USE OF THE APP IS AT YOUR SOLE RISK.',
      },
      {
        title: '7. Limitation of Liability',
        content:
          '<p>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, OVERX AI SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, OR GOODWILL, ARISING FROM YOUR USE OF OR INABILITY TO USE THE APP.</p><p>OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING FROM OR RELATED TO THESE TERMS OR THE APP SHALL NOT EXCEED THE TOTAL AMOUNTS YOU HAVE PAID TO OVERX AI (VIA APPLE\u2019S IN-APP PURCHASE SYSTEM) IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM.</p>',
      },
      {
        title: '8. Apple as Third-Party Beneficiary',
        content:
          'You acknowledge and agree that Apple, Inc. and its subsidiaries are third-party beneficiaries of these Terms of Service. Upon your acceptance of these Terms, Apple will have the right (and will be deemed to have accepted the right) to enforce these Terms of Service against you as a third-party beneficiary thereof.',
      },
      {
        title: '9. Governing Law',
        content:
          'These Terms are governed by and construed in accordance with the laws of the Republic of Belarus, without regard to its conflict of law provisions. Any disputes arising from or related to these Terms or the App shall be subject to the exclusive jurisdiction of the courts of Minsk, Republic of Belarus.',
      },
      {
        title: '10. Changes to Terms',
        content:
          'We reserve the right to modify these Terms at any time. When we make changes, we will update the \u201cLast Updated\u201d date at the top of this page. For material changes, we may notify you within the App. Your continued use of Refresher after changes take effect constitutes your acceptance of the revised Terms.',
      },
      {
        title: '11. Contact',
        content:
          'For questions about these Terms, please contact us at <a href="mailto:support@overx.ai">support@overx.ai</a>.',
      },
    ],
  },

  ru: {
    pageTitle: 'Условия использования',
    lastUpdated: 'Последнее обновление: февраль 2026',
    disclaimerTitle: '⚠️ Медицинское предупреждение',
    disclaimerText:
      '<strong>Refresher не является медицинским устройством.</strong> Дыхательные техники являются оздоровительными практиками, а не медицинским лечением. При наличии сердечно-сосудистых заболеваний, заболеваний дыхательной системы, эпилепсии или при беременности <strong>проконсультируйтесь с врачом перед использованием</strong>. <strong>НИКОГДА не практикуйте метод Вим Хофа или любые техники задержки дыхания в воде или при управлении транспортным средством или механизмами.</strong>',
    sections: [
      {
        title: '1. Принятие условий',
        content:
          'Загружая, устанавливая или используя приложение Refresher: Meditation &amp; Focus (\u00abПриложение\u00bb), вы соглашаетесь соблюдать настоящие Условия использования (\u00abУсловия\u00bb). Если вы не согласны с настоящими Условиями, не используйте Приложение. Настоящие Условия представляют собой юридическое соглашение между вами и OverX AI.',
      },
      {
        title: '2. Лицензия',
        content:
          'В соответствии с настоящими Условиями OverX AI предоставляет вам ограниченную, неисключительную, непередаваемую, отзывную лицензию на использование Приложения на устройствах Apple, которыми вы владеете или управляете, исключительно в ваших личных, некоммерческих целях, в соответствии с Условиями использования App Store. Данная лицензия не включает право на сублицензирование, распространение или создание производных работ.',
      },
      {
        title: '3. Встроенные покупки',
        content:
          '<p>Refresher может предлагать премиальные функции, доступные для покупки через систему встроенных покупок Apple (StoreKit). Все транзакции обрабатываются исключительно Apple:</p><ul><li>Цены отображаются в вашей местной валюте согласно настройкам App Store.</li><li>Все запросы на возврат средств необходимо направлять непосредственно в Apple через <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener noreferrer">reportaproblem.apple.com</a>. OverX AI не может обрабатывать возвраты.</li><li>Для управления или отмены подписок: перейдите в <strong>Настройки iPhone \u2192 [Ваше имя] \u2192 Подписки</strong>.</li><li>Неиспользованная часть бесплатного пробного периода утрачивается при оформлении подписки.</li></ul>',
      },
      {
        title: '4. Допустимое использование',
        content:
          '<p>Вы обязуетесь не:</p><ul><li>Осуществлять обратную разработку, декомпиляцию, дизассемблирование или попытки извлечения исходного кода Приложения.</li><li>Использовать Приложение или любые знания, полученные из него, для разработки конкурирующих продуктов или услуг.</li><li>Пытаться обойти, отключить или обойти любые технические защиты или ограничения Приложения.</li><li>Использовать Приложение в любых незаконных целях или с нарушением применимых законов или правил.</li></ul>',
      },
      {
        title: '5. Интеллектуальная собственность',
        content:
          '\u00abRefresher\u00bb и связанные логотипы, графика и фирменный стиль являются товарными знаками OverX AI. Весь контент, дизайн, код и материалы в Приложении защищены авторским правом и другими законами об интеллектуальной собственности. Вы не имеете права использовать наши товарные знаки или материалы, защищённые авторским правом, без нашего предварительного письменного согласия.',
      },
      {
        title: '6. Отказ от гарантий',
        content:
          'ПРИЛОЖЕНИЕ ПРЕДОСТАВЛЯЕТСЯ \u00abКАК ЕСТЬ\u00bb И \u00abПО МЕРЕ ДОСТУПНОСТИ\u00bb БЕЗ КАКИХ-ЛИБО ГАРАНТИЙ, ЯВНЫХ ИЛИ ПОДРАЗУМЕВАЕМЫХ, ВКЛЮЧАЯ, НО НЕ ОГРАНИЧИВАЯСЬ, ПОДРАЗУМЕВАЕМЫЕ ГАРАНТИИ ТОВАРНОЙ ПРИГОДНОСТИ, СООТВЕТСТВИЯ ОПРЕДЕЛЁННОЙ ЦЕЛИ И НЕНАРУШЕНИЯ ПРАВ. OVERX AI НЕ ГАРАНТИРУЕТ, ЧТО ПРИЛОЖЕНИЕ БУДЕТ РАБОТАТЬ БЕСПЕРЕБОЙНО, БЕЗ ОШИБОК ИЛИ БЕЗ ВИРУСОВ И ДРУГИХ ВРЕДОНОСНЫХ КОМПОНЕНТОВ. ВЫ ИСПОЛЬЗУЕТЕ ПРИЛОЖЕНИЕ НА СВОЙ СОБСТВЕННЫЙ РИСК.',
      },
      {
        title: '7. Ограничение ответственности',
        content:
          '<p>В МАКСИМАЛЬНОЙ СТЕПЕНИ, ДОПУСКАЕМОЙ ПРИМЕНИМЫМ ПРАВОМ, OVERX AI НЕ НЕСЁТ ОТВЕТСТВЕННОСТИ ЗА КАКИЕ-ЛИБО КОСВЕННЫЕ, СЛУЧАЙНЫЕ, ОСОБЫЕ, ШТРАФНЫЕ ИЛИ ПОСЛЕДУЮЩИЕ УБЫТКИ, ВКЛЮЧАЯ, НО НЕ ОГРАНИЧИВАЯСЬ, ПОТЕРЮ ПРИБЫЛИ, ДАННЫХ ИЛИ ДЕЛОВОЙ РЕПУТАЦИИ, ВОЗНИКАЮЩИЕ В СВЯЗИ С ИСПОЛЬЗОВАНИЕМ ИЛИ НЕВОЗМОЖНОСТЬЮ ИСПОЛЬЗОВАНИЯ ПРИЛОЖЕНИЯ.</p><p>НАША ОБЩАЯ ОТВЕТСТВЕННОСТЬ ПЕРЕД ВАМИ ПО ВСЕМ ПРЕТЕНЗИЯМ, СВЯЗАННЫМ С НАСТОЯЩИМИ УСЛОВИЯМИ ИЛИ ПРИЛОЖЕНИЕМ, НЕ ПРЕВЫШАЕТ ОБЩУЮ СУММУ, УПЛАЧЕННУЮ ВАМИ OVERX AI (ЧЕРЕЗ СИСТЕМУ ВСТРОЕННЫХ ПОКУПОК APPLE) В ТЕЧЕНИЕ ДВЕНАДЦАТИ (12) МЕСЯЦЕВ, ПРЕДШЕСТВУЮЩИХ ПРЕТЕНЗИИ.</p>',
      },
      {
        title: '8. Apple как сторонний бенефициар',
        content:
          'Вы признаёте и соглашаетесь, что Apple, Inc. и её дочерние компании являются сторонними бенефициарами настоящих Условий использования. После вашего принятия настоящих Условий Apple будет иметь право (и будет считаться принявшей это право) обеспечивать соблюдение настоящих Условий использования в отношении вас в качестве стороннего бенефициара.',
      },
      {
        title: '9. Применимое право',
        content:
          'Настоящие Условия регулируются и толкуются в соответствии с законодательством Республики Беларусь без учёта коллизионных норм. Любые споры, возникающие из настоящих Условий или связанные с ними или с Приложением, подлежат исключительной юрисдикции судов города Минска, Республика Беларусь.',
      },
      {
        title: '10. Изменения условий',
        content:
          'Мы оставляем за собой право изменять настоящие Условия в любое время. При внесении изменений мы обновим дату \u00abПоследнее обновление\u00bb в верхней части этой страницы. При существенных изменениях мы можем уведомить вас в Приложении. Продолжение использования Refresher после вступления изменений в силу означает ваше согласие с пересмотренными Условиями.',
      },
      {
        title: '11. Контакты',
        content:
          'По вопросам, связанным с настоящими Условиями, обращайтесь к нам по адресу <a href="mailto:support@overx.ai">support@overx.ai</a>.',
      },
    ],
  },

  es: {
    pageTitle: 'Términos de Servicio',
    lastUpdated: 'Última actualización: febrero de 2026',
    disclaimerTitle: '⚠️ Aviso Médico',
    disclaimerText:
      '<strong>Refresher no es un dispositivo médico.</strong> Estas técnicas de respiración son prácticas de bienestar, no tratamientos médicos. Si tiene enfermedades cardiovasculares, afecciones respiratorias, epilepsia o está embarazada, <strong>consulte a su médico antes de usarlo</strong>. <strong>NUNCA practique el Método Wim Hof ni ninguna técnica de retención de la respiración en el agua o mientras opera un vehículo o maquinaria.</strong>',
    sections: [
      {
        title: '1. Aceptación de los Términos',
        content:
          'Al descargar, instalar o utilizar Refresher: Meditation &amp; Focus (\u201cla Aplicación\u201d), usted acepta estar sujeto a estos Términos de Servicio (\u201cTérminos\u201d). Si no está de acuerdo con estos Términos, no utilice la Aplicación. Estos Términos constituyen un acuerdo legal entre usted y OverX AI.',
      },
      {
        title: '2. Licencia',
        content:
          'Sujeto a estos Términos, OverX AI le otorga una licencia limitada, no exclusiva, intransferible y revocable para usar la Aplicación en dispositivos de marca Apple que usted posea o controle, únicamente para sus fines personales y no comerciales, de acuerdo con los Términos de Servicio del App Store. Esta licencia no incluye el derecho de sublicenciar, distribuir o crear obras derivadas.',
      },
      {
        title: '3. Compras dentro de la Aplicación',
        content:
          '<p>Refresher puede ofrecer funciones premium disponibles para su compra a través del sistema de compras dentro de la aplicación de Apple (StoreKit). Todas las transacciones son procesadas exclusivamente por Apple:</p><ul><li>Los precios se muestran en su moneda local según la configuración del App Store.</li><li>Todas las solicitudes de reembolso deben enviarse directamente a Apple en <a href="https://reportaproblem.apple.com" target="_blank" rel="noopener noreferrer">reportaproblem.apple.com</a>. OverX AI no puede procesar reembolsos.</li><li>Para gestionar o cancelar suscripciones: vaya a <strong>Ajustes de iPhone \u2192 [Su nombre] \u2192 Suscripciones</strong>.</li><li>Las porciones no utilizadas de una prueba gratuita se pierden al comprar una suscripción.</li></ul>',
      },
      {
        title: '4. Uso Aceptable',
        content:
          '<p>Usted se compromete a no:</p><ul><li>Realizar ingeniería inversa, descompilar, desensamblar o intentar extraer el código fuente de la Aplicación.</li><li>Utilizar la Aplicación o cualquier conocimiento derivado de ella para desarrollar productos o servicios competidores.</li><li>Intentar eludir, deshabilitar o sortear cualquier protección técnica o limitación de la Aplicación.</li><li>Utilizar la Aplicación para cualquier propósito ilegal o en violación de cualquier ley o regulación aplicable.</li></ul>',
      },
      {
        title: '5. Propiedad Intelectual',
        content:
          '\u201cRefresher\u201d y los logotipos, gráficos y diseño comercial asociados son marcas comerciales de OverX AI. Todo el contenido, diseño, código y materiales de la Aplicación están protegidos por derechos de autor y otras leyes de propiedad intelectual. No puede utilizar nuestras marcas comerciales o materiales protegidos por derechos de autor sin nuestro consentimiento previo por escrito.',
      },
      {
        title: '6. Exención de Garantías',
        content:
          'LA APLICACIÓN SE PROPORCIONA \u201cTAL CUAL\u201d Y \u201cSEGÚN DISPONIBILIDAD\u201d SIN GARANTÍAS DE NINGÚN TIPO, YA SEAN EXPRESAS O IMPLÍCITAS, INCLUIDAS, ENTRE OTRAS, LAS GARANTÍAS IMPLÍCITAS DE COMERCIABILIDAD, IDONEIDAD PARA UN FIN PARTICULAR Y NO INFRACCIÓN. OVERX AI NO GARANTIZA QUE LA APLICACIÓN SERÁ ININTERRUMPIDA, LIBRE DE ERRORES O LIBRE DE VIRUS U OTROS COMPONENTES DAÑINOS. EL USO DE LA APLICACIÓN ES BAJO SU PROPIO RIESGO.',
      },
      {
        title: '7. Limitación de Responsabilidad',
        content:
          '<p>EN LA MÁXIMA MEDIDA PERMITIDA POR LA LEY APLICABLE, OVERX AI NO SERÁ RESPONSABLE DE NINGÚN DAÑO INDIRECTO, INCIDENTAL, ESPECIAL, CONSECUENTE O PUNITIVO, INCLUIDOS, ENTRE OTROS, LA PÉRDIDA DE BENEFICIOS, DATOS O FONDO DE COMERCIO, DERIVADOS DE SU USO O IMPOSIBILIDAD DE USO DE LA APLICACIÓN.</p><p>NUESTRA RESPONSABILIDAD TOTAL ANTE USTED POR TODAS LAS RECLAMACIONES DERIVADAS DE O RELACIONADAS CON ESTOS TÉRMINOS O LA APLICACIÓN NO EXCEDERÁ LOS MONTOS TOTALES QUE USTED HAYA PAGADO A OVERX AI (A TRAVÉS DEL SISTEMA DE COMPRAS DE APPLE) EN LOS DOCE (12) MESES ANTERIORES A LA RECLAMACIÓN.</p>',
      },
      {
        title: '8. Apple como Tercero Beneficiario',
        content:
          'Usted reconoce y acepta que Apple, Inc. y sus subsidiarias son terceros beneficiarios de estos Términos de Servicio. Tras su aceptación de estos Términos, Apple tendrá el derecho (y se considerará que ha aceptado el derecho) de hacer cumplir estos Términos de Servicio contra usted como tercero beneficiario de los mismos.',
      },
      {
        title: '9. Ley Aplicable',
        content:
          'Estos Términos se rigen e interpretan de acuerdo con las leyes de la República de Belarús, sin tener en cuenta sus disposiciones sobre conflicto de leyes. Cualquier disputa que surja de o esté relacionada con estos Términos o la Aplicación estará sujeta a la jurisdicción exclusiva de los tribunales de Minsk, República de Belarús.',
      },
      {
        title: '10. Cambios en los Términos',
        content:
          'Nos reservamos el derecho de modificar estos Términos en cualquier momento. Cuando realicemos cambios, actualizaremos la fecha de \u201cÚltima actualización\u201d en la parte superior de esta página. Para cambios sustanciales, podemos notificarle dentro de la Aplicación. El uso continuado de Refresher después de que los cambios entren en vigor constituye su aceptación de los Términos revisados.',
      },
      {
        title: '11. Contacto',
        content:
          'Para preguntas sobre estos Términos, contáctenos en <a href="mailto:support@overx.ai">support@overx.ai</a>.',
      },
    ],
  },
}
