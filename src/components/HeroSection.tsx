import type { SiteContent } from '../content/siteData';

interface HeroSectionProps {
  content: SiteContent;
}

export function HeroSection({ content }: HeroSectionProps) {
  return (
    <section
      className="relative w-full pt-[110px] lg:pt-[134px] pb-[54px] overflow-hidden"
      style={{
        backgroundImage: 'linear-gradient(180deg, #e3eaf2 10%, #ffffff 100%)',
      }}
    >
      {/* Divi background_pattern_style="crosses" (16px repeating crosses overlay) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 divi-crosses-pattern"
      />

      <div className="relative z-10 max-w-[1080px] mx-auto px-5 sm:px-6 lg:px-0">
        {/* Row 1 (column_structure="2_3,1_3"): 2/3 H1 Heading + 1/3 Shield Emblem Logo */}
        <div className="py-[27px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[5.5%] items-start">
          {/* Left Column (2/3 -> 8 cols): Outfit 72px desktop / 40px tablet / 24px phone, line-height 1.2em, #060e03 */}
          <div className="lg:col-span-8">
            <h1 className="font-outfit font-medium text-[28px] sm:text-[40px] lg:text-[72px] leading-[1.2em] text-[#060e03] tracking-normal">
              {content.hero.heading}
            </h1>
          </div>

          {/* Right Column (1/3 -> 4 cols, padding 40px desktop / 30px tablet / 20px phone): Track 9 Circular Shield Logo */}
          <div className="lg:col-span-4 p-[20px] sm:p-[30px] lg:p-[40px] flex items-center justify-center">
            <picture>
              <source srcSet="/images/track9-badge-480.avif" type="image/avif" />
              <source srcSet="/images/track9-badge-480.webp" type="image/webp" />
              <img
                src="/images/track9-badge-480.webp"
                alt={content.hero.badgeAlt}
                width={220}
                height={220}
                fetchPriority="high"
                className="w-[180px] sm:w-[210px] lg:w-[220px] h-auto object-contain block"
              />
            </picture>
          </div>
        </div>

        {/* Row 2 (column_structure="4_4"): Full-width 1080x460 Mechanic & Brake Rotor Photo */}
        <div className="py-[27px]">
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
              height={460}
              loading="eager"
              fetchPriority="high"
              className="w-full h-auto block object-cover"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}
