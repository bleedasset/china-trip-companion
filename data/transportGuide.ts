import { Ionicons } from '@expo/vector-icons';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

export interface TransportMode {
  id: string;
  name: string;
  nameZh: string;
  icon: IconName;
  color: string;
  description: string;
  howTo: string[];
}

export interface Phrase {
  zh: string;
  pinyin: string;
  en: string;
}

export const transportModes: TransportMode[] = [
  {
    id: 'metro',
    name: 'Metro',
    nameZh: '地铁',
    icon: 'subway',
    color: '#E74C3C',
    description: 'Fast, cheap, and in every major city. Signs and announcements are in English too.',
    howTo: [
      'Buy a single ticket at the machine (English option available)',
      'Or get a transport card for multiple rides',
      'Scan ticket or card at the gate to enter and exit',
      'Follow colored line numbers to find your platform',
    ],
  },
  {
    id: 'taxi',
    name: 'Taxi & Didi',
    nameZh: '出租车',
    icon: 'car',
    color: '#F39C12',
    description: 'Didi is the Chinese Uber. Works in English and links to your foreign card.',
    howTo: [
      'Download Didi (has an English interface)',
      'Set your pickup and destination on the map',
      'Choose a ride type and confirm',
      'For street taxis, have your destination written in Chinese',
    ],
  },
  {
    id: 'bus',
    name: 'Bus',
    nameZh: '公交车',
    icon: 'bus',
    color: '#27AE60',
    description: 'Very cheap but trickier for non-Chinese speakers. Exact fare or transport card needed.',
    howTo: [
      'Have a transport card ready, buses rarely give change',
      'Tap the card when boarding (and sometimes when leaving)',
      'Use a map app to know which stop is yours',
      'Press the button to request a stop',
    ],
  },
];

export const transportPhrases: Phrase[] = [
  { zh: '请带我去这里', pinyin: 'Qǐng dài wǒ qù zhèlǐ', en: 'Please take me here (show on map)' },
  { zh: '我要去机场', pinyin: 'Wǒ yào qù jīchǎng', en: 'I want to go to the airport' },
  { zh: '多少钱？', pinyin: 'Duōshǎo qián?', en: 'How much is it?' },
  { zh: '请打表', pinyin: 'Qǐng dǎ biǎo', en: 'Please use the meter' },
  { zh: '在这里停', pinyin: 'Zài zhèlǐ tíng', en: 'Stop here' },
  { zh: '最近的地铁站在哪里？', pinyin: 'Zuìjìn de dìtiě zhàn zài nǎlǐ?', en: 'Where is the nearest metro station?' },
];