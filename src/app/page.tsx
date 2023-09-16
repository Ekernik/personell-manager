'use server';

import { getServerSession } from 'next-auth/next';
import { redirect } from 'next/navigation';
import { authOptions } from './utils/authOptions';

export default async function IndexPage() {
  const session = await getServerSession(authOptions);

  if (!session) redirect('/login');

  redirect('/dashboard');
}
