import type { SiteContent } from '../content/siteData';

interface BrandsSectionProps {
  content: SiteContent;
}

export function BrandsSection({ content }: BrandsSectionProps) {
  const isEs = content.locale === 'es';
  const { brands, popularItems } = content;
  const contactAnchor = isEs ? '#contacto' : '#contact';

  return (
    <>
      {/* =====================================================================
          SECTION 2 (et_pb_section_2): Used Tire Brands & Make an Appointment
         ===================================================================== */}
      <section
        id={isEs ? 'marcas' : 'brands'}
        className="w-full bg-[#e3eaf2] bg-no-repeat bg-top py-[54px] scroll-mt-[54px]"
        style={{
          backgroundImage: 'url(/images/bg-shape-top-1440.webp)',
          backgroundSize: 'initial',
        }}
      >
        <div className="max-w-[1080px] mx-auto px-5 sm:px-6 lg:px-0">
          {/* Row 1: Left-aligned H2 (max-width: 800px, Outfit 60px, #060e03) */}
          <div className="py-[27px]">
            <h2 className="font-outfit font-medium text-[26px] sm:text-[32px] lg:text-[60px] leading-[1.3em] text-[#060e03] max-w-[800px]">
              {brands.heading}
            </h2>
          </div>

          {/* Row 2 (column_structure="1_2,1_2", gutter_width="1" zero-gap, make_equal="on", custom_padding="|||8vw") */}
          <div className="py-[27px] lg:pl-[8vw] grid grid-cols-1 lg:grid-cols-2 items-stretch">
            {/* Left Column (1/2, bg #060e03, padding 40px): Tire Image + H3 "Some of Our Used Brands >>" */}
            <div className="bg-[#060e03] p-[20px] sm:p-[30px] lg:p-[40px] flex flex-col">
              <div className="mb-[30px]">
                <picture>
                  <source srcSet="/images/used-brands-tire-800.avif" type="image/avif" />
                  <source srcSet="/images/used-brands-tire-800.webp" type="image/webp" />
                  <img
                    src="/images/used-brands-tire-800.webp"
                    alt={brands.tireAlt}
                    width={800}
                    height={390}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto block object-cover"
                  />
                </picture>
              </div>
              <h3 className="font-outfit font-medium text-[22px] sm:text-[26px] lg:text-[40px] leading-[1.4em] text-white">
                {brands.usedHeading}
              </h3>
            </div>

            {/* Right Column (1/2, bg #293279, padding 40px): Vertical H5 Brand List + Black Pill Button */}
            <div className="bg-[#293279] p-[20px] sm:p-[30px] lg:p-[40px] flex flex-col justify-between">
              <div className="pt-[3px] divi-brands-hover-box">
                <h5 className="font-outfit font-medium text-[16px] sm:text-[18px] lg:text-[20px] leading-[1.4em] text-white">
                  {brands.usedList.map((brandName, i) => (
                    <span key={brandName}>
                      {brandName}
                      {i < brands.usedList.length - 1 && <br />}
                    </span>
                  ))}
                </h5>
              </div>

              {/* Divi Button (.et_pb_button_0): Black pill, Inter 14px bold, border-radius 100px, padding 12px 24px */}
              <div className="mt-[30px]">
                <a
                  href={contactAnchor}
                  className="inline-flex items-center justify-center bg-[#000000] hover:bg-[#1a1a1a] text-white font-inter text-[14px] font-bold leading-[1.7em] px-[24px] py-[12px] rounded-[100px] transition-all duration-300"
                >
                  {brands.ctaText}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION 3 (et_pb_section_3): Popular Items / 4 Brand Logos on #e3eaf2
         ===================================================================== */}
      <section className="w-full bg-[#e3eaf2] py-[54px]">
        <div className="max-w-[1080px] mx-auto px-5 sm:px-6 lg:px-0">
          {/* Row 1: Centered H2 "Popular Items" / "Artículos Populares" */}
          <div className="py-[27px] text-center">
            <h2 className="font-outfit font-medium text-[26px] sm:text-[32px] lg:text-[60px] leading-[1.3em] text-[#060e03]">
              {popularItems.heading}
            </h2>
          </div>

          {/* Row 2 (column_structure="1_4,1_4,1_4,1_4"): 4 Brand Logos directly on #e3eaf2 */}
          <div className="py-[27px] grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-[5.5%] items-start">
            {popularItems.logos.map((logo) => {
              const mainWidth = logo.widths[0];
              const maxWidth = logo.widths[logo.widths.length - 1];
              return (
                <div key={logo.id} className="mb-[30px] flex items-center justify-center">
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
                      className="w-full h-auto object-contain block"
                    />
                  </picture>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
