import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';

// Translation strings
export const translations = {
  no: {
    settings: 'Innstillinger',
    theme: 'Tema',
    language: 'Språk',
    lightMode: 'Lys modus',
    darkMode: 'Mørk modus',
    switchToLight: 'Bytt til lys modus',
    switchToDark: 'Bytt til mørk modus',
    selectLanguage: 'Velg språk',
    backToHome: 'Tilbake til forsiden',
    developerSystem: 'Utviklersystem',
    projectOverview: 'Prosjektoversikt',
    typography: 'Typografi',
    colors: 'Farger',
    buttons: 'Knapper',
    cards: 'Kort',
    grid: 'Grid System',
    animations: 'Animasjoner',
    // General UI translations
    home: 'Hjem',
    products: 'Produkter',
    specialist: 'Spesialist',
    philosophy: 'Filosofi',
    contact: 'Kontakt',
    cart: 'Handlekurv',
    search: 'Søk',
    loading: 'Laster...',
    error: 'Feil',
    retry: 'Prøv igjen'
  },
  en: {
    settings: 'Settings',
    theme: 'Theme',
    language: 'Language',
    lightMode: 'Light mode',
    darkMode: 'Dark mode',
    switchToLight: 'Switch to light mode',
    switchToDark: 'Switch to dark mode',
    selectLanguage: 'Select language',
    backToHome: 'Back to home',
    developerSystem: 'Developer System',
    projectOverview: 'Project Overview',
    typography: 'Typography',
    colors: 'Colors',
    buttons: 'Buttons',
    cards: 'Cards',
    grid: 'Grid System',
    animations: 'Animations',
    // General UI translations
    home: 'Home',
    products: 'Products',
    specialist: 'Specialist',
    philosophy: 'Philosophy',
    contact: 'Contact',
    cart: 'Cart',
    search: 'Search',
    loading: 'Loading...',
    error: 'Error',
    retry: 'Retry'
  },
  sv: {
    settings: 'Inställningar',
    theme: 'Tema',
    language: 'Språk',
    lightMode: 'Ljust läge',
    darkMode: 'Mörkt läge',
    switchToLight: 'Byt till ljust läge',
    switchToDark: 'Byt till mörkt läge',
    selectLanguage: 'Välj språk',
    backToHome: 'Tillbaka till startsidan',
    developerSystem: 'Utvecklarsystem',
    projectOverview: 'Projektöversikt',
    typography: 'Typografi',
    colors: 'Färger',
    buttons: 'Knappar',
    cards: 'Kort',
    grid: 'Rutsystem',
    animations: 'Animationer',
    // General UI translations
    home: 'Hem',
    products: 'Produkter',
    specialist: 'Specialist',
    philosophy: 'Filosofi',
    contact: 'Kontakt',
    cart: 'Kundvagn',
    search: 'Sök',
    loading: 'Laddar...',
    error: 'Fel',
    retry: 'Försök igen'
  },
  da: {
    settings: 'Indstillinger',
    theme: 'Tema',
    language: 'Sprog',
    lightMode: 'Lys tilstand',
    darkMode: 'Mørk tilstand',
    switchToLight: 'Skift til lys tilstand',
    switchToDark: 'Skift til mørk tilstand',
    selectLanguage: 'Vælg sprog',
    backToHome: 'Tilbage til forsiden',
    developerSystem: 'Udviklersystem',
    projectOverview: 'Projektoversigt',
    typography: 'Typografi',
    colors: 'Farver',
    buttons: 'Knapper',
    cards: 'Kort',
    grid: 'Gittesystem',
    animations: 'Animationer',
    // General UI translations
    home: 'Hjem',
    products: 'Produkter',
    specialist: 'Specialist',
    philosophy: 'Filosofi',
    contact: 'Kontakt',
    cart: 'Kurv',
    search: 'Søg',
    loading: 'Indlæser...',
    error: 'Fejl',
    retry: 'Prøv igen'
  }
};

export type Language = 'no' | 'en' | 'sv' | 'da';
export type TranslationKey = keyof typeof translations.no;

interface PreferencesContextType {
  isDarkTheme: boolean;
  selectedLanguage: Language;
  toggleTheme: () => void;
  changeLanguage: (language: Language) => void;
  t: (key: TranslationKey) => string;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

interface PreferencesProviderProps {
  children: ReactNode;
}

export const PreferencesProvider: React.FC<PreferencesProviderProps> = ({ children }) => {
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>('no');

  // Translation function
  const t = (key: TranslationKey): string => {
    return translations[selectedLanguage][key] || translations.no[key];
  };

  // Load preferences from localStorage on mount
  useEffect(() => {
    // Load saved theme preference
    const savedTheme = localStorage.getItem('helseriet-theme');
    if (savedTheme === 'dark') {
      setIsDarkTheme(true);
    }
    
    // Load saved language preference
    const savedLanguage = localStorage.getItem('helseriet-language') as Language;
    if (savedLanguage && ['no', 'en', 'sv', 'da'].includes(savedLanguage)) {
      setSelectedLanguage(savedLanguage);
    }
  }, []);

  // Apply theme to document when isDarkTheme changes
  useEffect(() => {
    if (isDarkTheme) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkTheme]);

  const toggleTheme = () => {
    const newTheme = !isDarkTheme;
    setIsDarkTheme(newTheme);
    localStorage.setItem('helseriet-theme', newTheme ? 'dark' : 'light');
  };

  const changeLanguage = (language: Language) => {
    setSelectedLanguage(language);
    localStorage.setItem('helseriet-language', language);
  };

  const value: PreferencesContextType = {
    isDarkTheme,
    selectedLanguage,
    toggleTheme,
    changeLanguage,
    t
  };

  return (
    <PreferencesContext.Provider value={value}>
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = (): PreferencesContextType => {
  const context = useContext(PreferencesContext);
  if (context === undefined) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};