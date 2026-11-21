import type { SiteContent } from '../content/siteData';
import {
  OilWrenchIcon,
  SuspensionCogsIcon,
  BrakeDiscIcon,
  AlignmentWheelIcon,
} from './Icons';

interface ServicesSectionProps {
  content: SiteContent;
}

export function ServicesSection({ content }: ServicesSectionProps) {
  const isEs = content.locale === 'es';
  const { services } = content;

  const topCards = [
    {
      id: 'tires-sale',
      title: services.cards.tiresSale.title,
      alt: services.cards.tiresSale.alt,
      imageAvif: '/images/service-tires-sale-800.avif',
      imageWebp: '/images/service-tires-sale-800.webp',
      description: isEs
        ? 'Gran variedad de marcas y medidas en llantas nuevas y seminuevas con la mejor relación calidad-precio.'
        : 'Wide selection of new and quality used tires in all sizes at honest, competitive prices.',
    },
    {
      id: 'tire-repair',
      title: services.cards.tireRepair.title,
      alt: services.cards.tireRepair.alt,
      imageAvif: '/images/service-tire-repair-800.avif',
      imageWebp: '/images/service-tire-repair-800.webp',
      description: isEs
        ? 'Parches vulcanizados, rotación, revisión de presión y diagnóstico preventivo para tu seguridad.'
        : 'Puncture repair, tire rotation, pressure checks, and preventive diagnostics to keep you safe.',
    },
    {
      id: 'brakes',
      title: services.cards.brakes.title,
      alt: services.cards.brakes.alt,
      imageAvif: '/images/service-brakes-800.avif',
      imageWebp: '/images/service-brakes-800.webp',
      description: isEs
        ? 'Inspección completa, cambio de balatas/pastillas y rectificación para un frenado firme y silencioso.'
        : 'Complete inspection, pad replacement, and rotor service for firm, quiet, and reliable braking.',
    },
  ];

  const getFeatureIcon = (id: string) => {
    switch (id) {
      case 'oil':
        return <OilWrenchIcon className="w-8 h-8 text-[#293279]" />;
      case 'shocks':
        return <SuspensionCogsIcon className="w-8 h-8 text-[#293279]" />;
      case 'calipers':
        return <BrakeDiscIcon className="w-8 h-8 text-[#293279]" />;
      case 'alignment':
      default:
        return <AlignmentWheelIcon className="w-8 h-8 text-[#293279]" />;
    }
  };

  return (
    <section
      id={isEs ? 'servicios' : 'services'}
      className="py-16 sm:py-24 bg-white relative scroll-mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#e61c2e] bg-[#e61c2e]/10 px-3.5 py-1 rounded-full">
            {isEs ? 'Especialistas Automotrices' : 'Automotive Specialists'}
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-[#060e03] mt-3 tracking-tight">
            {services.heading}
          </h2>
          <div className="w-16 h-1 bg-[#293279] mx-auto mt-4 rounded-full" />
        </div>

        {/* 3 Main Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {topCards.map((card) => (
            <div
              key={card.id}
              className="group bg-[#f8fafc] rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col transform hover:-translate-y-1"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-gray-200">
                <picture>
                  <source srcSet={card.imageAvif} type="image/avif" />
                  <source srcSet={card.imageWebp} type="image/webp" />
                  <img
                    src={card.imageWebp}
                    alt={card.alt}
                    width={800}
                    height={500}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-[#060e03] mb-2.5 group-hover:text-[#293279] transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {card.description}
                  </p>
                </div>
                <div className="pt-5 mt-4 border-t border-gray-200/60">
                  <a
                    href="tel:+12145248939"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#e61c2e] hover:text-[#c31826] transition-colors"
                  >
                    <span>{isEs ? 'Cotizar servicio' : 'Inquire Now'}</span>
                    <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 4 Feature Service Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.features.map((feature) => (
            <div
              key={feature.id}
              className="bg-[#060e03] rounded-2xl p-6 text-white border border-white/10 shadow-lg hover:border-[#c3e942]/50 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center mb-5 border border-white/10">
                  {getFeatureIcon(feature.id)}
                </div>
                <h4 className="text-lg font-bold text-white mb-2 leading-snug">
                  {feature.title}
                </h4>
                <p className="text-xs sm:text-sm text-white/70 leading-relaxed">
                  {feature.description}
                </p>
              </div>

              <div className="pt-4 mt-6 border-t border-white/10 text-xs font-semibold text-[#c3e942]">
                {isEs ? 'Servicio Garantizado' : 'Guaranteed Service'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
