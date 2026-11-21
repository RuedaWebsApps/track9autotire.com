// Shared legal content generator (US-focused). Keep in sync across projects.
// NOTE: Template text for informational purposes; have a Texas attorney review before relying on it.

export type Locale = 'en' | 'es';
export type LegalKind = 'privacy' | 'terms' | 'cookies' | 'accessibility';

export interface LegalBiz {
  name: string;
  domain: string;
  phoneDisplay: string;
  email?: string;
  city: string;
  state: string;
  county: string;
  industry: 'auto' | 'agency';
  effective: { en: string; es: string };
}

export interface LegalSection {
  h: string;
  p?: string[];
  ul?: string[];
}

export interface LegalDoc {
  kind: LegalKind;
  title: string;
  description: string;
  updatedLabel: string;
  updated: string;
  sections: LegalSection[];
}

export const LEGAL_KINDS: LegalKind[] = ['privacy', 'terms', 'cookies', 'accessibility'];

const SLUGS: Record<Locale, Record<LegalKind, string>> = {
  en: { privacy: '/privacy', terms: '/terms', cookies: '/cookies', accessibility: '/accessibility' },
  es: { privacy: '/es/privacidad', terms: '/es/terminos', cookies: '/es/cookies', accessibility: '/es/accesibilidad' },
};

export function legalPath(kind: LegalKind, locale: Locale): string {
  return SLUGS[locale][kind];
}

export function legalLabel(kind: LegalKind, locale: Locale): string {
  const labels: Record<Locale, Record<LegalKind, string>> = {
    en: { privacy: 'Privacy Policy', terms: 'Terms of Use', cookies: 'Cookie Policy', accessibility: 'Accessibility' },
    es: { privacy: 'Política de Privacidad', terms: 'Términos de Uso', cookies: 'Política de Cookies', accessibility: 'Accesibilidad' },
  };
  return labels[locale][kind];
}

/** Resolve a pathname into a legal page (or null). */
export function resolveLegalRoute(pathname: string): { kind: LegalKind; locale: Locale } | null {
  const clean = pathname.replace(/\/+$/, '') || '/';
  for (const locale of ['en', 'es'] as Locale[]) {
    for (const kind of LEGAL_KINDS) {
      if (SLUGS[locale][kind] === clean) return { kind, locale };
    }
  }
  return null;
}

function contactLine(b: LegalBiz, l: Locale): string {
  if (l === 'es') {
    return `por teléfono o mensaje de texto al ${b.phoneDisplay}${b.email ? `, por correo electrónico a ${b.email}` : ''} o mediante el formulario de contacto de nuestro sitio web`;
  }
  return `by phone or text at ${b.phoneDisplay}${b.email ? `, by email at ${b.email}` : ''}, or through the contact form on our website`;
}

export function getLegalDoc(kind: LegalKind, l: Locale, b: LegalBiz): LegalDoc {
  const es = l === 'es';
  const updatedLabel = es ? 'Última actualización' : 'Last updated';
  const updated = b.effective[l];
  const where = `${b.city}, ${b.state}`;
  const contact = contactLine(b, l);

  if (kind === 'privacy') {
    return {
      kind,
      title: es ? 'Política de Privacidad' : 'Privacy Policy',
      description: es
        ? `Cómo ${b.name} recopila, usa y protege su información personal, y los derechos que usted tiene bajo las leyes de privacidad de Texas, California y otros estados de EE. UU.`
        : `How ${b.name} collects, uses, and protects your personal information, and the rights you have under Texas, California, and other U.S. state privacy laws.`,
      updatedLabel,
      updated,
      sections: es
        ? [
            { h: '1. Quiénes somos', p: [`${b.name} (“nosotros”) opera el sitio web ${b.domain} desde ${where}. Esta política explica qué información recopilamos cuando usted visita el sitio o nos contacta, cómo la usamos y qué opciones tiene.`] },
            { h: '2. Información que recopilamos', p: ['Información que usted nos proporciona voluntariamente al enviar el formulario de contacto o comunicarse con nosotros:'], ul: ['Nombre, correo electrónico y número de teléfono (opcional).', 'Servicio de interés y el contenido de su mensaje.', 'Su consentimiento para ser contactado por llamada, texto o correo electrónico.'] },
            { h: '', p: ['Información técnica recopilada automáticamente por nuestro proveedor de alojamiento (Vercel Inc.) en registros de servidor: dirección IP, tipo de navegador, páginas solicitadas y fecha/hora. No utilizamos cookies de publicidad, píxeles de seguimiento ni herramientas de analítica de terceros en este sitio.'] },
            { h: '3. Cómo usamos su información', ul: ['Responder a sus consultas y preparar cotizaciones o presupuestos.', 'Comunicarnos con usted sobre el servicio solicitado (llamada, texto o correo).', 'Proteger el sitio contra spam, fraude y abusos.', 'Cumplir obligaciones legales.'] },
            { h: '4. Con quién compartimos su información', p: ['No vendemos su información personal ni la compartimos para publicidad conductual entre contextos. Solo la compartimos con proveedores de servicios que la procesan en nuestro nombre y bajo obligaciones de confidencialidad:'], ul: ['Web3Forms (entrega de los mensajes del formulario de contacto a nuestro correo).', 'Vercel Inc. (alojamiento del sitio web).', 'Autoridades, cuando la ley lo exija o para proteger nuestros derechos.'] },
            { h: '5. Cookies y señales de privacidad', p: ['Este sitio no establece cookies de seguimiento. Consulte nuestra Política de Cookies. Respetamos la señal Global Privacy Control (GPC) y “No rastrear”: al no rastrearle, su configuración se cumple automáticamente.'] },
            { h: '6. Conservación', p: ['Conservamos los mensajes de contacto solo el tiempo necesario para atender su solicitud y cumplir requisitos legales o contables, y luego los eliminamos o anonimizamos.'] },
            { h: '7. Sus derechos de privacidad', p: ['Dependiendo de su estado de residencia (por ejemplo, California — CCPA/CPRA; Texas — Texas Data Privacy and Security Act; y otros), puede tener derecho a:'], ul: ['Saber qué información personal tenemos sobre usted y acceder a ella.', 'Corregir información inexacta.', 'Solicitar la eliminación de su información.', 'Obtener una copia portátil de su información.', 'Optar por no participar en la venta, el uso compartido para publicidad dirigida o la elaboración de perfiles (no realizamos ninguna de estas actividades).', 'No sufrir discriminación por ejercer sus derechos.'] },
            { h: '', p: [`Para ejercer sus derechos, contáctenos ${contact}. Podemos verificar su identidad antes de responder. Responderemos dentro de los 45 días siguientes (prorrogables según la ley). Si rechazamos su solicitud, puede apelar respondiendo a nuestra comunicación y, si lo desea, presentar una queja ante la Fiscalía General de su estado.`, 'Residentes de California: conforme al “Shine the Light” (Código Civil §1798.83), no compartimos información personal con terceros para sus fines de marketing directo.'] },
            { h: '8. Llamadas y mensajes de texto (TCPA)', p: ['Al proporcionar su número de teléfono y marcar la casilla de consentimiento, usted acepta que podamos llamarle o enviarle mensajes de texto relacionados con su solicitud (cotizaciones, disponibilidad, citas y seguimiento). El consentimiento no es una condición para comprar. Pueden aplicarse tarifas de mensajes y datos. La frecuencia de los mensajes varía. Responda STOP para cancelar o HELP para ayuda en cualquier momento. No compartimos números de teléfono ni consentimientos de mensajes de texto con terceros con fines de marketing.'] },
            { h: '9. Menores de edad', p: ['Este sitio no está dirigido a menores de 13 años y no recopilamos intencionalmente información de ellos (COPPA). Si cree que un menor nos ha enviado información, contáctenos para eliminarla.'] },
            { h: '10. Seguridad', p: ['Usamos conexiones cifradas (HTTPS/HSTS) y limitamos el acceso a la información. Ningún método de transmisión por Internet es 100 % seguro, por lo que no podemos garantizar seguridad absoluta.'] },
            { h: '11. Enlaces de terceros', p: ['El sitio puede enlazar a redes sociales u otros sitios que no controlamos. Sus prácticas de privacidad se rigen por sus propias políticas.'] },
            { h: '12. Cambios a esta política', p: ['Podemos actualizar esta política; publicaremos la versión vigente con su fecha de actualización en esta página.'] },
            { h: '13. Contacto', p: [`Para preguntas sobre privacidad, contáctenos ${contact}.`] },
          ]
        : [
            { h: '1. Who we are', p: [`${b.name} (“we,” “us”) operates the website ${b.domain} from ${where}. This policy explains what information we collect when you visit the site or contact us, how we use it, and the choices you have.`] },
            { h: '2. Information we collect', p: ['Information you voluntarily provide when you submit the contact form or otherwise communicate with us:'], ul: ['Name, email address, and phone number (optional).', 'Service of interest and the content of your message.', 'Your consent to be contacted by call, text message, or email.'] },
            { h: '', p: ['Technical information collected automatically by our hosting provider (Vercel Inc.) in server logs: IP address, browser type, pages requested, and date/time. We do not use advertising cookies, tracking pixels, or third-party analytics tools on this site.'] },
            { h: '3. How we use your information', ul: ['To respond to your inquiries and prepare quotes or estimates.', 'To communicate with you about the service you requested (call, text, or email).', 'To protect the site against spam, fraud, and abuse.', 'To comply with legal obligations.'] },
            { h: '4. Who we share information with', p: ['We do not sell your personal information and we do not share it for cross-context behavioral advertising. We share it only with service providers that process it on our behalf under confidentiality obligations:'], ul: ['Web3Forms (delivery of contact-form messages to our inbox).', 'Vercel Inc. (website hosting).', 'Authorities, when required by law or to protect our rights.'] },
            { h: '5. Cookies and privacy signals', p: ['This site does not set tracking cookies. See our Cookie Policy. We honor the Global Privacy Control (GPC) and “Do Not Track” signals; because we do not track you, your preference is respected automatically.'] },
            { h: '6. Retention', p: ['We keep contact messages only as long as needed to handle your request and meet legal or accounting requirements, then delete or anonymize them.'] },
            { h: '7. Your privacy rights', p: ['Depending on your state of residence (for example California — CCPA/CPRA; Texas — Texas Data Privacy and Security Act; and others), you may have the right to:'], ul: ['Know what personal information we hold about you and access it.', 'Correct inaccurate information.', 'Request deletion of your information.', 'Obtain a portable copy of your information.', 'Opt out of the sale, sharing for targeted advertising, or profiling (we do none of these).', 'Not be discriminated against for exercising your rights.'] },
            { h: '', p: [`To exercise your rights, contact us ${contact}. We may verify your identity before responding. We will respond within 45 days (extendable as permitted by law). If we deny your request, you may appeal by replying to our response and, if you wish, file a complaint with your state Attorney General.`, 'California residents: under “Shine the Light” (Civil Code §1798.83), we do not disclose personal information to third parties for their direct marketing purposes.'] },
            { h: '8. Calls and text messages (TCPA)', p: ['By providing your phone number and checking the consent box, you agree that we may call or text you about your request (quotes, availability, appointments, and follow-up). Consent is not a condition of purchase. Message and data rates may apply. Message frequency varies. Reply STOP to cancel or HELP for help at any time. We do not share phone numbers or text-message opt-in consent with third parties for marketing purposes.'] },
            { h: '9. Children', p: ['This site is not directed to children under 13 and we do not knowingly collect their information (COPPA). If you believe a child has sent us information, contact us so we can delete it.'] },
            { h: '10. Security', p: ['We use encrypted connections (HTTPS/HSTS) and limit access to information. No method of transmission over the Internet is 100% secure, so we cannot guarantee absolute security.'] },
            { h: '11. Third-party links', p: ['The site may link to social networks or other sites we do not control. Their privacy practices are governed by their own policies.'] },
            { h: '12. Changes to this policy', p: ['We may update this policy; the current version with its update date will be posted on this page.'] },
            { h: '13. Contact', p: [`For privacy questions, contact us ${contact}.`] },
          ],
    };
  }

  if (kind === 'terms') {
    const auto = b.industry === 'auto';
    return {
      kind,
      title: es ? 'Términos de Uso' : 'Terms of Use',
      description: es
        ? `Condiciones para usar el sitio web de ${b.name}: uso permitido, cotizaciones, propiedad intelectual, limitación de responsabilidad y ley aplicable (Texas).`
        : `Conditions for using the ${b.name} website: acceptable use, estimates, intellectual property, limitation of liability, and governing law (Texas).`,
      updatedLabel,
      updated,
      sections: es
        ? [
            { h: '1. Aceptación', p: [`Al acceder o usar ${b.domain} usted acepta estos Términos de Uso y nuestra Política de Privacidad. Si no está de acuerdo, no use el sitio.`] },
            { h: '2. Información del sitio, precios y cotizaciones', p: [auto ? 'El contenido del sitio (servicios, marcas de llantas, especiales y precios) es informativo y puede cambiar sin previo aviso. Las promociones están sujetas a disponibilidad y a condiciones del taller. Una cotización o estimado no constituye un contrato; el trabajo se realiza únicamente tras su autorización y se factura según la orden de servicio. Las llantas usadas se venden según su condición inspeccionada.' : 'El contenido del sitio (servicios, ejemplos de trabajos y descripciones) es informativo. Los proyectos, plazos, precios y entregables se definen únicamente en una propuesta o contrato por escrito firmado por ambas partes. Los resultados de marketing o diseño pueden variar y no se garantizan resultados comerciales específicos.'] },
            { h: '3. Uso permitido', ul: ['No use el sitio de forma ilegal, fraudulenta o que interfiera con su funcionamiento.', 'No envíe spam, malware ni contenido ofensivo a través de los formularios.', 'No intente acceder sin autorización a sistemas o datos.', 'No copie ni raspe masivamente el contenido con fines comerciales sin permiso.'] },
            { h: '4. Propiedad intelectual y marcas de terceros', p: [`El diseño, textos, gráficos y logotipos de ${b.name} están protegidos por derechos de autor y marcas. ${auto ? 'Los nombres y logotipos de marcas de llantas y vehículos pertenecen a sus respectivos propietarios, se muestran solo para identificar productos y no implican patrocinio ni afiliación.' : 'Los nombres, logotipos y materiales de clientes mostrados en el portafolio pertenecen a sus respectivos propietarios y se muestran únicamente para ilustrar nuestro trabajo.'}`] },
            { h: '5. Exención de garantías', p: ['El sitio se ofrece “tal cual” y “según disponibilidad”, sin garantías de ningún tipo, expresas o implícitas, en la máxima medida permitida por la ley. No garantizamos que el sitio esté libre de errores o interrupciones.'] },
            { h: '6. Limitación de responsabilidad', p: [`En la máxima medida permitida por la ley, ${b.name} no será responsable por daños indirectos, incidentales, especiales o consecuentes derivados del uso del sitio. Nada en estos términos limita responsabilidades que no puedan limitarse legalmente.`] },
            { h: '7. Indemnización', p: ['Usted acepta indemnizarnos frente a reclamaciones derivadas de su uso indebido del sitio o de su incumplimiento de estos términos.'] },
            { h: '8. Mensajes y comunicaciones', p: ['Al enviar el formulario y dar su consentimiento, podemos comunicarnos con usted por llamada, texto o correo según se describe en la Política de Privacidad. Puede cancelar en cualquier momento respondiendo STOP.'] },
            { h: '9. Enlaces de terceros', p: ['No somos responsables del contenido ni de las prácticas de sitios de terceros enlazados.'] },
            { h: '10. Ley aplicable y jurisdicción', p: [`Estos términos se rigen por las leyes del Estado de Texas, sin considerar sus normas de conflicto de leyes. Cualquier disputa se someterá a los tribunales estatales o federales con jurisdicción en el condado de ${b.county}, Texas.`] },
            { h: '11. Cambios', p: ['Podemos modificar estos términos en cualquier momento; el uso continuo del sitio implica aceptación de la versión vigente.'] },
            { h: '12. Contacto', p: [`Para preguntas sobre estos términos, contáctenos ${contact}.`] },
          ]
        : [
            { h: '1. Acceptance', p: [`By accessing or using ${b.domain} you agree to these Terms of Use and our Privacy Policy. If you do not agree, do not use the site.`] },
            { h: '2. Site information, pricing, and estimates', p: [auto ? 'Site content (services, tire brands, specials, and prices) is informational and may change without notice. Promotions are subject to availability and shop conditions. A quote or estimate is not a contract; work is performed only after your authorization and is billed per the service order. Used tires are sold in their inspected condition.' : 'Site content (services, work samples, and descriptions) is informational. Projects, timelines, pricing, and deliverables are defined only in a written proposal or agreement signed by both parties. Marketing and design results may vary and no specific business outcome is guaranteed.'] },
            { h: '3. Acceptable use', ul: ['Do not use the site unlawfully, fraudulently, or in a way that interferes with its operation.', 'Do not submit spam, malware, or offensive content through the forms.', 'Do not attempt unauthorized access to systems or data.', 'Do not mass-copy or scrape content for commercial purposes without permission.'] },
            { h: '4. Intellectual property and third-party marks', p: [`The design, text, graphics, and logos of ${b.name} are protected by copyright and trademark law. ${auto ? 'Tire and vehicle brand names and logos belong to their respective owners, are shown only to identify products, and do not imply sponsorship or affiliation.' : 'Client names, logos, and materials shown in the portfolio belong to their respective owners and are shown only to illustrate our work.'}`] },
            { h: '5. Disclaimer of warranties', p: ['The site is provided “as is” and “as available,” without warranties of any kind, express or implied, to the fullest extent permitted by law. We do not warrant that the site will be error-free or uninterrupted.'] },
            { h: '6. Limitation of liability', p: [`To the fullest extent permitted by law, ${b.name} will not be liable for indirect, incidental, special, or consequential damages arising from use of the site. Nothing in these terms limits liability that cannot be limited by law.`] },
            { h: '7. Indemnification', p: ['You agree to indemnify us against claims arising from your misuse of the site or breach of these terms.'] },
            { h: '8. Messages and communications', p: ['By submitting the form and giving consent, we may contact you by call, text, or email as described in the Privacy Policy. You may opt out at any time by replying STOP.'] },
            { h: '9. Third-party links', p: ['We are not responsible for the content or practices of linked third-party sites.'] },
            { h: '10. Governing law and venue', p: [`These terms are governed by the laws of the State of Texas, without regard to conflict-of-law rules. Any dispute will be brought in the state or federal courts located in ${b.county} County, Texas.`] },
            { h: '11. Changes', p: ['We may modify these terms at any time; continued use of the site constitutes acceptance of the current version.'] },
            { h: '12. Contact', p: [`For questions about these terms, contact us ${contact}.`] },
          ],
    };
  }

  if (kind === 'cookies') {
    return {
      kind,
      title: es ? 'Política de Cookies' : 'Cookie Policy',
      description: es
        ? `${b.name} no utiliza cookies de seguimiento ni de publicidad en su sitio web. Conozca qué almacenamiento técnico se usa y cómo controlarlo.`
        : `${b.name} does not use tracking or advertising cookies on its website. Learn what technical storage is used and how to control it.`,
      updatedLabel,
      updated,
      sections: es
        ? [
            { h: '1. Qué son las cookies', p: ['Las cookies son pequeños archivos que un sitio guarda en su navegador para recordar información. Las tecnologías similares incluyen el almacenamiento local y los píxeles de seguimiento.'] },
            { h: '2. Lo que usamos en este sitio', p: ['Este sitio no establece cookies de publicidad ni de rastreo de terceros. Solo utilizamos una clave técnica en el almacenamiento local de su navegador para recordar que usted cerró el aviso informativo de cookies y privacidad, sin identificarle ni seguir su actividad.'] },
            { h: '3. Registros del servidor', p: ['Nuestro proveedor de alojamiento (Vercel) puede registrar datos técnicos de la solicitud (IP, navegador, fecha/hora) por seguridad y funcionamiento. Estos registros no se utilizan para perfilarle.'] },
            { h: '4. Enlaces externos', p: ['Si hace clic en enlaces a redes sociales u otros sitios, estos pueden establecer sus propias cookies bajo sus propias políticas.'] },
            { h: '5. Cambios futuros', p: ['Si en el futuro incorporamos analítica, mapas, videos u otras herramientas que usen cookies, actualizaremos esta política y solicitaremos su consentimiento antes de activarlas cuando la ley lo exija.'] },
            { h: '6. Cómo controlar cookies', p: ['Puede bloquear o eliminar cookies desde la configuración de su navegador y activar la señal Global Privacy Control (GPC). Respetamos estas preferencias.'] },
            { h: '7. Contacto', p: [`Preguntas: contáctenos ${contact}.`] },
          ]
        : [
            { h: '1. What cookies are', p: ['Cookies are small files a website stores in your browser to remember information. Similar technologies include local storage and tracking pixels.'] },
            { h: '2. What we use on this site', p: ['This site does not set advertising or third-party tracking cookies. We use only a single technical key in your browser local storage to remember that you dismissed the informational cookie and privacy notice, without identifying you or tracking your activity.'] },
            { h: '3. Server logs', p: ['Our hosting provider (Vercel) may log technical request data (IP, browser, date/time) for security and operation. These logs are not used to profile you.'] },
            { h: '4. External links', p: ['If you click links to social networks or other sites, they may set their own cookies under their own policies.'] },
            { h: '5. Future changes', p: ['If we later add analytics, maps, videos, or other tools that use cookies, we will update this policy and request your consent before enabling them where the law requires.'] },
            { h: '6. How to control cookies', p: ['You can block or delete cookies in your browser settings and enable Global Privacy Control (GPC). We honor these preferences.'] },
            { h: '7. Contact', p: [`Questions: contact us ${contact}.`] },
          ],
    };
  }

  // accessibility
  return {
    kind,
    title: es ? 'Declaración de Accesibilidad' : 'Accessibility Statement',
    description: es
      ? `Compromiso de ${b.name} con la accesibilidad web (WCAG 2.1 AA) y cómo reportar barreras.`
      : `${b.name}'s commitment to web accessibility (WCAG 2.1 AA) and how to report barriers.`,
    updatedLabel,
    updated,
    sections: es
      ? [
          { h: '1. Nuestro compromiso', p: [`${b.name} quiere que su sitio web sea utilizable por todas las personas, incluidas las que tienen discapacidades. Trabajamos para cumplir las Pautas de Accesibilidad para el Contenido Web (WCAG) 2.1 nivel AA.`] },
          { h: '2. Medidas que aplicamos', ul: ['HTML semántico, un solo encabezado H1 por página y orden lógico de encabezados.', 'Navegación completa por teclado con indicadores de foco visibles.', 'Texto alternativo en imágenes informativas y etiquetas en los campos de formulario.', 'Contraste de color suficiente y diseño adaptable a móviles y zoom.', 'Respeto de la preferencia “reducir movimiento” del sistema.', 'Contenido disponible en inglés y español.'] },
          { h: '3. Limitaciones conocidas', p: ['A pesar de nuestros esfuerzos, algunas partes del sitio pueden no ser totalmente accesibles (por ejemplo, ciertas imágenes de marcas de terceros). Seguimos mejorando.'] },
          { h: '4. Comentarios y solicitudes', p: [`Si encuentra una barrera de accesibilidad o necesita la información en otro formato, contáctenos ${contact}. Describa el problema y la página afectada; responderemos lo antes posible y ofreceremos una alternativa razonable.`] },
        ]
      : [
          { h: '1. Our commitment', p: [`${b.name} wants its website to be usable by everyone, including people with disabilities. We work to meet the Web Content Accessibility Guidelines (WCAG) 2.1 Level AA.`] },
          { h: '2. Measures we apply', ul: ['Semantic HTML, a single H1 per page, and a logical heading order.', 'Full keyboard navigation with visible focus indicators.', 'Alt text on informative images and labels on form fields.', 'Sufficient color contrast and a layout that adapts to mobile devices and zoom.', 'Respect for the system “reduce motion” preference.', 'Content available in English and Spanish.'] },
          { h: '3. Known limitations', p: ['Despite our efforts, some parts of the site may not be fully accessible (for example, certain third-party brand images). We continue to improve.'] },
          { h: '4. Feedback and requests', p: [`If you find an accessibility barrier or need information in another format, contact us ${contact}. Describe the problem and the affected page; we will respond as soon as possible and offer a reasonable alternative.`] },
        ],
  };
}

export const SMS_CONSENT: Record<Locale, { before: string; privacy: string; and: string; terms: string; after: string }> = {
  en: {
    before: 'I agree to be contacted by call, text, or email about my request. Msg & data rates may apply; reply STOP to opt out. Consent is not a condition of purchase. See our ',
    privacy: 'Privacy Policy',
    and: ' and ',
    terms: 'Terms of Use',
    after: '.',
  },
  es: {
    before: 'Acepto ser contactado por llamada, texto o correo sobre mi solicitud. Pueden aplicar tarifas de mensajes y datos; responda STOP para cancelar. El consentimiento no es condición de compra. Consulte nuestra ',
    privacy: 'Política de Privacidad',
    and: ' y los ',
    terms: 'Términos de Uso',
    after: '.',
  },
};
