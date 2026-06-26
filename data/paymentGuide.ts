import { Ionicons } from '@expo/vector-icons';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

export interface PaymentMethod {
  id: string;
  name: string;
  nameZh: string;
  color: string;
  icon: IconName;
  description: string;
  appScheme: string;
  appStoreUrl: string;
  steps: string[];
  tips: string[];
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'alipay',
    name: 'Alipay',
    nameZh: '支付宝',
    color: '#1677FF',
    icon: 'wallet',
    description: 'The easiest app for foreign travelers. Cleaner interface and built-in travel mini-apps like Didi.',
    appScheme: 'alipay://',
    appStoreUrl: 'https://itunes.apple.com/app/id333206289',
    steps: [
      'Download the global version of Alipay',
      'Register with your phone number and SMS code',
      'Tap Me → Bank Cards → Add Card',
      'Enter your foreign Visa or Mastercard details',
      'Complete passport scan and facial recognition',
      'Use Scan or Pay to make payments',
    ],
    tips: [
      'Set this up at home before your flight',
      'Single payment limit raised to ~¥35,000 in 2026',
      'Payments under ¥200 have no fee; above that ~3%',
      'Place passport on a dark matte surface to avoid glare during scan',
    ],
  },
  {
    id: 'wechat',
    name: 'WeChat Pay',
    nameZh: '微信支付',
    color: '#07C160',
    icon: 'chatbubbles',
    description: 'Built into the WeChat super-app. Worth having as backup since some merchants prefer it.',
    appScheme: 'weixin://',
    appStoreUrl: 'https://itunes.apple.com/app/id414478124',
    steps: [
      'Download WeChat and register your account',
      'Go to Me → Services → Wallet',
      'If you don\'t see Services, have a friend send you 1 RMB',
      'Tap Cards → Add a Bank Card',
      'Enter your foreign card details',
      'Complete passport verification',
    ],
    tips: [
      'Set up Alipay first, WeChat second as backup',
      'WeChat is more likely to trigger extra verification',
      'Annual limit for foreign cards is ~¥50,000',
      'Foreign cards work for merchant payments, not P2P transfers',
    ],
  },
];

export const quickFacts = [
  {
    icon: 'card-outline' as IconName,
    title: 'Cash is rare',
    text: 'Most places prefer mobile payment. Carry ¥100-300 as backup.',
  },
  {
    icon: 'globe-outline' as IconName,
    title: 'Foreign cards work',
    text: 'Link Visa or Mastercard directly — no Chinese bank account needed.',
  },
  {
    icon: 'phone-portrait-outline' as IconName,
    title: 'QR codes everywhere',
    text: 'Scan a merchant code or show your own to be scanned.',
  },
];