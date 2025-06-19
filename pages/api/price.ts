import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { symbol } = JSON.parse(req.body);
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&outputsize=compact&apikey=${process.env.ALPHA_KEY}`;

  const apiRes = await fetch(url);
  const data   = await apiRes.json();

  if (data['Error Message']) {
    return res.status(404).json({ error: 'Symbol nicht gefunden' });
  }
  res.status(200).json(data);
}
