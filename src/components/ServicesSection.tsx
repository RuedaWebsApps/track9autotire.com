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

  const getFeatureIcon = (id: string) => {
    switch (id) {
      case 'oil':
        return <OilWrenchIcon className="w-[32px] h-[32px] text-[#e61c2e]" />;
      case 'shocks':
        return <SuspensionCogsIcon className="w-[32px] h-[32px] text-[#e61c2e]" />;
      case 'calipers':
        return <BrakeDiscIcon className="w-[32px] h-[32px] text-[#e61c2e]" />;
      case 'alignment':
      default:
        return <AlignmentWheelIcon className="w-[32px] h-[32px] text-[#e61c2e]" />;
    }
  };

  return (
    <section
      id={isEs ? 'servicios' : 'services'}
      className="w-full bg-[#060e03] text-white py-[54px] scroll-mt-[54px]"
    >
      <div className="max-w-[1080px] mx-auto px-5 sm:px-6 lg:px-0">
        {/* Row 1: Left-aligned H2 "Our Services" / "Nuestros Servicios" (Outfit 60px desktop / 32px tablet / 20px phone) */}
        <div className="py-[27px]">
          <h2 className="font-outfit font-medium text-[26px] sm:text-[32px] lg:text-[60px] leading-[1.3em] text-white mb-[10px]">
            {services.heading}
          </h2>
        </div>

        {/* Row 2 (column_structure="1_4,1_4,1_2", gutter_width="2", make_equal="on"):
            Col 1 (1/4): #293279 bg, Image TOP + H4 BOTTOM
            Col 2 (1/4): #293279 bg, H4 TOP + Image BOTTOM
            Col 3 (1/2): auto-parts-5.jpg bg, 1px white border, Right-aligned 50% White Box with dark H4 */}
        <div className="py-[27px] grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-[3%] items-stretch">
          {/* Column 1 (1/4 -> 3 cols): Image TOP (margin: 0 -30px) + H4 BOTTOM */}
          <div className="lg:col-span-3 bg-[#293279] border border-[#293279] px-[30px] pb-[4vw] pt-0 flex flex-col">
            <div className="mx-[-30px] mb-[26px] overflow-hidden">
              <picture>
                <source srcSet="/images/service-tires-sale-800.avif" type="image/avif" />
                <source srcSet="/images/service-tires-sale-800.webp" type="image/webp" />
                <img
                  src="/images/service-tires-sale-800.webp"
                  alt={services.cards.tiresSale.alt}
                  width={800}
                  height={820}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto block object-cover"
                />
              </picture>
            </div>
            <h4 className="font-outfit font-medium text-[18px] sm:text-[20px] lg:text-[24px] leading-[1.4em] text-white">
              {services.cards.tiresSale.title}
            </h4>
          </div>

          {/* Column 2 (1/4 -> 3 cols): H4 TOP + Image BOTTOM (margin: 4vw -30px 0 -30px) */}
          <div className="lg:col-span-3 bg-[#293279] border border-[#293279] px-[30px] pt-[30px] pb-0 flex flex-col justify-between">
            <h4 className="font-outfit font-medium text-[18px] sm:text-[20px] lg:text-[24px] leading-[1.4em] text-white">
              {services.cards.tireRepair.title}
            </h4>
            <div className="mx-[-30px] mt-[4vw] overflow-hidden">
              <picture>
                <source srcSet="/images/service-tire-repair-800.avif" type="image/avif" />
                <source srcSet="/images/service-tire-repair-800.webp" type="image/webp" />
                <img
                  src="/images/service-tire-repair-800.webp"
                  alt={services.cards.tireRepair.alt}
                  width={800}
                  height={820}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto block object-cover"
                />
              </picture>
            </div>
          </div>

          {/* Column 3 (1/2 -> 6 cols): Background Image auto-parts-5.jpg, 1px white border, Right-aligned 50% White Inset Box */}
          <div
            className="lg:col-span-6 relative min-h-[380px] lg:min-h-[450px] border border-white bg-cover bg-center flex items-start justify-end"
            style={{
              backgroundImage: 'url(/images/service-brakes-800.webp)',
            }}
          >
            <div className="w-[65%] sm:w-[50%] ml-auto bg-[#ffffff] pt-[120px] lg:pt-[160px] px-[20px] pb-[20px] mb-[8vw]">
              <h4 className="font-outfit font-medium text-[18px] sm:text-[20px] lg:text-[24px] leading-[1.4em] text-[#060e03]">
                {services.cards.brakes.title}
              </h4>
            </div>
          </div>
        </div>

        {/* Row 3 (column_structure="1_4,1_4,1_4,1_4"): 4 Columns with Red FontAwesome Icon (32px) + H5 + Paragraph */}
        <div className="py-[27px] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-[5.5%]">
          {services.features.map((feature) => (
            <div key={feature.id} className="flex flex-col items-start">
              <div className="mb-[20px]">
                {getFeatureIcon(feature.id)}
              </div>
              <h5 className="font-outfit font-medium text-[16px] sm:text-[18px] lg:text-[20px] leading-[1.4em] text-white mb-[8px]">
                {feature.title}
              </h5>
              <p className="font-outfit font-normal text-[14px] sm:text-[15px] lg:text-[16px] leading-[1.8em] text-white">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
