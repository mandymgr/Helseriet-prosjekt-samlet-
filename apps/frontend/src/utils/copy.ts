// Helseriet Brand Copy System
// Konsistent tone of voice og microcopy på tvers av applikasjonen

export const COPY = {
  // Navigation & Actions
  navigation: {
    login: "Logg inn",
    register: "Registrer",
    logout: "Logg ut",
    search: "Søk etter produkter",
    cart: "Gå til handlekurv",
    account: "Gå til min konto",
    continue: "Fortsett",
    back: "Tilbake",
    next: "Neste",
    save: "Lagre",
    cancel: "Avbryt"
  },

  // Loading States
  loading: {
    default: "Laster...",
    login: "Logger inn...",
    saving: "Lagrer...",
    processing: "Behandler...",
    searching: "Søker...",
    loading_cart: "Laster handlekurv...",
    loading_products: "Laster produkter..."
  },

  // Success Messages
  success: {
    login: "Velkommen tilbake!",
    register: "Kontoen din er opprettet",
    saved: "Endringene er lagret",
    added_to_cart: "Produktet er lagt til i handlekurven",
    order_placed: "Bestillingen din er registrert",
    newsletter_signup: "Takk for at du meldte deg på vårt nyhetsbrev"
  },

  // Error Messages
  errors: {
    generic: "Noe gikk galt. Prøv igjen senere.",
    network: "Sjekk internettforbindelsen din og prøv igjen",
    login_failed: "Ugyldig e-post eller passord",
    required_field: "Dette feltet er påkrevd",
    invalid_email: "Ugyldig e-postadresse",
    password_too_short: "Passordet må være minst 8 tegn",
    cart_error: "Feil ved oppdatering av handlekurv",
    product_unavailable: "Dette produktet er ikke tilgjengelig",
    session_expired: "Økten din har utløpt. Logg inn på nytt."
  },

  // Empty States
  empty: {
    cart: "Din handlekurv er tom",
    search: "Ingen produkter funnet",
    favorites: "Du har ingen favoritter ennå",
    orders: "Du har ingen tidligere bestillinger",
    categories: "Ingen kategorier tilgjengelig"
  },

  // Product Related
  products: {
    add_to_cart: "Legg i kurv",
    read_more: "Les mer",
    view_details: "Se detaljer",
    out_of_stock: "Utsolgt",
    in_stock: "På lager",
    low_stock: "Få igjen på lager",
    price_from: "Fra",
    save_amount: "Du sparer",
    free_shipping: "Gratis frakt",
    subscription: "Abonnement"
  },

  // Cart & Checkout
  cart: {
    item_count: (count: number) => `${count} ${count === 1 ? 'produkt' : 'produkter'}`,
    subtotal: "Subtotal",
    shipping: "Frakt",
    total: "Totalt",
    proceed_to_checkout: "Gå til kasse",
    continue_shopping: "Fortsett å handle",
    remove_item: "Fjern",
    save_for_later: "Lagre for senere",
    select_all: "Velg alle",
    remove_selected: "Fjern valgte",
    free_shipping_threshold: (amount: number) => `Legg til produkter for ${amount} kr til for gratis frakt!`,
    qualified_free_shipping: "Du har kvalifisert for gratis frakt!"
  },

  // Form Labels & Placeholders
  forms: {
    first_name: "Fornavn",
    last_name: "Etternavn", 
    email: "E-post",
    phone: "Telefon",
    message: "Melding",
    subject: "Emne",
    password: "Passord",
    confirm_password: "Bekreft passord",
    address: "Adresse",
    city: "By",
    postal_code: "Postnummer",
    country: "Land",
    
    placeholders: {
      email: "din@epost.no",
      phone: "+47 123 45 678",
      search: "Søk etter produkter...",
      message: "Skriv din melding her...",
      discount_code: "Skriv inn rabattkode"
    }
  },

  // Help & Support
  support: {
    contact_us: "Kontakt oss",
    faq: "Ofte stilte spørsmål",
    help: "Hjelp",
    customer_service: "Kundeservice",
    phone_hours: "Man-Fre: 09:00-17:00",
    response_time: "Vi svarer innen 24 timer",
    emergency_contact: "Ved medisinsk nødssituasjon, kontakt legevakt: 116 117"
  },

  // Trust Signals
  trust: {
    secure_payment: "Sikker betaling",
    ssl_encrypted: "SSL kryptert",
    free_shipping: "Gratis frakt",
    expert_guidance: "Ekspert rådgivning",
    money_back: "30 dagers returrett",
    quality_guarantee: "Kvalitetsgaranti",
    lab_tested: "Laboratorie-testet",
    sustainable_sources: "Bærekraftige kilder"
  },

  // Meta & SEO
  meta: {
    home_title: "Helseriet - Naturlig helse og kosttilskudd",
    home_description: "Opplev harmonien mellom moderne vitenskap og naturens visdom. Våre nøye utvalgte produkter støtter din reise mot optimal helse.",
    products_title: "Produkter - Helseriet",
    contact_title: "Kontakt oss - Helseriet"
  }
} as const;

// Type-safe copy access
export type CopyKeys = typeof COPY;
export type NavigationCopy = typeof COPY.navigation;
export type LoadingCopy = typeof COPY.loading;
export type ErrorCopy = typeof COPY.errors;