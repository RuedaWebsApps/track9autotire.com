export type Locale = 'en' | 'es';

export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  website_hp: string;
  locale: Locale;
}

export interface ContactResponse {
  ok: boolean;
  code: 'sent' | 'honeypot' | 'validation' | 'unconfigured' | 'network';
  message: string;
}

const MESSAGES = {
  en: {
    validationError: 'Please fill in your name, a valid email address, and your message.',
    phoneError: 'Please enter a valid phone number (at least 7 digits) or leave it blank.',
    honeypot: 'Submission could not be processed.',
    unconfigured:
      'Online form endpoint is not configured yet. Please call or text us directly at (214) 524-8939 for an immediate free quote.',
    sent: 'Thank you! Your quote request has been received. We will follow up shortly.',
    networkError:
      'We could not submit your request right now. Please call or text (214) 524-8939 directly.',
  },
  es: {
    validationError:
      'Por favor ingresa tu nombre, un correo electrónico válido y tu mensaje.',
    phoneError:
      'Por favor ingresa un número de teléfono válido (al menos 7 dígitos) o déjalo en blanco.',
    honeypot: 'No se pudo procesar el envío.',
    unconfigured:
      'El formulario en línea aún no está configurado. Llámanos o envíanos un mensaje al (214) 524-8939 para una cotización inmediata.',
    sent: '¡Gracias! Hemos recibido tu solicitud de cotización y te contactaremos pronto.',
    networkError:
      'No pudimos enviar tu solicitud en este momento. Por favor llama o envía un mensaje al (214) 524-8939.',
  },
} as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContactPayload(payload: ContactPayload): string | null {
  const t = MESSAGES[payload.locale];
  const name = payload.name.trim();
  const email = payload.email.trim();
  const message = payload.message.trim();
  const phoneDigits = payload.phone.replace(/\D/g, '');

  if (name.length < 2 || !EMAIL_RE.test(email) || message.length < 5) {
    return t.validationError;
  }

  if (payload.phone.trim().length > 0 && phoneDigits.length < 7) {
    return t.phoneError;
  }

  return null;
}

export async function submitContactForm(
  payload: ContactPayload,
): Promise<ContactResponse> {
  const t = MESSAGES[payload.locale];

  // Anti-spam honeypot check
  if (payload.website_hp.trim().length > 0) {
    return {
      ok: false,
      code: 'honeypot',
      message: t.honeypot,
    };
  }

  const validationMsg = validateContactPayload(payload);
  if (validationMsg) {
    return {
      ok: false,
      code: 'validation',
      message: validationMsg,
    };
  }

  const provider = (
    import.meta.env.VITE_CONTACT_PROVIDER || 'web3forms'
  ).toLowerCase();
  const web3FormsKey = (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || '').trim();
  const webhookUrl = (import.meta.env.VITE_CONTACT_WEBHOOK_URL || '').trim();

  if (provider === 'webhook') {
    if (!webhookUrl) {
      return {
        ok: false,
        code: 'unconfigured',
        message: t.unconfigured,
      };
    }

    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          source: 'track9autotire.com',
          locale: payload.locale,
          name: payload.name.trim(),
          email: payload.email.trim(),
          phone: payload.phone.trim(),
          service: payload.service.trim(),
          message: payload.message.trim(),
          submittedAt: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        return {
          ok: false,
          code: 'network',
          message: t.networkError,
        };
      }

      return {
        ok: true,
        code: 'sent',
        message: t.sent,
      };
    } catch {
      return {
        ok: false,
        code: 'network',
        message: t.networkError,
      };
    }
  }

  // Default: Web3Forms zero-CPU endpoint
  if (!web3FormsKey) {
    return {
      ok: false,
      code: 'unconfigured',
      message: t.unconfigured,
    };
  }

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: web3FormsKey,
        subject: `Track 9 Auto & Tire Quote Request (${payload.locale.toUpperCase()}) - ${payload.service || 'General'}`,
        from_name: 'Track 9 Auto & Tire Website',
        name: payload.name.trim(),
        email: payload.email.trim(),
        phone: payload.phone.trim(),
        service: payload.service.trim(),
        message: payload.message.trim(),
        locale: payload.locale,
      }),
    });

    const data = (await response.json().catch(() => null)) as {
      success?: boolean;
    } | null;

    if (!response.ok || !data?.success) {
      return {
        ok: false,
        code: 'network',
        message: t.networkError,
      };
    }

    return {
      ok: true,
      code: 'sent',
      message: t.sent,
    };
  } catch {
    return {
      ok: false,
      code: 'network',
      message: t.networkError,
    };
  }
}
