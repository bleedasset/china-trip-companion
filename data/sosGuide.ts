import { Ionicons } from '@expo/vector-icons';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

export interface EmergencyNumber {
  service: string;
  number: string;
  icon: IconName;
  color: string;
}

export interface MedicalPhrase {
  zh: string;
  pinyin: string;
  en: string;
}

export const emergencyNumbers: EmergencyNumber[] = [
  { service: 'Police', number: '110', icon: 'shield', color: '#2980B9' },
  { service: 'Ambulance', number: '120', icon: 'medkit', color: '#C0392B' },
  { service: 'Fire', number: '119', icon: 'flame', color: '#E67E22' },
  { service: 'Traffic accident', number: '122', icon: 'car', color: '#16A085' },
];

export const medicalPhrases: MedicalPhrase[] = [
  { zh: '救命！', pinyin: 'Jiùmìng!', en: 'Help!' },
  { zh: '我需要医生', pinyin: 'Wǒ xūyào yīshēng', en: 'I need a doctor' },
  { zh: '请叫救护车', pinyin: 'Qǐng jiào jiùhùchē', en: 'Please call an ambulance' },
  { zh: '我对这个过敏', pinyin: 'Wǒ duì zhège guòmǐn', en: 'I am allergic to this' },
  { zh: '我这里疼', pinyin: 'Wǒ zhèlǐ téng', en: 'It hurts here (point)' },
  { zh: '最近的医院在哪里？', pinyin: 'Zuìjìn de yīyuàn zài nǎlǐ?', en: 'Where is the nearest hospital?' },
  { zh: '我有糖尿病', pinyin: 'Wǒ yǒu tángniàobìng', en: 'I have diabetes' },
  { zh: '我需要这种药', pinyin: 'Wǒ xūyào zhè zhǒng yào', en: 'I need this medicine' },
];

export const sosTips = [
  'Save your embassy phone number before traveling',
  'Many large hospitals have international departments with English-speaking staff',
  'Pharmacies (药店) are common and can help with minor issues',
  'Carry a card with your blood type and allergies in Chinese',
];