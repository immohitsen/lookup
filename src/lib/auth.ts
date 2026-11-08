import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Resend from 'next-auth/providers/resend';
import { connectDB } from '@/lib/mongoose';
import { User } from '@/lib/models/User';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
    Resend({
      apiKey: process.env.RESEND_API_KEY!,
      from: process.env.EMAIL_FROM ?? 'noreply@lookup.bio',
    }),
  ],
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/login',
    newUser: '/onboarding',
  },
  callbacks: {
    async signIn({ user, account }) {
      if (!user.email) return false;
      await connectDB();

      const existing = await User.findOne({ email: user.email });
      if (!existing) {
        // New user — will finish setup in /onboarding
        const username = user.email.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, '').slice(0, 30);
        const unique = await makeUniqueUsername(username);
        await User.create({
          email: user.email,
          username: unique,
          name: user.name ?? '',
          avatarUrl: user.image ?? '',
        });
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user?.email) {
        await connectDB();
        const dbUser = await User.findOne({ email: user.email }).lean();
        if (dbUser) {
          token.userId = String(dbUser._id);
          token.username = dbUser.username;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.userId as string;
        session.user.username = token.username as string;
      }
      return session;
    },
  },
});

async function makeUniqueUsername(base: string): Promise<string> {
  let username = base || 'user';
  let suffix = 0;
  while (await User.exists({ username })) {
    suffix++;
    username = `${base}${suffix}`;
  }
  return username;
}
