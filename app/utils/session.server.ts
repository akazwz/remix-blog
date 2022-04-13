import {createCookieSessionStorage, redirect} from "@remix-run/node"
import bcrypt from "bcrypt"
import {db} from '~/utils/db.server'

type LoginProps = {
    username: string
    password: string
}

// Login
export const login = async ({username, password}: LoginProps) => {
    const user = await db.user.findUnique({
        where: {
            username,
        },
    })

    if (!user) return null

    // Check password
    const isPasswordCorrect = await bcrypt.compare(password, user.passwordHash)

    if (!isPasswordCorrect) return null

    return user
}

type RegisterProps = {
    username: string
    password: string
}

// Register
export const register = async ({username, password}: RegisterProps) => {
    // Hash password
    const passwordHash = await bcrypt.hash(password, 10)
    return db.user.create({
        data: {
            username,
            passwordHash,
        }
    })
}

// Get session secret
const sessionSecret = process.env.SESSION_SECRET
if (!sessionSecret) throw new Error('No session secret')

// Create session storage
const storage = createCookieSessionStorage({
    cookie: {
        name: 'remix_blog_session',
        secure: process.env.NODE_ENV === 'production',
        secrets: [sessionSecret],
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 60,
        httpOnly: true,
    }
})

// Create user session
export const createUserSession = async (userId: string, redirectTo: string) => {
    const session = await storage.getSession()
    session.set('userId', userId)
    return redirect(redirectTo, {
        headers: {
            'Set-Cookie': await storage.commitSession(session)
        }
    })
}

// Get user session
export const getUserSession = (request: Request) => {
    return storage.getSession(request.headers.get('Cookie'))
}

// Get logged in user
export const getUser = async (request: Request) => {
    const session = await getUserSession(request)
    const userId = session.get('userId')
    if (!userId || typeof userId !== 'string') return null

    try {
        return await db.user.findUnique({where: {id: userId}})
    } catch (e: unknown) {
        return null
    }
}

// Logout user and destroy session
export const logout = async (request: Request, redirectTo: string) => {
    const session = await storage.getSession(request.headers.get('Cookie'))
    return redirect(redirectTo, {
        headers: {
            'Set-Cookie': await storage.destroySession(session),
        },
    })
}