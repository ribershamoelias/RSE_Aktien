import type { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_KEY });

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { symbol, priceData, newsData } = req.body;

  const prompt = `
    Analysiere die Aktie ${symbol} auf Basis dieser Zeitreihe und News-Schlagzeilen.
    Gib mir in maximal 200 Wörtern eine Einschätzung (bullish/neutral/bearish) und eine kurze Begründung.
    Zeitreihe (gekürzt): ${JSON.stringify(priceData).slice(0, 4000)}
    News (gekürzt): ${JSON.stringify(newsData).slice(0, 2000)}
  `;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [{ role: 'user', content: prompt }],
  });

  res.status(200).json({ analysis: completion.choices[0].message.content });
}
