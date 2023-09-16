import Providers from '@/components/context/providers';
import { cn } from '@/lib/utils';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import '@/styles/globals.css';
import NextAuthSessionProvider from './providers/sessionProvider';
import { Session } from 'next-auth';

const inter = Inter({ subsets: ['cyrillic-ext'] });

export const metadata: Metadata = {
  title: 'Personnel Manager',
};

interface Props {
  session: Session;
  children: ReactNode;
}

export default function DefaultLayout({ session, children }: Props) {
  return (
    <html lang='ru'>
      <body
        className={cn(
          'p-8 flex flex-col gap-4 min-h-screen bg-slate-100',
          inter.className
        )}
      >
        <NextAuthSessionProvider session={session}>
          <Providers>{children}</Providers>
        </NextAuthSessionProvider>
      </body>
    </html>
  );
}
