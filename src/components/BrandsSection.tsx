import type { SiteContent } from '../content/siteData';

interface BrandsSectionProps {
  content: SiteContent;
}

export function BrandsSection({ content }: BrandsSectionProps) {
  const isEs = content.locale === 'es';
  const { brands, popularItems } = content;
  const contactAnchor = isEs ? '#contacto' : '#contact';

  return (
    <section
      id={isEs ? 'marcas' : 'brands'}
      className="py-16 sm:py-24 bg-[#e3eaf2] relative scroll-mt-20 overflow-hidden"
    >
      {/* Decorative tyre track background effect */}
      <div
        className="absolute inset-0 opacity-5 pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(#293279 1.5px, transparent 1.5px), radial-gradient(#060e03 1.5px, #e3eaf2 1.5px)',
          backgroundSize: '36px 36px',
        }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Visual Tire Showcase */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative max-w-sm sm:max-w-md w-full">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-white/50 p-2">
                <picture>
                  <source srcSet="/images/used-brands-tire-800.avif" type="image/avif" />
                  <source srcSet="/images/used-brands-tire-800.webp" type="image/webp" />
                  <img
                    src="/images/used-brands-tire-800.webp"
                    alt={brands.tireAlt}
                    width={800}
                    height={600}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto object-contain rounded-2xl transform hover:scale-105 transition-transform duration-500"
                  />
                </picture>
              </div>

              {/* Quality Seal Badge */}
              <div className="absolute -bottom-4 -right-4 bg-[#293279] text-white px-5 py-2.5 rounded-2xl shadow-xl border-2 border-white text-xs sm:text-sm font-black uppercase tracking-wider">
                {isEs ? 'Llantas Seleccionadas' : 'Selected Quality'}
              </div>
            </div>
          </div>

          {/* Right Column: Heading, Used Brands Pills & Partner Logos */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#293279] bg-[#293279]/10 px-3.5 py-1 rounded-full">
                {isEs ? 'Inventario Multimarca' : 'Multi-Brand Inventory'}
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#060e03] mt-3 tracking-tight">
                {brands.heading}
              </h2>
              <p className="text-lg font-bold text-[#293279] mt-2">
                {brands.usedHeading}
              </p>
            </div>

            {/* Brands Pills Cloud */}
            <div className="flex flex-wrap gap-2 sm:gap-2.5 pt-2">
              {brands.usedList.map((brandName) => (
                <span
                  key={brandName}
                  className="bg-white/90 hover:bg-white text-[#060e03] text-xs sm:text-sm font-semibold px-3.5 py-1.5 rounded-full border border-gray-200 shadow-xs hover:border-[#293279] transition-all"
                >
                  {brandName}
                </span>
              ))}
            </div>

            {/* Popular Items / Major Brand Logos Row */}
            <div className="pt-6 border-t border-black/10">
              <h3 className="text-sm font-bold uppercase tracking-wider text-[#060e03]/70 mb-4">
                {popularItems.heading}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 items-center">
                {popularItems.logos.map((logo) => {
                  const mainWidth = logo.widths[0];
                  const maxWidth = logo.widths[logo.widths.length - 1];
                  return (
                    <div
                      key={logo.id}
                      className="bg-white rounded-xl p-3 border border-gray-200/80 shadow-xs flex items-center justify-center h-16 hover:shadow-md transition-shadow"
                    >
                      <picture>
                        <source
                          srcSet={
                            logo.widths.length > 1
                              ? `/images/${logo.baseName}-${maxWidth}.avif 2x, /images/${logo.baseName}-${mainWidth}.avif 1x`
                              : `/images/${logo.baseName}-${mainWidth}.avif`
                          }
                          type="image/avif"
                        />
                        <source
                          srcSet={
                            logo.widths.length > 1
                              ? `/images/${logo.baseName}-${maxWidth}.webp 2x, /images/${logo.baseName}-${mainWidth}.webp 1x`
                              : `/images/${logo.baseName}-${mainWidth}.webp`
                          }
                          type="image/webp"
                        />
                        <img
                          src={`/images/${logo.baseName}-${mainWidth}.webp`}
                          alt={logo.alt}
                          width={logo.width}
                          height={logo.height}
                          loading="lazy"
                          decoding="async"
                          className="max-h-10 max-w-full object-contain grayscale hover:grayscale-0 transition-all duration-300"
                        />
                      </picture>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Appointment CTA Button */}
            <div className="pt-4">
              <a
                href={contactAnchor}
                className="inline-flex items-center gap-2 bg-[#e61c2e] hover:bg-[#c31826] text-white text-base font-bold px-7 py-3.5 rounded-full shadow-lg shadow-[#e61c2e]/20 hover:shadow-xl transition-all transform hover:-translate-y-0.5"
              >
                <span>{brands.ctaText}</span>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
