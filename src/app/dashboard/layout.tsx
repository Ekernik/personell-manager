import Header from '@/components/Header';
import NotationAlert from '@/components/NotationAlert';
import { getServerSession } from 'next-auth';
import { ReactNode } from 'react';
import { authOptions } from '@/utils/authOptions';
import { redirect } from 'next/navigation';

interface Props {
  children: ReactNode;
}

export default async function DashboardLayout({ children }: Props) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  return (
    <>
      <Header />
      {children}
      <NotationAlert />
    </>
  );
}
