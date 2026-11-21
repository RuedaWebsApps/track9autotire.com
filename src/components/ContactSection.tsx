import { useState, type FormEvent } from 'react';
import type { SiteContent } from '../content/siteData';
import { SOCIAL_LINKS } from '../content/siteData';
import { submitContactForm, type ContactResponse } from '../lib/contactAdapter';
import { TikTokIcon, InstagramIcon, FacebookIcon } from './Icons';
import { SMS_CONSENT, legalPath } from '../legal/legalDocs';

interface ContactSectionProps {
  content: SiteContent;
}

export function ContactSection({ content }: ContactSectionProps) {
  const isEs = content.locale === 'es';
  const { quoteFooter } = content;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: quoteFooter.fields.serviceOptions[0] || '',
    message: '',
    website_hp: '',
  });

  const [status, setStatus] = useState<{
    busy: boolean;
    response: ContactResponse | null;
  }>({
    busy: false,
    response: null,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({ busy: true, response: null });

    const result = await submitContactForm({
      ...formData,
      locale: content.locale,
    });

    setStatus({ busy: false, response: result });
    if (result.ok) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: quoteFooter.fields.serviceOptions[0] || '',
        message: '',
        website_hp: '',
      });
    }
  };

  const getSocialIcon = (id: string) => {
    switch (id) {
      case 'tiktok':
        return <TikTokIcon className="w-[26px] h-[26px]" />;
      case 'instagram':
        return <InstagramIcon className="w-[26px] h-[26px]" />;
      case 'facebook':
      default:
        return <FacebookIcon className="w-[26px] h-[26px]" />;
    }
  };

  return (
    <section
      id={isEs ? 'contacto' : 'contact'}
      className="relative w-full bg-[#202021] text-white py-[54px] scroll-mt-[54px] overflow-hidden"
      style={{
        backgroundImage:
          'linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.68) 100%), url(/images/footer-shop-bg-1920.webp)',
        backgroundRepeat: 'repeat',
        backgroundPosition: 'center top',
      }}
    >
      <div className="relative z-10 max-w-[1080px] mx-auto px-5 sm:px-6 lg:px-0">
        {/* =====================================================================
            ROW 1 (column_structure="1_3,2_3", custom_padding="5vw||||"):
            Col 1 (1/3): Square 52x52px #fe2c55 Social Icons with 2px White Border
            Col 2 (2/3): Tajawal 14px Uppercase H4 + Tajawal 70px #e61c2e Phone Link
           ===================================================================== */}
        <div className="pt-[5vw] pb-[27px] grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-[5.5%] items-start">
          {/* Left Column (1/3 -> 4 cols): Divi et_pb_social_media_follow */}
          <div className="lg:col-span-4">
            <nav
              aria-label={quoteFooter.socialNavLabel}
              className="flex items-center gap-[8px] mb-[30px]"
            >
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="w-[52px] h-[52px] bg-[#fe2c55] border-2 border-white rounded-none text-white flex items-center justify-center hover:opacity-70 transition-opacity duration-300"
                >
                  {getSocialIcon(social.id)}
                </a>
              ))}
            </nav>
          </div>

          {/* Right Column (2/3 -> 8 cols): Tajawal 14px Uppercase H4 + Giant 70px #e61c2e Phone CTA */}
          <div className="lg:col-span-8">
            <h4 className="font-tajawal font-bold text-[12px] sm:text-[13px] lg:text-[14px] uppercase tracking-[2px] leading-[1.5em] text-white mb-0">
              {quoteFooter.eyebrow}
            </h4>
            <p className="font-tajawal font-bold text-[34px] sm:text-[50px] lg:text-[70px] leading-[1.2em] mt-1">
              <a
                href={quoteFooter.phoneHref}
                aria-label={quoteFooter.phoneAriaLabel}
                className="text-[#e61c2e] hover:opacity-85 transition-opacity"
              >
                {quoteFooter.phoneDisplay}
              </a>
            </p>
          </div>
        </div>

        {/* =====================================================================
            ROW 2: Zero-CPU Free Quote & Appointment Form (Web3Forms + TCPA Compliance)
           ===================================================================== */}
        <div className="pt-6 pb-4">
          <div className="bg-[#060e03]/85 border border-white/15 p-6 sm:p-9 backdrop-blur-md">
            <div className="mb-6">
              <h3 className="font-outfit text-xl sm:text-2xl font-bold text-white">
                {quoteFooter.formTitle}
              </h3>
              <p className="font-outfit text-sm text-white/75 mt-1">
                {quoteFooter.formSubtitle}
              </p>
            </div>

            {status.response && (
              <div
                role="alert"
                className={`mb-6 p-4 text-sm font-semibold flex items-start gap-3 ${
                  status.response.ok
                    ? 'bg-emerald-500/15 border border-emerald-500/30 text-emerald-300'
                    : 'bg-rose-500/15 border border-rose-500/30 text-rose-300'
                }`}
              >
                <span className="text-lg leading-none shrink-0">
                  {status.response.ok ? '✓' : '⚠'}
                </span>
                <span>{status.response.message}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Honeypot field */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="website_hp">Do not fill this field</label>
                <input
                  type="text"
                  id="website_hp"
                  name="website_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website_hp}
                  onChange={(e) =>
                    setFormData({ ...formData, website_hp: e.target.value })
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label
                    htmlFor="contact_name"
                    className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5"
                  >
                    {quoteFooter.fields.nameLabel} *
                  </label>
                  <input
                    type="text"
                    id="contact_name"
                    required
                    placeholder={quoteFooter.fields.namePlaceholder}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-white/10 border border-white/20 px-3.5 py-2.5 text-white placeholder-white/45 focus:outline-none focus:border-[#e61c2e] text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact_email"
                    className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5"
                  >
                    {quoteFooter.fields.emailLabel} *
                  </label>
                  <input
                    type="email"
                    id="contact_email"
                    required
                    placeholder={quoteFooter.fields.emailPlaceholder}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-white/10 border border-white/20 px-3.5 py-2.5 text-white placeholder-white/45 focus:outline-none focus:border-[#e61c2e] text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact_phone"
                    className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5"
                  >
                    {quoteFooter.fields.phoneLabel}
                  </label>
                  <input
                    type="tel"
                    id="contact_phone"
                    placeholder={quoteFooter.fields.phonePlaceholder}
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full bg-white/10 border border-white/20 px-3.5 py-2.5 text-white placeholder-white/45 focus:outline-none focus:border-[#e61c2e] text-sm"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact_service"
                    className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5"
                  >
                    {quoteFooter.fields.serviceLabel}
                  </label>
                  <select
                    id="contact_service"
                    value={formData.service}
                    onChange={(e) =>
                      setFormData({ ...formData, service: e.target.value })
                    }
                    className="w-full bg-[#121a10] border border-white/20 px-3.5 py-2.5 text-white focus:outline-none focus:border-[#e61c2e] text-sm"
                  >
                    {quoteFooter.fields.serviceOptions.map((opt) => (
                      <option key={opt} value={opt} className="bg-[#060e03] text-white">
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact_message"
                  className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-1.5"
                >
                  {quoteFooter.fields.messageLabel} *
                </label>
                <textarea
                  id="contact_message"
                  rows={3}
                  required
                  placeholder={quoteFooter.fields.messagePlaceholder}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full bg-white/10 border border-white/20 px-3.5 py-2.5 text-white placeholder-white/45 focus:outline-none focus:border-[#e61c2e] text-sm resize-y"
                />
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
                {/* TCPA & US Privacy Disclosure */}
                <p className="text-[11px] leading-relaxed text-white/65 max-w-2xl">
                  {SMS_CONSENT[content.locale].before}
                  <a
                    href={legalPath('privacy', content.locale)}
                    className="underline text-white hover:text-[#e61c2e]"
                  >
                    {SMS_CONSENT[content.locale].privacy}
                  </a>
                  {SMS_CONSENT[content.locale].and}
                  <a
                    href={legalPath('terms', content.locale)}
                    className="underline text-white hover:text-[#e61c2e]"
                  >
                    {SMS_CONSENT[content.locale].terms}
                  </a>
                  {SMS_CONSENT[content.locale].after}
                </p>

                <button
                  type="submit"
                  disabled={status.busy}
                  className="shrink-0 bg-[#e61c2e] hover:bg-[#c31826] text-white font-inter text-sm font-bold px-7 py-3.5 rounded-[100px] transition-colors cursor-pointer disabled:opacity-60"
                >
                  {status.busy ? quoteFooter.fields.submitBusy : quoteFooter.fields.submitIdle}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
