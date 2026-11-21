import type { SiteContent } from '../content/siteData';

interface SpecialsSectionProps {
  content: SiteContent;
}

export function SpecialsSection({ content }: SpecialsSectionProps) {
  const isEs = content.locale === 'es';
  const { specials } = content;

  return (
    <section
      id={isEs ? 'especiales' : 'specials'}
      className="py-16 sm:py-24 bg-white relative scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#e61c2e] bg-[#e61c2e]/10 px-3.5 py-1 rounded-full">
            {isEs ? 'Promociones de Temporada' : 'Seasonal Promotions'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#060e03] mt-3 tracking-tight">
            {isEs ? 'Servicios Especiales' : 'Featured Specials'}
          </h2>
          <p className="text-sm sm:text-base text-gray-600 mt-3">
            {isEs
              ? 'Aprovecha nuestros servicios más solicitados con atención inmediata y precios transparentes.'
              : 'Take advantage of our most requested maintenance services with fast turnaround and fair rates.'}
          </p>
        </div>

        {/* 2 Big Special Offer Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Special 1: Flat Tires */}
          <div className="group relative bg-[#f8fafc] rounded-3xl overflow-hidden border border-gray-200/80 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1">
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
              <picture>
                <source srcSet="/images/special-flat-tire-800.avif" type="image/avif" />
                <source srcSet="/images/special-flat-tire-800.webp" type="image/webp" />
                <img
                  src="/images/special-flat-tire-800.webp"
                  alt={specials.flatTires.alt}
                  width={800}
                  height={500}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </picture>
              {/* Badge */}
              <div className="absolute top-4 left-4 bg-[#e61c2e] text-white text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                {specials.flatTires.eyebrow}
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-black text-[#060e03] mb-3 group-hover:text-[#293279] transition-colors">
                  {specials.flatTires.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {isEs
                    ? '¿Tuviste una ponchadura en el camino? Inspeccionamos la llanta, reparamos con parche vulcanizado seguro y verificamos la presión para que continúes sin preocupaciones.'
                    : 'Got a flat on the road? We thoroughly inspect the tire, apply a durable vulcanized repair, and verify tire pressure so you can drive with complete peace of mind.'}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-200 flex items-center justify-between">
                <span className="text-xs font-bold text-[#293279] uppercase tracking-wider">
                  {isEs ? 'Atención Rápida' : 'Quick Turnaround'}
                </span>
                <a
                  href="tel:+12145248939"
                  className="inline-flex items-center gap-1.5 bg-[#060e03] hover:bg-[#293279] text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full transition-colors"
                >
                  <span>{isEs ? 'Llamar al taller' : 'Call the Shop'}</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Special 2: Oil Changes */}
          <div className="group relative bg-[#f8fafc] rounded-3xl overflow-hidden border border-gray-200/80 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1">
            <div className="relative aspect-[16/10] overflow-hidden bg-gray-900">
              <picture>
                <source srcSet="/images/special-oil-change-800.avif" type="image/avif" />
                <source srcSet="/images/special-oil-change-800.webp" type="image/webp" />
                <img
                  src="/images/special-oil-change-800.webp"
                  alt={specials.oilChanges.alt}
                  width={800}
                  height={500}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </picture>
              {/* Badge */}
              <div className="absolute top-4 left-4 bg-[#293279] text-white text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-md">
                {specials.oilChanges.eyebrow}
              </div>
            </div>

            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-black text-[#060e03] mb-3 group-hover:text-[#293279] transition-colors">
                  {specials.oilChanges.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {isEs
                    ? 'Aceite sintético, semisintético y convencional de primera calidad con reemplazo de filtro nuevo para mantener la potencia y alargar la vida útil de tu motor.'
                    : 'Full synthetic, synthetic blend, and high-mileage oil service with a brand new filter to keep your engine running smoothly, efficiently, and protected.'}
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-gray-200 flex items-center justify-between">
                <span className="text-xs font-bold text-[#293279] uppercase tracking-wider">
                  {isEs ? 'Filtro Incluido' : 'Filter Included'}
                </span>
                <a
                  href="tel:+12145248939"
                  className="inline-flex items-center gap-1.5 bg-[#060e03] hover:bg-[#293279] text-white text-xs sm:text-sm font-bold px-4 py-2 rounded-full transition-colors"
                >
                  <span>{isEs ? 'Cotizar cambio' : 'Get Quote'}</span>
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
