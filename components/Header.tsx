import Link from 'next/link';
import { useRouter } from 'next/router';
import { UserButton, SignInButton } from '@clerk/nextjs';

export default function Header() {
  const { locale, pathname } = useRouter();

  const toggleLocale = locale === 'de' ? 'en' : 'de';

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-dark text-white">
      <Link href="/" className="text-xl font-semibold">
        RSE Stock Insights
      </Link>

      <div className="flex items-center gap-4">
        <Link href={pathname} locale={toggleLocale} className="hover:underline">
          {toggleLocale.toUpperCase()}
        </Link>

        <SignInButton mode="modal">
          <button className="px-3 py-1 rounded bg-brand text-dark font-medium">
            Login
          </button>
        </SignInButton>

        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
}
