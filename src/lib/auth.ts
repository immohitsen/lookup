import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';
import Resend from 'next-auth/providers/resend';
import Credentials from 'next-auth/providers/credentials';
import { connectDB } from '@/lib/mongoose';
import { User } from '@/lib/models/User';

const isGoogleConfigured =
  Boolean(process.env.AUTH_GOOGLE_ID) &&
  !process.env.AUTH_GOOGLE_ID?.includes('your-google');

const isResendConfigured =
  Boolean(process.env.RESEND_API_KEY) &&
  !process.env.RESEND_API_KEY?.startsWith('re_xxx');

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  providers: [
    ...(isGoogleConfigured
      ? [
          Google({
            clientId: process.env.AUTH_GOOGLE_ID!,
            clientSecret: process.env.AUTH_GOOGLE_SECRET!,
          }),
        ]
      : []),
    ...(isResendConfigured
      ? [
          Resend({
            apiKey: process.env.RESEND_API_KEY!,
            from: process.env.EMAIL_FROM ?? 'noreply@lookup.bio',
          }),
        ]
      : []),
    // Credentials Provider for instant email sign-in / signup flow
    Credentials({
      id: 'credentials',
      name: 'Email Credentials Auth',
      credentials: {
        email: { label: 'Email', type: 'email' },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;
        const email = String(credentials.email).toLowerCase().trim();
        await connectDB();

        let user = await User.findOne({ email });
        if (!user) {
          const baseName = email.split('@')[0].toLowerCase().replace(/[^a-z0-9_]/g, '').slice(0, 20);
          const unique = await makeUniqueUsername(baseName || 'creator');
          user = await User.create({
            email,
            username: unique,
            name: email.split('@')[0],
          });
        }

        return {
          id: String(user._id),
          email: user.email,
          name: user.name,
          username: user.username,
        };
      },
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
      if (user) {
        token.userId = user.id;
        token.email = user.email;
        if ('username' in user) {
          token.username = (user as { username?: string }).username;
        }
      }
      if (!token.username && token.email) {
        await connectDB();
        const dbUser = await User.findOne({ email: token.email }).lean();
        if (dbUser) {
          token.userId = String(dbUser._id);
          token.username = dbUser.username;
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = (token.userId as string) ?? (token.sub as string);
        session.user.username = (token.username as string) ?? (token.email as string)?.split('@')[0] ?? 'creator';
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
