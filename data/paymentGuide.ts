import { Ionicons } from '@expo/vector-icons';

type IconName = React.ComponentProps<typeof Ionicons>['name'];

export interface PaymentMethod {
  id: string;
  name: string;
  nameZh: string;
  color: string;
  icon: IconName;
  description: string;
  steps: string[];
  tips: string[];
}

export const paymentMethods: PaymentMethod[] = [
  {
    id: 'wechat',
    name: 'WeChat Pay',
    nameZh: '微信支付',
    color: '#07C160',
    icon: 'chatbubbles',
    description: 'The most widely used payment app in China. Linked to WeChat messenger.',
    steps: [
      'Download WeChat and create an account with your phone number',
      'Open Me → Services → Wallet',
      'Tap Bank Cards → Add a Card',
      'Enter your foreign Visa or Mastercard details',
      'Complete identity verification with your passport',
      'Once verified, use Scan or Money to pay',
    ],
    tips: [
      'Foreign cards work for payments since late 2023',
      'A small transaction fee applies for foreign cards',
      'Keep your passport photo handy for verification',
    ],
  },
  {
    id: 'alipay',
    name: 'Alipay',
    nameZh: '支付宝',
    color: '#1677FF',
    icon: 'wallet',
    description: 'A standalone payment app by Ant Group. Popular for shopping and travel.',
    steps: [
      'Download Alipay from the App Store or Google Play',
      'Register with your phone number',
      'Tap the + or Add Card option on the home screen',
      'Select International Card and enter your card details',
      'Verify your identity with your passport',
      'Use Scan or Pay/Collect to make payments',
    ],
    tips: [
      'Alipay has a built-in Tour Pass for short-term visitors',
      'Supports English interface in settings',
      'Has a real-time translation feature built in',
    ],
  },
];

export const quickFacts = [
  {
    icon: 'card-outline' as IconName,
    title: 'Cash is rare',
    text: 'Most places prefer mobile payment. Carry some cash as backup.',
  },
  {
    icon: 'globe-outline' as IconName,
    title: 'Foreign cards now work',
    text: 'Since 2023 you can link international cards to both apps.',
  },
  {
    icon: 'phone-portrait-outline' as IconName,
    title: 'QR codes everywhere',
    text: 'You either scan a merchant code or show your own to be scanned.',
  },
];