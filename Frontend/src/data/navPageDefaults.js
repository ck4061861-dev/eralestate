export const NAV_PAGE_DEFAULTS = [
  {
    slug: "properties-for-sale",
    category: "buy",
    title: "Properties For Sale",
    description: "Browse homes available to purchase in your preferred locations and price range.",
    content: {
      heroLabel: "Real Estate UK",
      heroTitle: "Properties For Sale",
      heroDescription:
        "Explore our curated collection of residential properties across the United Kingdom.",
      primaryCtaText: "Book a Valuation",
      secondaryCtaText: "View Buying Guide",
      bottomTitle: "Can't find what you're looking for?",
      bottomDescription:
        "Register your search criteria with us and we will notify you when matching listings go live.",
      bottomCtaText: "Set Up Property Alerts",
    },
  },
  {
    slug: "land-and-new-homes",
    category: "buy",
    title: "Land and New Homes",
    description: "Explore development plots and newly built homes with modern amenities.",
    content: {
      heroLabel: "Development & New Build",
      heroTitle: "Land & New Homes",
      heroDescription:
        "Discover development opportunities and brand new homes across the UK.",
      ctaTitle: "Looking for something specific?",
      ctaDescription:
        "If you have a specific requirement for land or a new build, tell us about it.",
      ctaPrimaryText: "Contact an Agent",
      ctaSecondaryText: "View Residential Listings",
    },
  },
  {
    slug: "buyers-guide",
    category: "buy",
    title: "Buyers Guide",
    description: "Step-by-step guidance for first-time and experienced buyers.",
    content: {
      heroLabel: "UK Property Guide",
      heroTitle: "Step by Step Guide to Buying your property",
      heroDescription:
        "A practical and complete guide for buyers from search to completion.",
      sectionTitle: "Why choose Paramount to Buy a Property?",
      introText:
        "Buying a property is exciting but it may also seem a little daunting, so we aim to make the process as easy as possible.",
    },
  },
  {
    slug: "properties-to-let",
    category: "rent",
    title: "Properties To Let",
    description: "Browse rental homes and apartments across the areas you want to live in.",
    content: {
      heroLabel: "Residential Lettings",
      heroTitle: "Properties To Let",
      heroDescription:
        "Discover a curated portfolio of exceptional rental properties across the UK.",
      primaryCtaText: "Browse Rentals",
      secondaryCtaText: "Tenant Services",
      bottomTitle: "Looking for something specific?",
      bottomDescription:
        "Register your requirements and let us find the perfect rental match for you.",
      bottomCtaText: "Register Interest",
    },
  },
  {
    slug: "tenants-guide",
    category: "rent",
    title: "Tenants Guide",
    description: "Learn what to expect when renting, from applications to moving in.",
    content: {
      heroLabel: "Letting Resources",
    },
  },
  {
    slug: "tenants-fees-terms",
    category: "rent",
    title: "Tenants Fees & Terms",
    description: "Understand deposits, fees, tenancy terms, and what you are paying for.",
    content: {
      heroLabel: "Letting Resources",
    },
  },
  {
    slug: "renting-reviews",
    category: "rent",
    title: "Renting Reviews",
    description: "See what tenants say about the rental process and local support.",
    content: {
      heroLabel: "Letting Resources",
    },
  },
  {
    slug: "landlords-guide",
    category: "let",
    title: "Landlords Guide",
    description: "Landlord-specific best practices for property management and tenant onboarding.",
    content: {
      heroLabel: "Letting Resources",
    },
  },
  {
    slug: "landlords-services-fees",
    category: "let",
    title: "Landlords Services & Fees",
    description: "Breakdown of service options and fees for landlord property services.",
    content: {
      heroLabel: "Letting Resources",
    },
  },
  {
    slug: "epc",
    category: "let",
    title: "EPC",
    description: "Energy Performance Certificate guidance and regulatory requirements.",
    content: {
      heroLabel: "Letting Resources",
    },
  },
  {
    slug: "landlord-reviews",
    category: "let",
    title: "Landlord Reviews",
    description: "Real feedback from landlords who use our rental management platform.",
    content: {
      heroLabel: "Letting Resources",
    },
  },
];

export const NAV_PAGES_BY_SLUG = NAV_PAGE_DEFAULTS.reduce((acc, page) => {
  acc[page.slug] = page;
  return acc;
}, {});

export const getDefaultMenuByCategory = (category) =>
  NAV_PAGE_DEFAULTS.filter((item) => item.category === category).map((item) => ({
    slug: item.slug,
    title: item.title,
    description: item.description,
  }));
