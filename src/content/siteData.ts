import type { Locale } from '../lib/contactAdapter';

export interface ServiceFeature {
  id: 'oil' | 'shocks' | 'calipers' | 'alignment';
  title: string;
  description: string;
}

export interface GallerySlide {
  id: string;
  baseName: string;
  widths: number[];
  width: number;
  height: number;
  isLogo?: boolean;
  alt: string;
  caption: string;
}

export interface BrandLogo {
  id: string;
  name: string;
  baseName: string;
  widths: number[];
  width: number;
  height: number;
  alt: string;
}

export interface SiteContent {
  locale: Locale;
  ogLocale: string;
  ogAlternateLocale: string;
  canonical: string;
  seo: {
    title: string;
    description: string;
  };
  nav: {
    homeAriaLabel: string;
    languageLabel: string;
    menuOpenLabel: string;
    menuCloseLabel: string;
    quoteCta: string;
  };
  hero: {
    heading: string;
    badgeAlt: string;
    bannerAlt: string;
  };
  services: {
    heading: string;
    cards: {
      tiresSale: { title: string; alt: string };
      tireRepair: { title: string; alt: string };
      brakes: { title: string; alt: string };
    };
    features: ServiceFeature[];
  };
  brands: {
    heading: string;
    usedHeading: string;
    tireAlt: string;
    usedList: string[];
    ctaText: string;
  };
  popularItems: {
    heading: string;
    logos: BrandLogo[];
  };
  specials: {
    flatTires: { eyebrow: string; title: string; alt: string };
    oilChanges: { eyebrow: string; title: string; alt: string };
  };
  aboutGallery: {
    heading: string;
    story: string;
    carouselLabel: string;
    prevLabel: string;
    nextLabel: string;
    slideOf: string;
    slides: GallerySlide[];
  };
  quoteFooter: {
    eyebrow: string;
    phoneDisplay: string;
    phoneHref: string;
    phoneAriaLabel: string;
    socialNavLabel: string;
    formTitle: string;
    formSubtitle: string;
    fields: {
      nameLabel: string;
      namePlaceholder: string;
      emailLabel: string;
      emailPlaceholder: string;
      phoneLabel: string;
      phonePlaceholder: string;
      serviceLabel: string;
      serviceOptions: string[];
      messageLabel: string;
      messagePlaceholder: string;
      submitIdle: string;
      submitBusy: string;
    };
  };
  footerCredit: string;
}

export const SOCIAL_LINKS = [
  {
    id: 'tiktok' as const,
    name: 'TikTok',
    href: 'https://www.tiktok.com/@track_.9',
  },
  {
    id: 'instagram' as const,
    name: 'Instagram',
    href: 'https://www.instagram.com/track9autotireshop',
  },
  {
    id: 'facebook' as const,
    name: 'Facebook',
    href: 'https://www.facebook.com/Track9autotireshop/',
  },
];

const USED_TIRE_BRANDS = [
  'Atlas Tires',
  'Atlander Tire',
  'Cargo Max',
  'Delinte',
  'Premiorri',
  'Rosava',
  'Fullrun',
  'Fullway',
  'Haida',
  'Land Golden',
  'Landspider',
  'Suretrac',
  'Travelstar',
  'Leao Tyre',
  'Gripmax',
];

export const SITE_DATA: Record<Locale, SiteContent> = {
  en: {
    locale: 'en',
    ogLocale: 'en_US',
    ogAlternateLocale: 'es_US',
    canonical: 'https://track9autotire.com/',
    seo: {
      title: 'Track 9 Auto & Tire | Tires, Brakes & Auto Repair',
      description:
        'Track 9 Auto & Tire: 18 years of experience offering new and used tires, flat tire repair, brake replacement, oil changes, shocks, and alignment. Call or text (214) 524-8939.',
    },
    nav: {
      homeAriaLabel: 'Track 9 Auto & Tire Home',
      languageLabel: 'Language selection',
      menuOpenLabel: 'Open navigation menu',
      menuCloseLabel: 'Close navigation menu',
      quoteCta: 'Free Quote',
    },
    hero: {
      heading: 'TRACK 9: Your Trusted Destination for Tires, Brakes, and More.',
      badgeAlt: 'Track 9 Auto and Tire emblem',
      bannerAlt: 'Automotive wheels, tires, and service tools at Track 9 Auto & Tire',
    },
    services: {
      heading: 'Our Services',
      cards: {
        tiresSale: {
          title: 'Sale of New and Used Tires',
          alt: 'Stack of new and used automotive tires for sale',
        },
        tireRepair: {
          title: 'Tire Repair and Maintenance',
          alt: 'Technician performing tire inspection and repair',
        },
        brakes: {
          title: 'Brake Replacement',
          alt: 'Brake rotor and caliper assembly service',
        },
      },
      features: [
        {
          id: 'oil',
          title: 'Oil and Filter Change',
          description: 'Essential Maintenance for an Efficient and Long-Lasting Engine.',
        },
        {
          id: 'shocks',
          title: 'Shock Absorber Installation',
          description: "We Enhance Your Vehicle's Stability and Comfort.",
        },
        {
          id: 'calipers',
          title: 'Caliper and Disc Replacement',
          description: 'Precise Replacement for Safe and Reliable Braking.',
        },
        {
          id: 'alignment',
          title: 'Alignment and Balancing',
          description: 'We Guarantee a Smooth Ride and Even Tire Wear.',
        },
      ],
    },
    brands: {
      heading: 'More Than Just a Tire Shop',
      usedHeading: 'Some of Our Used Brands >>',
      tireAlt: 'All-season performance tire available in new and used inventory',
      usedList: USED_TIRE_BRANDS,
      ctaText: 'Make an Appointment',
    },
    popularItems: {
      heading: 'Popular Items',
      logos: [
        {
          id: 'atlas',
          name: 'Atlas Tires',
          baseName: 'brand-atlas',
          widths: [270],
          width: 270,
          height: 142,
          alt: 'Atlas Tires brand logo',
        },
        {
          id: 'atlander',
          name: 'Atlander Tire',
          baseName: 'brand-atlander',
          widths: [320, 640],
          width: 1252,
          height: 995,
          alt: 'Atlander Tire brand logo',
        },
        {
          id: 'delinte',
          name: 'Delinte Tires',
          baseName: 'brand-delinte',
          widths: [393],
          width: 393,
          height: 143,
          alt: 'Delinte Tires brand logo',
        },
        {
          id: 'premiorri',
          name: 'Premiorri',
          baseName: 'brand-premiorri',
          widths: [320, 640],
          width: 2406,
          height: 500,
          alt: 'Premiorri Tires brand logo',
        },
      ],
    },
    specials: {
      flatTires: {
        eyebrow: 'Special',
        title: 'We will repair your flat tires',
        alt: 'Flat tire repair and patching service',
      },
      oilChanges: {
        eyebrow: 'Special',
        title: 'Oil Changes',
        alt: 'Engine oil and filter change service',
      },
    },
    aboutGallery: {
      heading:
        '18 Years of Experience in Tire Services: Quality and Service That Grow with You',
      story:
        'I started my journey working for someone else, gaining experience over time and perfecting my craft. Today, I am proud to say I have 18 years of experience in the tire industry, and for the last 5 years, I have been leading my own business. Thanks to constant effort, dedication, and commitment to my customers, I’ve achieved continuous growth. Many of my clients have trusted me for years, and their loyalty reflects the quality of service I provide. Here, every tire, every repair, and every customer matters.',
      carouselLabel: 'Track 9 shop photo gallery',
      prevLabel: 'Previous photo',
      nextLabel: 'Next photo',
      slideOf: 'of',
      slides: [
        {
          id: 'slide-1',
          baseName: 'gallery-1',
          widths: [480, 720],
          width: 1138,
          height: 2560,
          alt: 'Track 9 Auto & Tire shop service bay and tire mounting work',
          caption: 'Tire mounting and balancing service',
        },
        {
          id: 'slide-2',
          baseName: 'gallery-2',
          widths: [480, 720],
          width: 1920,
          height: 2560,
          alt: 'Track 9 Auto & Tire tire rack and inventory ready for installation',
          caption: 'Quality new and used tire selection',
        },
        {
          id: 'slide-3',
          baseName: 'gallery-3',
          widths: [480, 720],
          width: 1920,
          height: 2560,
          alt: 'Track 9 Auto & Tire wheel service equipment in shop',
          caption: 'Dedicated automotive shop equipment',
        },
        {
          id: 'slide-4',
          baseName: 'gallery-4',
          widths: [480, 720],
          width: 1080,
          height: 1920,
          alt: 'Track 9 Auto & Tire completed wheel and tire installation',
          caption: 'Trusted craftsmanship for every vehicle',
        },
        {
          id: 'slide-5',
          baseName: 'track9-badge',
          widths: [240, 480],
          width: 512,
          height: 512,
          isLogo: true,
          alt: 'Track 9 Auto & Tire official shop emblem',
          caption: 'Track 9 Auto & Tire — 18 years of experience',
        },
      ],
    },
    quoteFooter: {
      eyebrow: 'Call Or Text For a Free Quote',
      phoneDisplay: '(214) 524-8939',
      phoneHref: 'tel:+12145248939',
      phoneAriaLabel: 'Call Track 9 Auto & Tire at (214) 524-8939',
      socialNavLabel: 'Track 9 social media channels',
      formTitle: 'Request a Free Quote or Appointment',
      formSubtitle:
        'Send us your vehicle details and needed service — we will reply promptly.',
      fields: {
        nameLabel: 'Full Name',
        namePlaceholder: 'Your name',
        emailLabel: 'Email Address',
        emailPlaceholder: 'you@example.com',
        phoneLabel: 'Phone (Optional)',
        phonePlaceholder: '(214) 555-0199',
        serviceLabel: 'Service Needed',
        serviceOptions: [
          'New or Used Tires',
          'Flat Tire Repair & Maintenance',
          'Brake, Caliper & Disc Replacement',
          'Oil and Filter Change',
          'Shock Absorber Installation',
          'Alignment and Balancing',
        ],
        messageLabel: 'Vehicle & Request Details',
        messagePlaceholder: 'Year, make, model, tire size, or issue...',
        submitIdle: 'Request Free Quote',
        submitBusy: 'Sending Request...',
      },
    },
    footerCredit: 'Designed by Rueda la Rola Media | 2024®',
  },
  es: {
    locale: 'es',
    ogLocale: 'es_US',
    ogAlternateLocale: 'en_US',
    canonical: 'https://track9autotire.com/es',
    seo: {
      title: 'Track 9 Auto & Tire | Llantas, Frenos y Mecánica Automotriz',
      description:
        'Track 9 Auto & Tire: 18 años de experiencia en venta de llantas nuevas y usadas, reparación de ponchaduras, frenos, cambios de aceite, amortiguadores y alineación. Llama o envía mensaje al (214) 524-8939.',
    },
    nav: {
      homeAriaLabel: 'Inicio de Track 9 Auto & Tire',
      languageLabel: 'Selección de idioma',
      menuOpenLabel: 'Abrir menú de navegación',
      menuCloseLabel: 'Cerrar menú de navegación',
      quoteCta: 'Cotización Gratis',
    },
    hero: {
      heading: 'TRACK 9: Tu destino confiable para llantas, frenos y más',
      badgeAlt: 'Emblema de Track 9 Auto and Tire',
      bannerAlt: 'Llantas, rines y herramientas automotrices en Track 9 Auto & Tire',
    },
    services: {
      heading: 'Nuestros Servicios',
      cards: {
        tiresSale: {
          title: 'Venta de llantas nuevas y usadas',
          alt: 'Llantas nuevas y usadas disponibles para venta e instalación',
        },
        tireRepair: {
          title: 'Reparación y mantenimiento de neumáticos',
          alt: 'Técnico realizando inspección y reparación de neumáticos',
        },
        brakes: {
          title: 'Cambio de frenos',
          alt: 'Servicio de reemplazo de frenos, discos y calipers',
        },
      },
      features: [
        {
          id: 'oil',
          title: 'Cambio de Aceite y Filtro',
          description: 'Mantenimiento esencial para un motor eficiente y duradero.',
        },
        {
          id: 'shocks',
          title: 'Instalación de Amortiguadores',
          description: 'Mejoramos la estabilidad y el confort de tu vehículo.',
        },
        {
          id: 'calipers',
          title: 'Sustitución de Calipers y Discos',
          description: 'Reemplazo preciso para un frenado seguro y confiable.',
        },
        {
          id: 'alignment',
          title: 'Alineación y Balanceo',
          description: 'Garantizamos un manejo suave y un desgaste uniforme de tus llantas.',
        },
      ],
    },
    brands: {
      heading: 'Mucho Más que una Tienda de Llantas',
      usedHeading: 'Algunas de nuestras marcas usadas >>',
      tireAlt: 'Neumático de alto desempeño disponible en inventario nuevo y usado',
      usedList: USED_TIRE_BRANDS,
      ctaText: 'Agenda una Cita',
    },
    popularItems: {
      heading: 'Artículos Populares',
      logos: [
        {
          id: 'atlas',
          name: 'Atlas Tires',
          baseName: 'brand-atlas',
          widths: [270],
          width: 270,
          height: 142,
          alt: 'Logotipo de llantas Atlas Tires',
        },
        {
          id: 'atlander',
          name: 'Atlander Tire',
          baseName: 'brand-atlander',
          widths: [320, 640],
          width: 1252,
          height: 995,
          alt: 'Logotipo de llantas Atlander Tire',
        },
        {
          id: 'delinte',
          name: 'Delinte Tires',
          baseName: 'brand-delinte',
          widths: [393],
          width: 393,
          height: 143,
          alt: 'Logotipo de llantas Delinte Tires',
        },
        {
          id: 'premiorri',
          name: 'Premiorri',
          baseName: 'brand-premiorri',
          widths: [320, 640],
          width: 2406,
          height: 500,
          alt: 'Logotipo de llantas Premiorri',
        },
      ],
    },
    specials: {
      flatTires: {
        eyebrow: 'Especial',
        title: 'Reparamos tus llantas ponchadas.',
        alt: 'Servicio de reparación de llantas ponchadas',
      },
      oilChanges: {
        eyebrow: 'Especial',
        title: 'Cambios de Aceite',
        alt: 'Servicio de cambio de aceite y filtro para motor',
      },
    },
    aboutGallery: {
      heading: '18 Años de Experiencia en Llanteras: Calidad y Servicio que Crecen Contigo',
      story:
        'Comencé mi camino trabajando para alguien más, adquiriendo experiencia con el tiempo y perfeccionando mi oficio. Hoy, con orgullo puedo decir que tengo 18 años de experiencia en el mundo de las llanteras, y durante los últimos 5 años he liderado mi propio negocio. Gracias al esfuerzo constante, la dedicación y el compromiso con mis clientes, he logrado un crecimiento continuo. Muchos de mis clientes han confiado en mí durante años, y su fidelidad es un reflejo del servicio de calidad que ofrezco. Aquí, cada llanta, cada reparación, y cada cliente cuentan.',
      carouselLabel: 'Galería de fotos del taller Track 9',
      prevLabel: 'Foto anterior',
      nextLabel: 'Siguiente foto',
      slideOf: 'de',
      slides: [
        {
          id: 'slide-1',
          baseName: 'gallery-1',
          widths: [480, 720],
          width: 1138,
          height: 2560,
          alt: 'Área de servicio y montaje de llantas en Track 9 Auto & Tire',
          caption: 'Servicio de montaje y balanceo de llantas',
        },
        {
          id: 'slide-2',
          baseName: 'gallery-2',
          widths: [480, 720],
          width: 1920,
          height: 2560,
          alt: 'Inventario de llantas nuevas y usadas en Track 9 Auto & Tire',
          caption: 'Selección de llantas nuevas y usadas de calidad',
        },
        {
          id: 'slide-3',
          baseName: 'gallery-3',
          widths: [480, 720],
          width: 1920,
          height: 2560,
          alt: 'Equipo de servicio automotriz y llantera en Track 9 Auto & Tire',
          caption: 'Equipo profesional para tu vehículo',
        },
        {
          id: 'slide-4',
          baseName: 'gallery-4',
          widths: [480, 720],
          width: 1080,
          height: 1920,
          alt: 'Instalación terminada de llanta y rin en Track 9 Auto & Tire',
          caption: 'Trabajo garantizado para cada cliente',
        },
        {
          id: 'slide-5',
          baseName: 'track9-badge',
          widths: [240, 480],
          width: 512,
          height: 512,
          isLogo: true,
          alt: 'Emblema oficial de Track 9 Auto & Tire',
          caption: 'Track 9 Auto & Tire — 18 años de experiencia',
        },
      ],
    },
    quoteFooter: {
      eyebrow: 'Llama o envía un mensaje para una cotización gratuita.',
      phoneDisplay: '(214) 524-8939',
      phoneHref: 'tel:+12145248939',
      phoneAriaLabel: 'Llamar a Track 9 Auto & Tire al (214) 524-8939',
      socialNavLabel: 'Redes sociales de Track 9',
      formTitle: 'Solicita una Cotización Gratis o Agenda tu Cita',
      formSubtitle:
        'Envíanos los datos de tu vehículo y el servicio que necesitas; te responderemos pronto.',
      fields: {
        nameLabel: 'Nombre Completo',
        namePlaceholder: 'Tu nombre',
        emailLabel: 'Correo Electrónico',
        emailPlaceholder: 'tu@correo.com',
        phoneLabel: 'Teléfono (Opcional)',
        phonePlaceholder: '(214) 555-0199',
        serviceLabel: 'Servicio Requerido',
        serviceOptions: [
          'Llantas Nuevas o Usadas',
          'Reparación y Mantenimiento de Neumáticos',
          'Cambio de Frenos, Calipers y Discos',
          'Cambio de Aceite y Filtro',
          'Instalación de Amortiguadores',
          'Alineación y Balanceo',
        ],
        messageLabel: 'Detalles del Vehículo y Solicitud',
        messagePlaceholder: 'Año, marca, modelo, medida de llanta o detalle...',
        submitIdle: 'Solicitar Cotización Gratis',
        submitBusy: 'Enviando Solicitud...',
      },
    },
    footerCredit: 'Designed by Rueda la Rola Media | 2024®',
  },
};

export function buildJsonLd(locale: Locale): object[] {
  const data = SITE_DATA[locale];
  const isEs = locale === 'es';

  const serviceList = [
    data.services.cards.tiresSale.title,
    data.services.cards.tireRepair.title,
    data.services.cards.brakes.title,
    ...data.services.features.map((f) => f.title),
  ];

  return [
    {
      '@context': 'https://schema.org',
      '@type': ['AutoRepair', 'AutomotiveBusiness'],
      '@id': 'https://track9autotire.com/#business',
      name: 'Track 9 Auto & Tire',
      url: data.canonical,
      logo: 'https://track9autotire.com/images/track9-logo-512.png',
      image: 'https://track9autotire.com/images/og-cover.jpg',
      description: data.seo.description,
      telephone: '+1-214-524-8939',
      inLanguage: isEs ? 'es' : 'en',
      knowsLanguage: ['English', 'Spanish'],
      sameAs: SOCIAL_LINKS.map((s) => s.href),
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: isEs ? 'Servicios Automotrices y de Llantera' : 'Automotive & Tire Services',
        itemListElement: serviceList.map((serviceName, idx) => ({
          '@type': 'Offer',
          position: idx + 1,
          itemOffered: {
            '@type': 'Service',
            name: serviceName,
          },
        })),
      },
    },
  ];
}
