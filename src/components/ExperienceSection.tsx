import { useState } from 'react';
import type { SiteContent } from '../content/siteData';

interface ExperienceSectionProps {
  content: SiteContent;
  onSelectImage?: (imgUrl: string, alt: string) => void;
}

export function ExperienceSection({ content, onSelectImage }: ExperienceSectionProps) {
  const isEs = content.locale === 'es';
  const { aboutGallery } = content;
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = aboutGallery.slides;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const active = slides[currentSlide];

  return (
    <section
      id={isEs ? 'experiencia' : 'about'}
      className="w-full bg-[#000000] text-white pt-[54px] pb-0 scroll-mt-[54px]"
    >
      <div className="max-w-[1080px] mx-auto px-5 sm:px-6 lg:px-0">
        {/* Row 1 (column_structure="2_5,3_5"): Left 2/5 H2 (49px) + Story (19px) | Right 3/5 Divi Fullwidth Gallery Slider */}
        <div className="py-[27px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[5.5%] items-start">
          {/* Left Column (2/5 -> 5 cols): H2 (Outfit 49px, line-height 1.3em) + Paragraph (Outfit 19px, line-height 1.8em) */}
          <div className="lg:col-span-5">
            <h2 className="font-outfit font-medium text-[28px] sm:text-[32px] lg:text-[49px] leading-[1.3em] text-white mb-[24px]">
              {aboutGallery.heading}
            </h2>
            <p className="font-outfit font-normal text-[16px] sm:text-[18px] lg:text-[19px] leading-[1.8em] text-white">
              {aboutGallery.story}
            </p>
          </div>

          {/* Right Column (3/5 -> 7 cols): Divi Fullwidth Gallery Slider (.et_pb_gallery.et_pb_slider) */}
          <div className="lg:col-span-7">
            <div
              className="group relative w-full overflow-hidden bg-[#000000]"
              aria-label={aboutGallery.carouselLabel}
            >
              {/* Active Slide Image */}
              <div className="relative w-full flex items-center justify-center">
                <picture key={active.id} className="w-full block">
                  <source
                    srcSet={`/images/${active.baseName}-${active.widths[active.widths.length - 1]}.avif`}
                    type="image/avif"
                  />
                  <source
                    srcSet={`/images/${active.baseName}-${active.widths[active.widths.length - 1]}.webp`}
                    type="image/webp"
                  />
                  <img
                    src={`/images/${active.baseName}-${active.widths[active.widths.length - 1]}.webp`}
                    alt={active.alt}
                    width={active.width}
                    height={active.height}
                    loading="lazy"
                    decoding="async"
                    onClick={() =>
                      onSelectImage &&
                      onSelectImage(
                        `/images/${active.baseName}-${active.widths[active.widths.length - 1]}.webp`,
                        active.alt
                      )
                    }
                    className="w-full h-auto max-h-[840px] object-contain mx-auto block cursor-zoom-in transition-opacity duration-300"
                  />
                </picture>

                {/* Divi Slider Left / Right Hover Arrows (.et-pb-arrow-prev / .et-pb-arrow-next) */}
                <button
                  type="button"
                  onClick={prevSlide}
                  aria-label={aboutGallery.prevLabel}
                  className="absolute left-0 group-hover:left-[22px] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 text-white text-[42px] leading-none p-2 bg-black/35 hover:bg-black/65 rounded-full cursor-pointer focus:opacity-100"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  aria-label={aboutGallery.nextLabel}
                  className="absolute right-0 group-hover:right-[22px] top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 text-white text-[42px] leading-none p-2 bg-black/35 hover:bg-black/65 rounded-full cursor-pointer focus:opacity-100"
                >
                  ›
                </button>

                {/* Divi Slider Pagination Controllers (.et-pb-controllers: 7x7px dots at bottom 20px) */}
                <div
                  className="absolute bottom-[20px] inset-x-0 flex items-center justify-center gap-[10px] z-10"
                  role="tablist"
                >
                  {slides.map((slide, idx) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setCurrentSlide(idx)}
                      role="tab"
                      aria-selected={currentSlide === idx}
                      aria-label={`Slide ${idx + 1}`}
                      className={`w-[7px] h-[7px] rounded-full transition-opacity duration-200 cursor-pointer ${
                        currentSlide === idx
                          ? 'bg-white opacity-100'
                          : 'bg-white/50 opacity-50 hover:opacity-80'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
