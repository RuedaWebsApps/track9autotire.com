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
      className="w-full bg-[#e3eaf2] bg-no-repeat bg-bottom py-[54px] scroll-mt-[54px]"
      style={{
        backgroundImage: 'url(/images/bg-shape-bottom-1572.webp)',
        backgroundSize: 'initial',
      }}
    >
      <div className="max-w-[1080px] mx-auto px-5 sm:px-6 lg:px-0">
        {/* Row 1 (column_structure="1_2,1_2", make_equal="on") */}
        <div className="py-[27px] grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-[5.5%] items-stretch">
          {/* Left Column (1/2): auto-parts-8b.jpg with linear-gradient(180deg, rgba(255,255,255,0) 0%, #060e03 100%) */}
          <div
            className="relative min-h-[280px] lg:min-h-[357px] bg-cover bg-center pt-[24vw] md:pt-[12vw] px-[20px] sm:px-[30px] pb-[20px] sm:pb-[30px] flex flex-col justify-end"
            style={{
              backgroundImage:
                'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #060e03 100%), url(/images/special-flat-tire-800.webp)',
            }}
          >
            <h6 className="font-outfit font-bold text-[16px] leading-[1.4em] uppercase text-white mb-0">
              {specials.flatTires.eyebrow}
            </h6>
            <h3 className="font-outfit font-medium text-[24px] sm:text-[28px] lg:text-[40px] leading-[1.4em] text-white">
              {specials.flatTires.title}
            </h3>
          </div>

          {/* Right Column (1/2): auto-parts-7.jpg with linear-gradient(180deg, rgba(255,255,255,0) 0%, #060e03 100%) */}
          <div
            className="relative min-h-[280px] lg:min-h-[357px] bg-cover bg-center pt-[24vw] md:pt-[12vw] px-[20px] sm:px-[30px] pb-[20px] sm:pb-[30px] flex flex-col justify-end"
            style={{
              backgroundImage:
                'linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, #060e03 100%), url(/images/special-oil-change-800.webp)',
            }}
          >
            <h6 className="font-outfit font-bold text-[16px] leading-[1.4em] uppercase text-white mb-0">
              {specials.oilChanges.eyebrow}
            </h6>
            <h3 className="font-outfit font-medium text-[24px] sm:text-[28px] lg:text-[40px] leading-[1.4em] text-white">
              {specials.oilChanges.title}
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
