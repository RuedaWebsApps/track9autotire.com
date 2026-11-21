import { Navbar } from './Navbar';
import { Footer } from './Footer';
import type { SiteContent } from '../content/siteData';
import { getLegalDoc, legalPath, legalLabel, LEGAL_KINDS, type LegalKind, type Locale } from '../legal/legalDocs';
import { LEGAL_BIZ } from '../legal/legalConfig';

interface LegalPageProps {
  content: SiteContent;
  kind: LegalKind;
  locale: Locale;
}

export function LegalPage({ content, kind, locale }: LegalPageProps) {
  const doc = getLegalDoc(kind, locale, LEGAL_BIZ);
  const isEs = locale === 'es';
  const other: Locale = isEs ? 'en' : 'es';

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#060e03]">
      <Navbar content={content} currentLocale={locale} altHref={legalPath(kind, other)} />
      <main id="main" className="flex-1 pt-28 sm:pt-32 pb-16">
        <article className="max-w-3xl mx-auto px-4 sm:px-6">
          <nav aria-label={isEs ? 'Documentos legales' : 'Legal documents'} className="mb-8 flex flex-wrap gap-2">
            {LEGAL_KINDS.map((k) => (
              <a
                key={k}
                href={legalPath(k, locale)}
                aria-current={k === kind ? 'page' : undefined}
                className={`px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-bold border transition-colors ${
                  k === kind
                    ? 'bg-[#293279] text-white border-[#293279]'
                    : 'bg-white text-[#293279] border-[#293279]/30 hover:bg-[#293279]/10'
                }`}
              >
                {legalLabel(k, locale)}
              </a>
            ))}
          </nav>

          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#060e03]">{doc.title}</h1>
          <p className="mt-2 text-sm text-[#060e03]/60">
            {doc.updatedLabel}: {doc.updated}
          </p>

          <div className="mt-8 space-y-4 text-[15px] leading-relaxed text-[#060e03]/85">
            {doc.sections.map((s, i) => (
              <section key={i} className={s.h ? 'pt-4' : ''}>
                {s.h && <h2 className="text-xl font-bold text-[#293279] mb-2">{s.h}</h2>}
                {s.p?.map((para, j) => (
                  <p key={j} className="mb-3">
                    {para}
                  </p>
                ))}
                {s.ul && (
                  <ul className="list-disc pl-6 space-y-1.5 mb-3">
                    {s.ul.map((li, j) => (
                      <li key={j}>{li}</li>
                    ))}
                  </ul>
                )}
              </section>
            ))}
          </div>
        </article>
      </main>
      <Footer content={content} />
    </div>
  );
}
