import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        home: 'Home',
        products: 'Products',
        shops: 'Shops',
        contact: 'Contact us',
      },
    },
    fr: {
      translation: {
        home: 'Home',
        products: 'Produits',
        shops: 'Boutiques',
        contact: 'Contactez-nous',
      },
    },
    kin: {
      translation: {
        home: 'Ahabanza',
        products: 'Ibicuruzwa',
        shops: 'Amaduka',
        contact: 'Tuvugishe',
      },
    },
  },
  lng: 'en',
  fallbackLng: 'en',
});

export default i18n;
