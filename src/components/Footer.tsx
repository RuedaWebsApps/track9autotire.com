import type { SiteContent } from '../content/siteData';
import { LEGAL_KINDS, legalLabel, legalPath } from '../legal/legalDocs';

interface FooterProps {
  content: SiteContent;
}

export function Footer({ content }: FooterProps) {
  const isEs = content.locale === 'es';
  const navPrefix = isEs ? '/es' : '/';
  const locale = isEs ? 'es' : 'en';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#060e03] text-white/80 border-t border-white/10 pt-12 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10 pb-10 border-b border-white/10">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-4">
            <a
              href={isEs ? '/es' : '/'}
              className="inline-block focus:outline-none focus:ring-2 focus:ring-[#c3e942] rounded-lg"
            >
              <img
                src="/images/track9-logo-320.webp"
                alt="Track 9 Auto & Tire"
                width={160}
                height={48}
                className="h-10 w-auto object-contain"
              />
            </a>
            <p className="text-xs sm:text-sm text-white/70 max-w-sm leading-relaxed">
              {isEs
                ? 'Tu taller y llantera de confianza con 18 años de experiencia en llantas nuevas y usadas, frenos, amortiguadores y mecánica preventiva en Dallas, Texas.'
                : 'Your trusted tire and auto care shop with 18 years of hands-on experience in new and used tires, brakes, suspension, and preventive repair in Dallas, Texas.'}
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#c3e942] mb-3">
              {isEs ? 'Enlaces Rápidos' : 'Quick Links'}
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <a
                  href={`${navPrefix}#${isEs ? 'servicios' : 'services'}`}
                  className="hover:text-[#c3e942] transition-colors"
                >
                  {isEs ? 'Servicios' : 'Services'}
                </a>
              </li>
              <li>
                <a
                  href={`${navPrefix}#${isEs ? 'marcas' : 'brands'}`}
                  className="hover:text-[#c3e942] transition-colors"
                >
                  {isEs ? 'Marcas de Llantas' : 'Tire Brands'}
                </a>
              </li>
              <li>
                <a
                  href={`${navPrefix}#${isEs ? 'especiales' : 'specials'}`}
                  className="hover:text-[#c3e942] transition-colors"
                >
                  {isEs ? 'Especiales' : 'Specials'}
                </a>
              </li>
              <li>
                <a
                  href={`${navPrefix}#${isEs ? 'experiencia' : 'about'}`}
                  className="hover:text-[#c3e942] transition-colors"
                >
                  {isEs ? 'Nuestra Historia' : 'Our Story'}
                </a>
              </li>
              <li>
                <a
                  href={`${navPrefix}#${isEs ? 'contacto' : 'contact'}`}
                  className="hover:text-[#c3e942] transition-colors"
                >
                  {isEs ? 'Contacto' : 'Contact'}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Direct */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#c3e942] mb-3">
              {isEs ? 'Atención Inmediata' : 'Direct Support'}
            </h4>
            <div className="space-y-2 text-xs sm:text-sm text-white/80">
              <div>
                <span className="block text-white/50 text-[11px] uppercase">
                  {isEs ? 'Teléfono & Texto:' : 'Phone & Text:'}
                </span>
                <a
                  href="tel:+12145248939"
                  className="text-white font-bold hover:text-[#c3e942] transition-colors"
                >
                  (214) 524-8939
                </a>
              </div>
              <div className="pt-2">
                <span className="block text-white/50 text-[11px] uppercase">
                  {isEs ? 'Zona de Servicio:' : 'Service Area:'}
                </span>
                <span className="font-semibold text-white">Dallas, TX & Surrounding Areas</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/60">
          <div>
            © {new Date().getFullYear()} Track 9 Auto & Tire. {isEs ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </div>

          <nav
            aria-label={isEs ? 'Información legal' : 'Legal'}
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1"
          >
            {LEGAL_KINDS.map((k) => (
              <a key={k} href={legalPath(k, locale)} className="hover:text-[#c3e942] transition-colors underline-offset-2 hover:underline">
                {legalLabel(k, locale)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <span className="text-white/60">{content.footerCredit}</span>
            <button
              type="button"
              onClick={scrollToTop}
              aria-label={isEs ? 'Volver arriba' : 'Back to top'}
              className="p-2 rounded-full bg-white/10 hover:bg-[#c3e942] hover:text-[#060e03] text-white transition-all focus:outline-none"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
