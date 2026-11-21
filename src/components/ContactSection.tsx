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
        return <TikTokIcon className="w-5 h-5" />;
      case 'instagram':
        return <InstagramIcon className="w-5 h-5" />;
      case 'facebook':
      default:
        return <FacebookIcon className="w-5 h-5" />;
    }
  };

  return (
    <section
      id={isEs ? 'contacto' : 'contact'}
      className="relative py-20 sm:py-28 bg-[#202021] text-white scroll-mt-20 overflow-hidden"
    >
      {/* Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <picture>
          <source
            media="(min-width: 1280px)"
            srcSet="/images/footer-shop-bg-1920.avif"
            type="image/avif"
          />
          <source
            media="(min-width: 1280px)"
            srcSet="/images/footer-shop-bg-1920.webp"
            type="image/webp"
          />
          <source
            media="(min-width: 640px)"
            srcSet="/images/footer-shop-bg-1280.avif"
            type="image/avif"
          />
          <source
            media="(min-width: 640px)"
            srcSet="/images/footer-shop-bg-1280.webp"
            type="image/webp"
          />
          <source srcSet="/images/footer-shop-bg-640.avif" type="image/avif" />
          <source srcSet="/images/footer-shop-bg-640.webp" type="image/webp" />
          <img
            src="/images/footer-shop-bg-1920.webp"
            alt="Track 9 Auto & Tire Service Workshop"
            width={1920}
            height={1080}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover opacity-25"
          />
        </picture>
        <div className="absolute inset-0 bg-gradient-to-t from-[#060e03] via-[#060e03]/85 to-[#060e03]/75" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Phone CTA & Business Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#c3e942] bg-[#c3e942]/10 px-3.5 py-1.5 rounded-full border border-[#c3e942]/20">
                {isEs ? 'Contacto Directo' : 'Direct Contact'}
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mt-4 leading-tight tracking-tight">
                {quoteFooter.eyebrow}
              </h2>
            </div>

            {/* Prominent Phone Click-to-Call Box */}
            <div className="bg-white/5 border border-white/15 rounded-3xl p-6 sm:p-8 backdrop-blur-md shadow-2xl hover:border-[#c3e942]/50 transition-all">
              <div className="text-xs font-bold text-white/60 uppercase tracking-wider mb-2">
                {isEs ? 'Línea de Atención Inmediata' : 'Direct Phone & Text Line'}
              </div>
              <a
                href={quoteFooter.phoneHref}
                aria-label={quoteFooter.phoneAriaLabel}
                className="group inline-flex items-center gap-3 text-3xl sm:text-4xl font-black text-[#c3e942] hover:text-white transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-[#c3e942]/20 flex items-center justify-center text-[#c3e942] group-hover:bg-[#e61c2e] group-hover:text-white transition-all shrink-0">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <span>{quoteFooter.phoneDisplay}</span>
              </a>
              <p className="text-xs sm:text-sm text-white/70 mt-4 leading-relaxed">
                {isEs
                  ? 'Atendemos llamadas y mensajes de texto para consultas rápidas, disponibilidad de llantas y presupuestos sin compromiso.'
                  : 'Call or text us anytime for rapid answers, tire size availability, and free estimates.'}
              </p>
            </div>

            {/* Social Links */}
            <div>
              <div className="text-xs font-bold text-white/60 uppercase tracking-wider mb-3">
                {quoteFooter.socialNavLabel}
              </div>
              <div className="flex items-center gap-3">
                {SOCIAL_LINKS.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.name}
                    className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#e61c2e] text-white flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 shadow-md border border-white/10"
                  >
                    {getSocialIcon(social.id)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Zero-CPU Quote & Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-[#0c1409]/90 border border-white/15 rounded-3xl p-6 sm:p-10 shadow-2xl backdrop-blur-md">
              <div className="mb-8">
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {quoteFooter.formTitle}
                </h3>
                <p className="text-sm text-white/70 mt-2">
                  {quoteFooter.formSubtitle}
                </p>
              </div>

              {/* Status alerts */}
              {status.response && (
                <div
                  role="alert"
                  className={`mb-6 p-4 rounded-2xl text-sm font-semibold flex items-start gap-3 ${
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

              <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                {/* Honeypot field (hidden from humans) */}
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

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name field */}
                  <div>
                    <label
                      htmlFor="contact_name"
                      className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2"
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
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#c3e942] focus:border-transparent transition-all text-sm"
                    />
                  </div>

                  {/* Email field */}
                  <div>
                    <label
                      htmlFor="contact_email"
                      className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2"
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
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#c3e942] focus:border-transparent transition-all text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Phone field */}
                  <div>
                    <label
                      htmlFor="contact_phone"
                      className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2"
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
                      className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#c3e942] focus:border-transparent transition-all text-sm"
                    />
                  </div>

                  {/* Service selector */}
                  <div>
                    <label
                      htmlFor="contact_service"
                      className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2"
                    >
                      {quoteFooter.fields.serviceLabel}
                    </label>
                    <select
                      id="contact_service"
                      value={formData.service}
                      onChange={(e) =>
                        setFormData({ ...formData, service: e.target.value })
                      }
                      className="w-full bg-[#1b2618] border border-white/15 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-[#c3e942] focus:border-transparent transition-all text-sm"
                    >
                      {quoteFooter.fields.serviceOptions.map((opt) => (
                        <option key={opt} value={opt} className="bg-[#0c1409] text-white">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Message field */}
                <div>
                  <label
                    htmlFor="contact_message"
                    className="block text-xs font-bold uppercase tracking-wider text-white/80 mb-2"
                  >
                    {quoteFooter.fields.messageLabel} *
                  </label>
                  <textarea
                    id="contact_message"
                    rows={4}
                    required
                    placeholder={quoteFooter.fields.messagePlaceholder}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#c3e942] focus:border-transparent transition-all text-sm resize-none"
                  />
                </div>

                {/* TCPA & Privacy Disclosure */}
                <p className="text-[11px] leading-relaxed text-white/60">
                  {SMS_CONSENT[content.locale].before}
                  <a
                    href={legalPath('privacy', content.locale)}
                    className="underline text-[#c3e942] hover:text-white"
                  >
                    {SMS_CONSENT[content.locale].privacy}
                  </a>
                  {SMS_CONSENT[content.locale].and}
                  <a
                    href={legalPath('terms', content.locale)}
                    className="underline text-[#c3e942] hover:text-white"
                  >
                    {SMS_CONSENT[content.locale].terms}
                  </a>
                  {SMS_CONSENT[content.locale].after}
                </p>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status.busy}
                  className="w-full bg-[#e61c2e] hover:bg-[#c31826] text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed text-base flex items-center justify-center gap-2"
                >
                  {status.busy ? (
                    <>
                      <svg
                        className="animate-spin w-5 h-5 text-white"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      <span>{quoteFooter.fields.submitBusy}</span>
                    </>
                  ) : (
                    <span>{quoteFooter.fields.submitIdle}</span>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
