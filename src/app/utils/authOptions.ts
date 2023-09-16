import openDb from '@/helpers/sqlite';
import { NextAuthOptions } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { sqlFindUser } from './sqlCommands';
import { compare } from 'bcrypt';

async function validatePassword(password: string, hash: string) {
  return await compare(password, hash);
}

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 * 12, // 12 hours
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
    error: '/'
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username' },
        password: { label: 'Password' },
      },
      async authorize(credentials) {
        const { username, password } = credentials as {
          username: string;
          password: string;
        };
        const db = await openDb();
        const foundUser = await db.get(sqlFindUser, username);
        const user = await validatePassword(password, foundUser?.hash);

        if (user) {
          return foundUser;
        }

        return null;
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user!;
      return session;
    },
  },
};
