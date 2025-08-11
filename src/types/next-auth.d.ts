import { User } from 'next-auth'

declare module 'next-auth/jwt' {
  interface JWT {
    accessToken?: string
    scope?: string
  }
}

declare module 'next-auth' {
  interface Session {
    user: User & { id?: string; accessToken?: string; scope?: string }
  }
}
