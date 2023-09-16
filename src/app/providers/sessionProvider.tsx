'use client';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';

interface Props {
  session: Session;
  children?: React.ReactNode;
}

export default function NextAuthSessionProvider({ session, children }: Props) {
  return <SessionProvider session={session} refetchInterval={120}>{children}</SessionProvider>;
}
