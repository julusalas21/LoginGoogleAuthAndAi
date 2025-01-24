import {prisma} from '@/lib/db'
import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'

const GOOGLE_CLIENT_ID=process.env.GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRET=process.env.GOOGLE_CLIENT_SECRET!

const authOptions = {
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET
        })
    ],
    secret: process.env.AUTH_SECRET,
    callbacks: {
        async signIn({account, profile}:any){
            if(!profile?.email){
                throw new Error('no profile')
            }
        await prisma.user.create({
            data: {
                name: profile.name,
                email: profile.email
            }
        })
        return true
        }
        
    }
}

export const handler = NextAuth(authOptions)

