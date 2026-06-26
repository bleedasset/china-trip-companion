export type FactCategory = 'transport' | 'payment' | 'sos' | 'general';

export const funFacts: Record<FactCategory, string[]> = {
  transport: [
    'China has the world\'s largest high-speed rail network — over 45,000 km of track.',
    'The Shanghai Maglev reaches 431 km/h, making it the fastest commercial train on Earth.',
    'Beijing\'s metro carries over 10 million passengers on a busy day — more than some countries\' populations.',
    'Didi, China\'s ride-hailing giant, completes more rides per day than the rest of the world combined.',
    'Many Chinese cities have dedicated lanes for the millions of electric scooters and bikes.',
    'You can travel from Beijing to Shanghai (1,300 km) in just 4.5 hours by high-speed train.',
  ],
  payment: [
    'China is nearly cashless — some street beggars reportedly accept QR-code donations.',
    'Over 90% of digital payments in China go through WeChat Pay and Alipay.',
    'The "red envelope" (红包) tradition went digital — billions are sent through WeChat each New Year.',
    'Alipay started as a way to build trust between buyers and sellers on Taobao in 2004.',
    'Some Chinese vending machines let you pay just by smiling at a facial-recognition camera.',
    'Mobile payment is so normal that many young people rarely carry a physical wallet.',
  ],
  sos: [
    'China\'s emergency number for police is 110 — easy to remember and works nationwide.',
    'Large Chinese hospitals often have a dedicated "International Department" with English-speaking staff.',
    'Pharmacies (药店) are everywhere in China and can help with minor health issues quickly.',
    'The Chinese character for "person" (人) looks like a walking figure — handy in safety signs.',
    'Many Chinese cities have 24-hour convenience stores that double as safe rest points.',
    'Travel insurance is highly recommended — private hospital care can be costly without it.',
  ],
  general: [
    'China spans five geographical time zones but officially uses just one — Beijing Time.',
    'The Great Wall is not a single wall but many walls built over 2,000 years.',
    'China has more mobile internet users than the entire population of any other country.',
    'Tea culture in China dates back nearly 5,000 years.',
    'The color red symbolizes luck and joy — you\'ll see it everywhere during festivals.',
  ],
};

export function getRandomFact(category: FactCategory): string {
  const facts = funFacts[category];
  return facts[Math.floor(Math.random() * facts.length)];
}