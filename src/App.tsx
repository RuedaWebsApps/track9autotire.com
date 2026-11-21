import { useState } from 'react';
import type { Locale } from './lib/contactAdapter';
import { SITE_DATA } from './content/siteData';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { ServicesSection } from './components/ServicesSection';
import { BrandsSection } from './components/BrandsSection';
import { SpecialsSection } from './components/SpecialsSection';
import { ExperienceSection } from './components/ExperienceSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { LegalPage } from './components/LegalPage';
import { CookieBanner } from './components/CookieBanner';
import { resolveLegalRoute } from './legal/legalDocs';

interface AppProps {
  initialLocale?: Locale;
  initialPath?: string;
}

export function App({ initialLocale, initialPath }: AppProps) {
  const currentPath =
    initialPath ?? (typeof window !== 'undefined' ? window.location.pathname : '/');

  const legalMatch = resolveLegalRoute(currentPath);

  let activeLocale: Locale = initialLocale || (legalMatch ? legalMatch.locale : 'en');
  if (!initialLocale && !legalMatch) {
    activeLocale = currentPath.startsWith('/es') ? 'es' : 'en';
  }

  const content = SITE_DATA[activeLocale];
  const [modalImage, setModalImage] = useState<{ url: string; alt: string } | null>(null);

  if (legalMatch) {
    return (
      <>
        <LegalPage content={SITE_DATA[legalMatch.locale]} kind={legalMatch.kind} locale={legalMatch.locale} />
        <CookieBanner locale={legalMatch.locale} />
      </>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white text-[#060e03] selection:bg-[#c3e942] selection:text-[#060e03]">
      {/* ADA Skip to main content link */}
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-[#c3e942] focus:text-[#060e03] focus:font-bold"
      >
        {activeLocale === 'es' ? 'Saltar al contenido principal' : 'Skip to main content'}
      </a>

      {/* Top Navigation */}
      <Navbar content={content} currentLocale={activeLocale} />

      {/* Main Page Sections */}
      <main id="main" className="flex-1">
        <HeroSection content={content} />
        <ServicesSection content={content} />
        <BrandsSection content={content} />
        <SpecialsSection content={content} />
        <ExperienceSection
          content={content}
          onSelectImage={(url, alt) => setModalImage({ url, alt })}
        />
        <ContactSection content={content} />
      </main>

      {/* Footer */}
      <Footer content={content} />

      {/* Cookie & Privacy Notice */}
      <CookieBanner locale={activeLocale} />

      {/* Lightbox Modal */}
      {modalImage && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Image Preview"
          onClick={() => setModalImage(null)}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div
            className="relative max-w-4xl max-h-[90vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={modalImage.url}
              alt={modalImage.alt}
              className="max-w-full max-h-[82vh] object-contain rounded-2xl shadow-2xl border border-white/20"
            />
            <p className="text-white text-xs sm:text-sm mt-3 font-medium text-center">
              {modalImage.alt}
            </p>
            <button
              type="button"
              onClick={() => setModalImage(null)}
              aria-label="Close modal"
              className="absolute -top-12 right-0 text-white/80 hover:text-white p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
export default App;
