import ReactDOMServer from 'react-dom/server';
import { App } from './App';
import type { Locale } from './lib/contactAdapter';
import { SITE_DATA, buildJsonLd } from './content/siteData';
import {
  getLegalDoc,
  legalPath,
  resolveLegalRoute,
  type LegalKind,
} from './legal/legalDocs';
import { LEGAL_BIZ, SITE_URL } from './legal/legalConfig';

export function render(localeOrPath: string) {
  // Support passing 'en' | 'es' or a path like '/privacy' | '/es/privacidad'
  const path =
    localeOrPath === 'en'
      ? '/'
      : localeOrPath === 'es'
      ? '/es'
      : localeOrPath;

  const legalMatch = resolveLegalRoute(path);

  if (legalMatch) {
    const { kind, locale } = legalMatch;
    const otherLocale: Locale = locale === 'es' ? 'en' : 'es';
    const doc = getLegalDoc(kind, locale, LEGAL_BIZ);
    const html = ReactDOMServer.renderToString(
      <App initialLocale={locale} initialPath={path} />,
    );
    const canonical = `${SITE_URL}${legalPath(kind, locale)}`;
    const alternateEn = `${SITE_URL}${legalPath(kind, 'en')}`;
    const alternateEs = `${SITE_URL}${legalPath(kind, 'es')}`;

    return {
      html,
      locale,
      title: `${doc.title} | Track 9 Auto & Tire`,
      description: doc.description,
      canonical,
      alternateEn,
      alternateEs,
      ogLocale: locale === 'es' ? 'es_US' : 'en_US',
      ogAlternateLocale: otherLocale === 'es' ? 'es_US' : 'en_US',
      jsonLd: buildJsonLd(locale),
    };
  }

  const locale: Locale = path.startsWith('/es') ? 'es' : 'en';
  const content = SITE_DATA[locale];
  const html = ReactDOMServer.renderToString(
    <App initialLocale={locale} initialPath={path} />,
  );

  return {
    html,
    locale,
    title: content.seo.title,
    description: content.seo.description,
    canonical: content.canonical,
    alternateEn: `${SITE_URL}/`,
    alternateEs: `${SITE_URL}/es`,
    ogLocale: content.ogLocale,
    ogAlternateLocale: content.ogAlternateLocale,
    jsonLd: buildJsonLd(locale),
  };
}

export type { LegalKind };
