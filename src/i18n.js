import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      header: {
        link1: 'Link 1',
        link2: 'Link 2',
        link3: 'Link 3',
        placeHolder: 'Search...',
        noResults: 'There is no such course',
        btn: 'Login',
      },
      home: {
        btn: 'I WANT',
        bye: 'WRITE TO US WHAT WE CAN IMPROVE',
        footer: 'FOOTER',
        noResults: 'P.S. Your course could be here',
        adv: 'SOME SOME ADVERTISING SLOGAN OR SOMETHING THAT EXPLAINS WHAT IS HAPPENING HERE. ABOUT COOL CONDITIONS. WHAT IS EVERYTHING POSSIBLE, WHAT IS A LOWER COMMISSION, WHAT IS A PROJECT FOR ARTISTS. MAKE MONEY FROM YOUR SKILLS. DONT BE AFRAID TO MONETATE YOUR SKILLS.',
      },
      personal: {
        ms: 'MY PURCHASES',
        wdis: 'WHAT I SOLD',
        pay: 'PAYMENT METHOD',
        footer: 'FOOTER',
        titlePay: 'Select a payment method',
        cCard: 'Credit card',
        bCard: 'Bank transfer',
        ok: 'Save',
        no: 'Cancel',
        logOut: 'Logout',
        titlePass: 'Change password',
        lPas: 'New password',
        lOPas: 'Old password',
        rPas: 'Enter a new password!',
        rOPas: 'Enter your old password!',
        titleProfile: 'Edit profile',
        lPhoto: 'Photo',
        rPhoto: 'Choose a photo!',
        uPhoto: 'Select photo',
        lName: 'First name',
        rName: 'Enter first name!',
        lSname: 'Last name',
        rSname: 'Enter last name!',
        lDesc: 'Description',
        rDesc: 'Enter description!',
        lInst: 'Instagram',
        rInst: 'Enter Instagram link!',
        lPort: 'Portfolio',
        rPort: 'Enter portfolio link!',
        lAS: 'ArtStation',
        rAS: 'Enter ArtStation link!',
      },
    },
  },
  ru: {
    translation: {
      header: {
        link1: 'Ссылка 1',
        link2: 'Ссылка 2',
        link3: 'Ссылка 3',
        placeHolder: 'Поиск...',
        noResults: 'Такого курса нет',
        btn: 'Вход',
      },
      home: {
        btn: 'ХОЧУ',
        bye: 'НАПИШИ НАМ ЧТО НАМ УЛУЧШИТЬ',
        footer: 'ПОДВАЛ',
        noResults: 'P.S. Здесь мог быть ваш курс',
        adv: 'КАКОЙ-НИБУДЬ РЕКЛАМНЫЙ СЛОГАН ИЛИ ЧТО-ТО ЧТО ОБЪЯСНЯЕТ ЧЕ ТУТ ПРОИСХОДИТ. ПРО КЛЕВЫЕ УСЛОВИЯ. ЧТО МОЖНО ВСЕМ, ЧТО МЕНЬШАЯ КОМИССИЯ, ЧТО ПРОЕКТ ДЛЯ ХУДОЖНИКОВ. ЗАРАБАТЫВАЙ НА СВОИХ НАВЫКАХ. НЕ БОЙСЯ МОНЕТЕЗИРОВАТЬ СВОИ НАВЫКИ',
      },
      personal: {
        ms: 'МОИ ПОКУПКИ',
        wdis: 'ЧЕ Я ПРОДАЛ',
        pay: 'СПОСОБ ОПЛАТЫ',
        footer: 'ПОДВАЛ',
        titlePay: 'Выберите способ оплаты',
        cCard: 'Кредитная карта',
        bCard: 'Банковский перевод',
        ok: 'Сохранить',
        no: 'Отмена',
        logOut: 'Выйти из аккаунта',
        titlePass: 'Изменить пароль',
        lPas: 'Новый пароль',
        lOPas: 'Старый пароль',
        rPas: 'Введите новый пароль!',
        rOPas: 'Введите старый пароль!',
        titleProfile: 'Редактировать профиль',
        lPhoto: 'Фотография',
        rPhoto: 'Выберите фотографию!',
        uPhoto: 'Выберите фото',
        lName: 'Имя',
        rName: 'Введите имя!',
        lSname: 'Фамилия',
        rSname: 'Введите фамилию!',
        lDesc: 'Описание',
        rDesc: 'Введите описание!',
        lInst: 'Инстаграм',
        rInst: 'Введите ссылку на Instagram!',
        lPort: 'Портфолио',
        rPort: 'Введите ссылку на портфолио!',
        lAS: 'ArtStation',
        rAS: 'Введите ссылку на ArtStation!',
      },
    },
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'ru',
    detection: {
      order: ['localStorage', 'cookie', 'htmlTag', 'path', 'subdomain'],
      caches: ['localStorage', 'cookie'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
