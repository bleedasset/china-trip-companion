export type Language = 'en' | 'ru';

export const translations = {
  en: {
    // Tabs
    tabScanner: 'Scanner',
    tabPayment: 'Payment',
    tabTransport: 'Transport',
    tabSos: 'SOS',
    tabAi: 'AI',

    // Scanner
    scannerTitle: 'Scanner',
    scannerSubtitle: 'Point camera at any Chinese text',
    scanButton: 'Scan Text',
    cameraNeeded: 'Camera access needed',
    cameraNeededText: 'We use the camera to scan and translate Chinese text',
    allowCamera: 'Allow camera',

    // Payment
    paymentTitle: 'Payment',
    paymentSubtitle: 'Set up mobile payments in China',
    howToSetUp: 'How to set up',

    // Transport
    transportTitle: 'Transport',
    transportSubtitle: 'Get around China with ease',
    chooseCity: 'Choose your city',
    waysToTravel: 'Ways to travel',
    usefulPhrases: 'Useful phrases',
    tapToCopy: 'Tap a phrase to copy, then show it to the driver',
    quickActions: 'Quick actions',
    fromAirport: 'From the airport',
    metro: 'Metro',
    taxiRideHailing: 'Taxi & ride-hailing',
    keyDistricts: 'Key districts',
    open: 'Open',

    // SOS
    sosTitle: 'SOS',
    sosSubtitle: 'Emergency help in China',
    emergencyNumbers: 'Emergency numbers',
    medicalPhrases: 'Medical phrases',
    tapToCopyMedical: 'Tap to copy, then show to medical staff',
    goodToKnow: 'Good to know',

    // AI
    aiTitle: 'AI Assistant',
    aiSubtitle: 'Ask anything about your China trip',
    aiEmptyTitle: 'Your China travel guide',
    aiEmptyText: 'Ask about culture, food, etiquette, or anything else',
    askAnything: 'Ask anything...',

    // Common
    didYouKnow: 'Did you know?',
  },
  ru: {
    // Tabs
    tabScanner: 'Сканер',
    tabPayment: 'Оплата',
    tabTransport: 'Транспорт',
    tabSos: 'SOS',
    tabAi: 'AI',

    // Scanner
    scannerTitle: 'Сканер',
    scannerSubtitle: 'Наведите камеру на китайский текст',
    scanButton: 'Сканировать',
    cameraNeeded: 'Нужен доступ к камере',
    cameraNeededText: 'Камера используется для распознавания и перевода китайского текста',
    allowCamera: 'Разрешить камеру',

    // Payment
    paymentTitle: 'Оплата',
    paymentSubtitle: 'Настройте мобильные платежи в Китае',
    howToSetUp: 'Как настроить',

    // Transport
    transportTitle: 'Транспорт',
    transportSubtitle: 'Передвигайтесь по Китаю легко',
    chooseCity: 'Выберите город',
    waysToTravel: 'Способы передвижения',
    usefulPhrases: 'Полезные фразы',
    tapToCopy: 'Нажмите на фразу чтобы скопировать и показать водителю',
    quickActions: 'Быстрые действия',
    fromAirport: 'Из аэропорта',
    metro: 'Метро',
    taxiRideHailing: 'Такси и каршеринг',
    keyDistricts: 'Главные районы',
    open: 'Открыть',

    // SOS
    sosTitle: 'SOS',
    sosSubtitle: 'Экстренная помощь в Китае',
    emergencyNumbers: 'Экстренные номера',
    medicalPhrases: 'Медицинские фразы',
    tapToCopyMedical: 'Нажмите чтобы скопировать и показать медперсоналу',
    goodToKnow: 'Полезно знать',

    // AI
    aiTitle: 'AI Ассистент',
    aiSubtitle: 'Спросите что угодно о поездке в Китай',
    aiEmptyTitle: 'Ваш гид по Китаю',
    aiEmptyText: 'Спросите о культуре, еде, этикете или о чём угодно',
    askAnything: 'Спросите что угодно...',

    // Common
    didYouKnow: 'А вы знали?',
  },
};

export type TranslationKey = keyof typeof translations.en;