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
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const isEs = currentLocale === 'es';
  const navPrefix = isEs ? '/es' : '/';
  const enHref = altHref && isEs ? altHref : '/';
  const esHref = altHref && !isEs ? altHref : '/es';

  const navLinks = isEs
    ? [
        { href: `${navPrefix}#servicios`, label: 'Servicios' },
        { href: `${navPrefix}#marcas`, label: 'Marcas' },
        { href: `${navPrefix}#especiales`, label: 'Especiales' },
        { href: `${navPrefix}#experiencia`, label: 'Experiencia' },
        { href: `${navPrefix}#contacto`, label: 'Contacto' },
      ]
    : [
        { href: `${navPrefix}#services`, label: 'Services' },
        { href: `${navPrefix}#brands`, label: 'Brands' },
        { href: `${navPrefix}#specials`, label: 'Specials' },
        { href: `${navPrefix}#about`, label: 'Experience' },
        { href: `${navPrefix}#contact`, label: 'Contact' },
      ];

  return (
    <header
      id="main-header"
      style={{
        boxShadow: isScrolled
          ? '0 0 7px rgba(0, 0, 0, 0.12)'
          : '0 1px 0 rgba(0, 0, 0, 0.08)',
      }}
      className={`fixed top-0 left-0 right-0 z-50 bg-[#ffffff] transition-all duration-400 ease-in-out ${
        isScrolled ? 'h-[54px]' : 'h-[80px]'
      }`}
    >
      <div className="max-w-[1080px] mx-auto px-4 sm:px-0 h-full flex items-center justify-between">
        {/* Left Brand Shield Logo (Divi #logo: 43.19px at top -> 29.16px on scroll) */}
        <a
          href={isEs ? '/es' : '/'}
          aria-label={content.nav.homeAriaLabel}
          className="inline-flex items-center shrink-0 focus:outline-none"
        >
          <picture>
            <source srcSet="/images/track9-badge-240.avif" type="image/avif" />
            <source srcSet="/images/track9-badge-240.webp" type="image/webp" />
            <img
              src="/images/track9-badge-240.webp"
              alt="track9"
              width={44}
              height={44}
              className={`w-auto object-contain transition-all duration-400 ease-in-out ${
                isScrolled ? 'h-[29px]' : 'h-[43px]'
              }`}
            />
          </picture>
        </a>

        {/* Desktop Top Menu (Divi #top-menu: 14px, 600 weight, active #2ea3f2, default rgba(0,0,0,0.6), hover opacity 0.7) */}
        <nav
          id="top-menu-nav"
          aria-label="Main navigation"
          className="hidden md:flex items-center gap-[22px] text-[14px] font-semibold"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-black/60 hover:opacity-70 transition-opacity duration-400"
            >
              {link.label}
            </a>
          ))}

          {/* Original Divi Language Links: Español & English */}
          <a
            href={esHref}
            className={`hover:opacity-70 transition-opacity duration-400 ${
              isEs ? 'text-[#2ea3f2]' : 'text-black/60'
            }`}
          >
            Español
          </a>
          <a
            href={enHref}
            className={`hover:opacity-70 transition-opacity duration-400 ${
              !isEs ? 'text-[#2ea3f2]' : 'text-black/60'
            }`}
          >
            English
          </a>
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center gap-4 md:hidden text-[14px] font-semibold">
          <a
            href={esHref}
            className={isEs ? 'text-[#2ea3f2]' : 'text-black/60'}
          >
            Español
          </a>
          <a
            href={enHref}
            className={!isEs ? 'text-[#2ea3f2]' : 'text-black/60'}
          >
            English
          </a>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? content.nav.menuCloseLabel : content.nav.menuOpenLabel}
            className="p-1.5 text-[#2ea3f2] focus:outline-none"
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

      {/* Mobile Dropdown (Divi .et_mobile_menu style: white background with 3px #2ea3f2 top border) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t-[3px] border-[#2ea3f2] shadow-lg px-6 py-4 space-y-2 text-[14px] font-semibold">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-black/70 hover:text-[#2ea3f2] border-b border-black/5"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
