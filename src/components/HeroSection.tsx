import type { SiteContent } from '../content/siteData';

interface HeroSectionProps {
  content: SiteContent;
}

export function HeroSection({ content }: HeroSectionProps) {
  const isEs = content.locale === 'es';
  const contactAnchor = isEs ? '#contacto' : '#contact';

  return (
    <section className="relative pt-24 sm:pt-28 md:pt-32 pb-14 sm:pb-20 overflow-hidden bg-gradient-to-b from-[#e3eaf2] via-[#f1f5f9] to-white">
      {/* Background ambient accents */}
      <div
        className="absolute top-0 right-0 w-96 h-96 bg-[#293279]/5 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-10 left-0 w-80 h-80 bg-[#c3e942]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left copy & CTA column */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 animate-rise">
            {/* Experience Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#293279]/10 border border-[#293279]/20 text-[#293279] text-xs sm:text-sm font-bold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-[#e61c2e] animate-pulse" />
              <span>{isEs ? '18 Años de Experiencia en Llanteras' : '18 Years of Trusted Tire Experience'}</span>
            </div>

            {/* Main H1 Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-[#060e03] leading-[1.12] tracking-tight">
              {isEs ? (
                <>
                  TRACK 9:{' '}
                  <span className="text-[#293279]">
                    Tu destino confiable
                  </span>{' '}
                  para llantas, frenos y más.
                </>
              ) : (
                <>
                  TRACK 9:{' '}
                  <span className="text-[#293279]">
                    Your Trusted Destination
                  </span>{' '}
                  for Tires, Brakes, and More.
                </>
              )}
            </h1>

            {/* Description Subtext */}
            <p className="text-base sm:text-lg text-[#060e03]/80 leading-relaxed max-w-2xl">
              {isEs
                ? 'Ofrecemos venta de llantas nuevas y usadas de las mejores marcas, reparación de ponchaduras, servicio de frenos, cambios de aceite y amortiguadores en Dallas y alrededores. Atención honesta y rápida.'
                : 'Offering premium new and quality used tires, flat tire repair, brake jobs, oil changes, shocks, and alignment in the Dallas area. Fast, honest service and competitive pricing.'}
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="tel:+12145248939"
                className="inline-flex items-center justify-center gap-2.5 bg-[#e61c2e] hover:bg-[#c31826] text-white font-bold text-base px-6 py-3.5 rounded-full shadow-lg shadow-[#e61c2e]/25 hover:shadow-xl transition-all transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#293279]"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                <span>{isEs ? 'Llamar: (214) 524-8939' : 'Call: (214) 524-8939'}</span>
              </a>

              <a
                href={contactAnchor}
                className="inline-flex items-center justify-center gap-2 bg-[#293279] hover:bg-[#1d2459] text-white font-bold text-base px-6 py-3.5 rounded-full shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#293279]"
              >
                <span>{isEs ? 'Cotización Gratuita' : 'Get Free Quote'}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>

            {/* Quick Benefits list */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-black/10">
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#060e03]/90">
                <svg className="w-4 h-4 text-[#e61c2e] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>{isEs ? 'Llantas Nuevas y Usadas' : 'New & Used Tires'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#060e03]/90">
                <svg className="w-4 h-4 text-[#e61c2e] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>{isEs ? 'Servicio Rápido y Seguro' : 'Fast, Reliable Service'}</span>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#060e03]/90 col-span-2 sm:col-span-1">
                <svg className="w-4 h-4 text-[#e61c2e] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span>{isEs ? 'Atención Bilingüe' : 'Bilingual Support'}</span>
              </div>
            </div>
          </div>

          {/* Right visual imagery column */}
          <div className="lg:col-span-5 relative flex justify-center animate-rise-delay">
            <div className="relative w-full max-w-md lg:max-w-none">
              {/* Main Banner Image Container */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/20 border-4 border-white">
                <picture>
                  <source
                    media="(min-width: 640px)"
                    srcSet="/images/hero-banner-1080.avif"
                    type="image/avif"
                  />
                  <source
                    media="(min-width: 640px)"
                    srcSet="/images/hero-banner-1080.webp"
                    type="image/webp"
                  />
                  <source srcSet="/images/hero-banner-640.avif" type="image/avif" />
                  <source srcSet="/images/hero-banner-640.webp" type="image/webp" />
                  <img
                    src="/images/hero-banner-1080.webp"
                    alt={content.hero.bannerAlt}
                    width={1080}
                    height={720}
                    loading="eager"
                    fetchPriority="high"
                    className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
                  />
                </picture>

                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-3 left-4 right-4 text-white text-xs font-semibold drop-shadow">
                  {isEs ? 'Taller Profesional en Dallas, TX' : 'Professional Shop in Dallas, TX'}
                </div>
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-4 sm:-bottom-8 sm:-left-8 bg-[#060e03] rounded-2xl p-2.5 sm:p-3 shadow-2xl border-2 border-white/20 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                <picture>
                  <source srcSet="/images/track9-badge-480.avif" type="image/avif" />
                  <source srcSet="/images/track9-badge-480.webp" type="image/webp" />
                  <img
                    src="/images/track9-badge-480.webp"
                    alt={content.hero.badgeAlt}
                    width={120}
                    height={120}
                    className="w-20 h-20 sm:w-24 sm:h-24 object-contain"
                  />
                </picture>
              </div>

              {/* Floating Rating Card */}
              <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-xl border border-gray-100 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#c3e942]/20 flex items-center justify-center text-[#293279] font-black text-sm">
                  18+
                </div>
                <div>
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                    {isEs ? 'Experiencia' : 'Experience'}
                  </div>
                  <div className="text-sm font-extrabold text-[#060e03]">
                    {isEs ? 'Años en el oficio' : 'Years in Business'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
