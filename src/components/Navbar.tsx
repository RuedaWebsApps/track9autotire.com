import { useState, useEffect } from 'react';
import type { Locale } from '../lib/contactAdapter';
import type { SiteContent } from '../content/siteData';

interface NavbarProps {
  content: SiteContent;
  currentLocale: Locale;
  altHref?: string;
}

export function Navbar({ content, currentLocale, altHref }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isEs = currentLocale === 'es';
  const navPrefix = isEs ? '/es' : '/';
  const toggleLocaleHref = altHref ?? (isEs ? '/' : '/es');
  const toggleLocaleLabel = isEs ? 'EN' : 'ES';
  const toggleLocaleTitle = isEs ? 'Switch to English' : 'Cambiar a Español';

  const navLinks = isEs
    ? [
        { href: `${navPrefix}#servicios`, label: 'Servicios' },
        { href: `${navPrefix}#marcas`, label: 'Marcas' },
        { href: `${navPrefix}#especiales`, label: 'Especiales' },
        { href: `${navPrefix}#experiencia`, label: 'Nosotros' },
        { href: `${navPrefix}#contacto`, label: 'Contacto' },
      ]
    : [
        { href: `${navPrefix}#services`, label: 'Services' },
        { href: `${navPrefix}#brands`, label: 'Brands' },
        { href: `${navPrefix}#specials`, label: 'Specials' },
        { href: `${navPrefix}#about`, label: 'About Us' },
        { href: `${navPrefix}#contact`, label: 'Contact' },
      ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#060e03]/95 backdrop-blur-md shadow-lg shadow-black/30 py-2.5 border-b border-white/10'
          : 'bg-[#060e03] py-3.5 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <a
          href={isEs ? '/es' : '/'}
          aria-label={content.nav.homeAriaLabel}
          className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c3e942] rounded-lg"
        >
          <picture>
            <source srcSet="/images/track9-logo-320.avif 1x, /images/track9-logo-320.avif 2x" type="image/avif" />
            <source srcSet="/images/track9-logo-320.webp 1x, /images/track9-logo-320.webp 2x" type="image/webp" />
            <img
              src="/images/track9-logo-320.webp"
              alt="Track 9 Auto & Tire Logo"
              width={160}
              height={48}
              className="h-10 sm:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </picture>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-7" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-semibold text-white/90 hover:text-[#c3e942] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c3e942] rounded px-1 py-0.5"
            >
              {link.label}
            </a>
          ))}

          {/* Language Switcher */}
          <a
            href={toggleLocaleHref}
            title={toggleLocaleTitle}
            aria-label={toggleLocaleTitle}
            className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase rounded-full border border-white/20 text-white hover:border-[#c3e942] hover:text-[#c3e942] transition-all bg-white/5 hover:bg-white/10"
          >
            <span className={!isEs ? 'text-[#c3e942]' : 'text-white/60'}>EN</span>
            <span className="text-white/40">|</span>
            <span className={isEs ? 'text-[#c3e942]' : 'text-white/60'}>ES</span>
          </a>

          {/* Call / Quote CTA */}
          <a
            href="tel:+12145248939"
            className="inline-flex items-center gap-2 bg-[#e61c2e] hover:bg-[#c31826] text-white text-sm font-bold px-4 py-2 rounded-full shadow-md shadow-[#e61c2e]/20 hover:shadow-lg transition-all transform hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#c3e942]"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <span>(214) 524-8939</span>
          </a>
        </nav>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 md:hidden">
          {/* Mobile Language Switcher */}
          <a
            href={toggleLocaleHref}
            title={toggleLocaleTitle}
            className="px-2.5 py-1 text-xs font-bold rounded-full border border-white/20 text-white bg-white/5"
          >
            {toggleLocaleLabel}
          </a>

          {/* Call button icon */}
          <a
            href="tel:+12145248939"
            aria-label="Call (214) 524-8939"
            className="p-2 text-white bg-[#e61c2e] rounded-full"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
          </a>

          {/* Hamburger toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? content.nav.menuCloseLabel : content.nav.menuOpenLabel}
            className="p-2 text-white/90 hover:text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#c3e942]"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#060e03]/98 border-b border-white/10 px-4 pt-3 pb-6 space-y-3 animate-rise">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-semibold text-white/90 hover:text-[#c3e942] py-2 border-b border-white/5"
            >
              {link.label}
            </a>
          ))}
          <div className="pt-2">
            <a
              href="tel:+12145248939"
              className="w-full flex items-center justify-center gap-2 bg-[#e61c2e] text-white font-bold py-3 rounded-xl text-center shadow-md"
            >
              <span>{isEs ? 'Llamar al (214) 524-8939' : 'Call (214) 524-8939'}</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
