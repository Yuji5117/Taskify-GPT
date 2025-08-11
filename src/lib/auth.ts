import { NextAuthOptions } from 'next-auth'
import GithubProvider from 'next-auth/providers/github'

import { env } from '@/lib/env'

export const authOptions: NextAuthOptions = {
  providers: [
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
      authorization: {
        params: {
          scope: 'public_repo',
        },
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    async jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.scope = account.scope
      }
      return token
    },
    async session({ session, token }) {
      session.user.accessToken = token.accessToken
      session.user.scope = token.scope
      return session
    },
  },
}
