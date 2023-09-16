import LoginForm from '@/components/LoginForm';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../utils/authOptions';
import { redirect } from 'next/navigation';

export default async function LoginPage() {
  const session = await getServerSession(authOptions);

  if (session) {
    redirect('/dashboard');
  }

  return (
    <main className='flex justify-center items-center grow p-4 bg-slate-100 rounded-md'>
      <LoginForm />
    </main>
  );
}
