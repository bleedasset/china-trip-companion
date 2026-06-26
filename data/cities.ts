export interface AirportRoute {
  airport: string;
  airportZh: string;
  bestOption: string;
  time: string;
  price: string;
  details: string;
}

export interface CityInfo {
  id: string;
  name: string;
  nameZh: string;
  emoji: string;
  tagline: string;
  airports: AirportRoute[];
  metro: {
    lines: string;
    fare: string;
    hours: string;
    tip: string;
  };
  taxiInfo: string;
  districts: { name: string; note: string }[];
  localTip: string;
}

export const cities: CityInfo[] = [
  {
    id: 'beijing',
    name: 'Beijing',
    nameZh: '北京',
    emoji: '🏯',
    tagline: 'Capital — history, temples, the Great Wall',
    airports: [
      {
        airport: 'Capital Airport (PEK)',
        airportZh: '首都机场',
        bestOption: 'Airport Express train',
        time: '~20-30 min',
        price: '¥25',
        details: 'Runs to Dongzhimen in the city, every 8-10 min, 6:35 AM-11 PM. Connects to metro Lines 2 and 13.',
      },
      {
        airport: 'Daxing Airport (PKX)',
        airportZh: '大兴机场',
        bestOption: 'Daxing Airport Express',
        time: '~22 min',
        price: '¥35-45',
        details: 'Fastest subway in China (160 km/h) to Caoqiao, then transfer to Line 10 or 19. Taxi ~¥220, 80 min.',
      },
    ],
    metro: {
      lines: '27 lines covering the whole city',
      fare: '¥3-9 by distance',
      hours: '~5:00 AM - 11:00 PM',
      tip: 'Lines 1, 2 and 10 cover most tourist sites. Avoid rush hours 7-9 AM and 5-7 PM.',
    },
    taxiInfo: 'Use Didi (English interface). Street taxis: have your destination written in Chinese. Base fare ~¥13.',
    districts: [
      { name: 'Dongcheng', note: 'Forbidden City, Tiananmen, hutongs' },
      { name: 'Chaoyang', note: 'Nightlife, embassies, modern Beijing' },
      { name: 'Xicheng', note: 'Temples, lakes, traditional charm' },
    ],
    localTip: 'Book Forbidden City tickets online in advance — they sell out and require passport ID.',
  },
  {
    id: 'shanghai',
    name: 'Shanghai',
    nameZh: '上海',
    emoji: '🌆',
    tagline: 'Modern megacity — skyline, shopping, the Bund',
    airports: [
      {
        airport: 'Pudong Airport (PVG)',
        airportZh: '浦东机场',
        bestOption: 'Maglev + Metro Line 2',
        time: '~8 min maglev + transfer',
        price: '¥50 maglev (¥40 with flight ticket)',
        details: 'Maglev hits 300 km/h to Longyang Road, then Line 2 downtown. Cheaper: Metro Line 2 all the way (~¥9, 60 min).',
      },
      {
        airport: 'Hongqiao Airport (SHA)',
        airportZh: '虹桥机场',
        bestOption: 'Metro Line 2 or 10',
        time: '~30-40 min',
        price: '~¥6-8',
        details: 'Much closer to the city (15 km). Direct metro access from the terminal.',
      },
    ],
    metro: {
      lines: '20+ lines, one of the world\'s largest networks',
      fare: '¥3-15 by distance',
      hours: '~5:30 AM - 10:30 PM',
      tip: 'Line 2 is the main east-west artery hitting the Bund, People\'s Square, and both airports. Clear English signage.',
    },
    taxiInfo: 'Didi works great here. Official taxis are turquoise/blue. Base fare ~¥14.',
    districts: [
      { name: 'Huangpu', note: 'The Bund, Nanjing Road, People\'s Square' },
      { name: 'Pudong', note: 'Skyscrapers, Lujiazui, financial district' },
      { name: 'Xuhui', note: 'Former French Concession, cafes, tree-lined streets' },
    ],
    localTip: 'The Bund is stunning at night when Pudong\'s skyline lights up. Go after 7 PM.',
  },
  {
    id: 'guangzhou',
    name: 'Guangzhou',
    nameZh: '广州',
    emoji: '🍵',
    tagline: 'Southern hub — Cantonese food, trade, dim sum',
    airports: [
      {
        airport: 'Baiyun Airport (CAN)',
        airportZh: '白云机场',
        bestOption: 'Metro Line 3',
        time: '~50-60 min',
        price: '~¥8',
        details: 'Direct metro from the airport into the city. Taxi ~¥130, 50-70 min depending on traffic.',
      },
    ],
    metro: {
      lines: '16+ lines, fast and modern',
      fare: '¥2-14 by distance',
      hours: '~6:00 AM - 11:00 PM',
      tip: 'Line 3 is the main north-south line but gets very crowded. Line 1 covers central sights.',
    },
    taxiInfo: 'Didi is widely used. Taxis are common; base fare ~¥12. Cantonese is local but Mandarin works.',
    districts: [
      { name: 'Yuexiu', note: 'Old town, parks, historic sites' },
      { name: 'Tianhe', note: 'Modern CBD, shopping, Canton Tower views' },
      { name: 'Liwan', note: 'Traditional Cantonese culture, Shamian Island' },
    ],
    localTip: 'Guangzhou is the dim sum capital — try a traditional morning "yum cha" tea house.',
  },
  {
    id: 'shenzhen',
    name: 'Shenzhen',
    nameZh: '深圳',
    emoji: '🌃',
    tagline: 'Tech city — innovation, gateway to Hong Kong',
    airports: [
      {
        airport: 'Bao\'an Airport (SZX)',
        airportZh: '宝安机场',
        bestOption: 'Metro Line 11',
        time: '~40-50 min',
        price: '~¥7',
        details: 'Line 11 (with a faster business carriage option) runs into the city. Taxi ~¥100-150.',
      },
    ],
    metro: {
      lines: '17+ lines, one of the newest systems',
      fare: '¥2-14 by distance',
      hours: '~6:30 AM - 11:00 PM',
      tip: 'Line 1 connects the airport area, Window of the World, and the city center. Very clean and modern.',
    },
    taxiInfo: 'Didi dominates here. Taxis are red or green; base fare ~¥10. The city is young and English-friendlier.',
    districts: [
      { name: 'Futian', note: 'Central business district, government' },
      { name: 'Nanshan', note: 'Tech companies, beaches, universities' },
      { name: 'Luohu', note: 'Shopping, border crossing to Hong Kong' },
    ],
    localTip: 'Shenzhen borders Hong Kong — you can cross at Luohu or Futian checkpoints with the right visa.',
  },
  {
    id: 'xian',
    name: 'Xi\'an',
    nameZh: '西安',
    emoji: '🏛️',
    tagline: 'Ancient capital — Terracotta Army, city walls',
    airports: [
      {
        airport: 'Xianyang Airport (XIY)',
        airportZh: '咸阳机场',
        bestOption: 'Airport Metro (Line 14) or shuttle bus',
        time: '~50 min',
        price: '~¥10 metro, ¥25 shuttle',
        details: 'Metro Line 14 connects to the city network. Airport shuttle buses run to several city points. Taxi ~¥120.',
      },
    ],
    metro: {
      lines: '9+ lines, growing network',
      fare: '¥2-8 by distance',
      hours: '~6:00 AM - 11:00 PM',
      tip: 'Line 2 runs north-south through the walled city center, near the Bell Tower and main sights.',
    },
    taxiInfo: 'Didi works well. Taxis are plentiful; base fare ~¥9. Many drivers near sights are used to tourists.',
    districts: [
      { name: 'Beilin', note: 'Inside the city walls, Bell Tower, Muslim Quarter' },
      { name: 'Yanta', note: 'Big Wild Goose Pagoda, museums' },
      { name: 'Lintong', note: 'Terracotta Army (about 1 hr from center)' },
    ],
    localTip: 'Rent a bike to cycle the full 14 km loop atop the ancient city wall — a unique experience.',
  },
];
export interface TransportApp {
  id: string;
  name: string;
  nameZh: string;
  purpose: string;
  color: string;
  scheme: string;
  storeUrl: string;
}

export const transportApps: TransportApp[] = [
  {
    id: 'didi',
    name: 'Didi',
    nameZh: '滴滴出行',
    purpose: 'Ride-hailing (China\'s Uber). English interface.',
    color: '#FF7E33',
    scheme: 'diditaxi://',
    storeUrl: 'https://apps.apple.com/app/id554499054',
  },
  {
    id: 'tripcom',
    name: 'Trip.com',
    nameZh: '携程',
    purpose: 'Book train & flight tickets in English, foreign cards.',
    color: '#2577E3',
    scheme: 'ctrip://',
    storeUrl: 'https://apps.apple.com/app/id1004250768',
  },
  {
    id: '12306',
    name: 'Railway 12306',
    nameZh: '铁路12306',
    purpose: 'Official train tickets, no booking fees, passport ID.',
    color: '#1A6FB5',
    scheme: 'cn.12306://',
    storeUrl: 'https://apps.apple.com/app/id564818797',
  },
];