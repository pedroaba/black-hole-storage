export { auth as middleware } from '@/libs/auth'

export const config = {
    matcher: [
        '/((?!api/webhooks|_next/static|_next/image|favicon.ico|public).*)',
    ],
}
