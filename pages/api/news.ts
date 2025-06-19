import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { symbol } = JSON.parse(req.body);
  const from = new Date(Date.now() - 1000 * 60 * 60 * 24 * 14)
    .toISOString()
    .split('T')[0];

  const url = `https://newsapi.org/v2/everything?q=${symbol}&from=${from}&language=de,en&sortBy=publishedAt&apiKey=${process.env.NEWS_KEY}`;
  const apiRes = await fetch(url);
  const data   = await apiRes.json();

  res.status(200).json(data);
}
