import Head from 'next/head';
import Header from '@/components/Header';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
  const { locale } = useRouter();
  const t = locale === 'de'
    ? {
        hero: 'KI-gestützte Aktienanalysen & Pakete',
        cta: 'Jetzt analysieren',
        paket: 'Premium-Pakete',
      }
    : {
        hero: 'AI-powered stock analytics & bundles',
        cta: 'Start analyzing',
        paket: 'Premium bundles',
      };

  return (
    <>
      <Head>
        <title>RSE Stock Insights</title>
      </Head>

      <Header />

      <main className="flex flex-col items-center justify-center gap-8 py-24 text-white">
        <h1 className="text-4xl text-center px-4">{t.hero}</h1>

        <Link
          href="/analyze"
          className="px-6 py-3 rounded bg-brand text-dark font-semibold"
        >
          {t.cta}
        </Link>

        <Link
          href="/pakete/top-5-ki-aktien-2025"
          className="underline mt-12"
        >
          {t.paket} →
        </Link>
      </main>
    </>
  );
}
