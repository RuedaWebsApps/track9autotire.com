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
      className="py-16 sm:py-24 bg-[#060e03] text-white relative scroll-mt-20 overflow-hidden"
    >
      {/* Background glow accents */}
      <div
        className="absolute top-1/4 -left-20 w-96 h-96 bg-[#293279]/30 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute bottom-10 -right-20 w-96 h-96 bg-[#c3e942]/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Founder's Story & Trust Metrics */}
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/10 text-[#c3e942] text-xs font-bold uppercase tracking-wider border border-white/10">
              <span>{isEs ? 'Historia y Compromiso' : 'Our Story & Commitment'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight tracking-tight">
              {aboutGallery.heading}
            </h2>

            <div className="w-20 h-1 bg-[#e61c2e] rounded-full" />

            <div className="text-white/80 text-sm sm:text-base leading-relaxed space-y-4">
              <p>{aboutGallery.story}</p>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center">
                <div className="text-2xl sm:text-3xl font-black text-[#c3e942]">18+</div>
                <div className="text-xs text-white/70 font-semibold mt-1">
                  {isEs ? 'Años en Llanteras' : 'Years Experience'}
                </div>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center">
                <div className="text-2xl sm:text-3xl font-black text-white">5+</div>
                <div className="text-xs text-white/70 font-semibold mt-1">
                  {isEs ? 'Años Negocio Propio' : 'Years Own Shop'}
                </div>
              </div>
              <div className="bg-white/5 rounded-2xl p-4 border border-white/5 text-center">
                <div className="text-2xl sm:text-3xl font-black text-[#e61c2e]">100%</div>
                <div className="text-xs text-white/70 font-semibold mt-1">
                  {isEs ? 'Clientes Leales' : 'Customer Focus'}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Photo Carousel */}
          <div className="lg:col-span-6">
            <div
              className="relative bg-white/5 rounded-3xl p-3 sm:p-4 border border-white/15 shadow-2xl backdrop-blur-xs"
              aria-label={aboutGallery.carouselLabel}
            >
              {/* Main Image Container */}
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/60 flex items-center justify-center">
                <picture key={active.id}>
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
                        active.alt,
                      )
                    }
                    className={`w-full h-full object-cover transition-opacity duration-300 ${
                      active.isLogo ? 'object-contain p-8' : 'cursor-pointer hover:scale-102 transition-transform duration-500'
                    }`}
                  />
                </picture>

                {/* Caption bar */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-4 sm:p-5 flex items-center justify-between text-xs sm:text-sm text-white">
                  <span className="font-medium drop-shadow">{active.caption}</span>
                  <span className="text-xs font-bold text-[#c3e942] shrink-0 ml-3">
                    {currentSlide + 1} {aboutGallery.slideOf} {slides.length}
                  </span>
                </div>
              </div>

              {/* Carousel Controls */}
              <div className="flex items-center justify-between pt-4 px-2">
                {/* Dots Indicator */}
                <div className="flex items-center gap-1.5" role="tablist">
                  {slides.map((slide, idx) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setCurrentSlide(idx)}
                      role="tab"
                      aria-selected={currentSlide === idx}
                      aria-label={`Slide ${idx + 1}`}
                      className={`h-2.5 rounded-full transition-all duration-300 ${
                        currentSlide === idx
                          ? 'w-7 bg-[#c3e942]'
                          : 'w-2.5 bg-white/30 hover:bg-white/60'
                      }`}
                    />
                  ))}
                </div>

                {/* Prev / Next Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={prevSlide}
                    aria-label={aboutGallery.prevLabel}
                    className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#c3e942]"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={nextSlide}
                    aria-label={aboutGallery.nextLabel}
                    className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors focus:outline-none focus:ring-2 focus:ring-[#c3e942]"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
