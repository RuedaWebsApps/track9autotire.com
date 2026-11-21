import type { SiteContent } from '../content/siteData';
import { LEGAL_KINDS, legalLabel, legalPath } from '../legal/legalDocs';

interface FooterProps {
  content: SiteContent;
}

export function Footer({ content }: FooterProps) {
  const isEs = content.locale === 'es';
  const locale = isEs ? 'es' : 'en';

  return (
    <footer id="main-footer" className="w-full bg-[#222222]">
      <div
        id="footer-bottom"
        className="w-full pt-[15px] pb-[10px]"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.32)' }}
      >
        <div className="max-w-[1080px] mx-auto px-5 sm:px-6 lg:px-0 flex flex-col sm:flex-row items-center justify-between gap-3 text-[14px] text-[#666666]">
          <div id="footer-info" className="text-left">
            {content.footerCredit}
          </div>

          {/* US & Texas Legal Compliance Links */}
          <nav
            aria-label={isEs ? 'Información legal' : 'Legal'}
            className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[12px] text-[#888888]"
          >
            {LEGAL_KINDS.map((k) => (
              <a
                key={k}
                href={legalPath(k, locale)}
                className="hover:text-white transition-opacity duration-300"
              >
                {legalLabel(k, locale)}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
