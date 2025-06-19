import { useState } from 'react';
import Header from '@/components/Header';
import Head from 'next/head';

export default function Analyze() {
  const [ticker, setTicker] = useState('');
  const [loading, setLoading] = useState(false);
  const [ai, setAI] = useState<string | null>(null);
  const [news, setNews] = useState<any[]>([]);

  const handleAnalyze = async () => {
    if (!ticker) return;
    setLoading(true);

    const [priceRes, newsRes] = await Promise.all([
      fetch('/api/price', { method: 'POST', body: JSON.stringify({ symbol: ticker }) }),
      fetch('/api/news',  { method: 'POST', body: JSON.stringify({ symbol: ticker }) }),
    ]);

    const priceData = await priceRes.json();
    const newsData  = await newsRes.json();

    const aiRes = await fetch('/api/analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ symbol: ticker, priceData, newsData }),
    });
    const { analysis } = await aiRes.json();

    setAI(analysis);
    setNews(newsData.articles || []);
    setLoading(false);
  };

  return (
    <>
      <Head><title>Analyse | RSE Stock Insights</title></Head>
      <Header />

      <main className="max-w-3xl mx-auto px-4 py-12 text-white">
        <h1 className="text-2xl mb-6">Aktienanalyse</h1>

        <div className="flex gap-3 mb-8">
          <input
            value={ticker}
            onChange={e => setTicker(e.target.value.toUpperCase())}
            placeholder="AAPL"
            className="flex-1 p-3 rounded bg-dark border border-brand text-white"
          />
          <button
            onClick={handleAnalyze}
            className="px-5 py-3 rounded bg-brand text-dark font-semibold"
            disabled={loading}
          >
            {loading ? '…' : 'Analysieren'}
          </button>
        </div>

        {ai && (
          <section className="mb-12">
            <h2 className="text-xl mb-2">KI-Analyse</h2>
            <pre className="whitespace-pre-wrap">{ai}</pre>
          </section>
        )}

        {news.length > 0 && (
          <section>
            <h2 className="text-xl mb-2">Aktuelle News</h2>
            <ul className="list-disc ml-6">
              {news.slice(0, 6).map(n => (
                <li key={n.url}>
                  <a href={n.url} target="_blank" className="underline">
                    {n.title}
                  </a>
                </li>
              ))}
            </ul>
          </section>
        )}
      </main>
    </>
  );
}
