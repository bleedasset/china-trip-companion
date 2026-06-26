const GROQ_API_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY;
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
const VISION_MODEL = 'meta-llama/llama-4-scout-17b-16e-instruct';

export type TargetLanguage = 'ru' | 'en';

export interface ScanResult {
  original: string;
  pinyin: string;
  translation: string;
  context: string;
}

const languageNames: Record<TargetLanguage, string> = {
  ru: 'Russian',
  en: 'English',
};

export async function scanImage(
  base64Image: string,
  targetLang: TargetLanguage
): Promise<ScanResult> {
  if (!GROQ_API_KEY) {
    throw new Error('API key is missing. Check your .env file.');
  }

  const langName = languageNames[targetLang];

  const prompt = `You are a translation assistant for travelers in China. Look at the Chinese text in this image and respond ONLY with a valid JSON object (no markdown, no backticks) in this exact format:
{
  "original": "the Chinese text you see",
  "pinyin": "pinyin romanization with tone marks",
  "translation": "translation into ${langName}",
  "context": "a short helpful note in ${langName} about what this is (e.g. a dish, a sign, a warning) and any useful tip for a traveler"
}
If you see no Chinese text, set all fields to a short message saying no text was found.`;

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: VISION_MODEL,
      messages: [
        {
          role: 'user',
          content: [
            { type: 'text', text: prompt },
            {
              type: 'image_url',
              image_url: { url: `data:image/jpeg;base64,${base64Image}` },
            },
          ],
        },
      ],
      temperature: 0.3,
      max_completion_tokens: 1024,
      response_format: { type: 'json_object' },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('Empty response from Groq.');
  }

  try {
    return JSON.parse(content) as ScanResult;
  } catch {
    throw new Error('Failed to parse response.');
  }
}
const CHAT_MODEL = 'llama-3.3-70b-versatile';

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export async function chatWithAI(
  messages: ChatMessage[],
  targetLang: TargetLanguage
): Promise<string> {
  if (!GROQ_API_KEY) {
    throw new Error('API key is missing. Check your .env file.');
  }

  const langName = languageNames[targetLang];

  const systemPrompt = `You are a friendly, knowledgeable travel assistant for tourists visiting China. Answer questions about Chinese culture, etiquette, food, customs, transport, shopping, and practical travel tips. Keep answers concise, warm, and practical. Always respond in ${langName}. If a question is not about China or travel, gently steer back to helping with their China trip.`;

  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: CHAT_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages,
      ],
      temperature: 0.7,
      max_completion_tokens: 1024,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Groq API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (!content) {
    throw new Error('Empty response from Groq.');
  }

  return content;
}