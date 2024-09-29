import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

export async function middleware(request: NextRequest) {
  const token = await getToken({ 
    req: request, 
    secret: process.env.NEXTAUTH_SECRET,
  })
  
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin')
  const isRegisterRoute = request.nextUrl.pathname === '/register'
  const isAuthRoute = request.nextUrl.pathname.startsWith('/auth')

  if (!token || (token.exp && Date.now() >= (token.exp as number) * 1000)) {
    if (isAdminRoute || isRegisterRoute) {
      return NextResponse.redirect(new URL('/api/auth/signin', request.url))
    }
  }

  if (isAdminRoute && token?.role !== 'admin' && token?.role !== 'super_admin') {
    return NextResponse.redirect(new URL('/api/auth/signin', request.url))
  }

  if (isRegisterRoute) {
    if (token?.role === 'admin') {
      return NextResponse.redirect(new URL('/', request.url))
    } else if (token?.role !== 'super_admin') {
      return NextResponse.redirect(new URL('/api/auth/signin', request.url))
    }
  }

  if (isAuthRoute && token && (!token.exp || Date.now() < (token.exp as number) * 1000)) {
    return NextResponse.redirect(new URL('/', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin/:path*', '/register', '/admin/dashboard', '/api/auth/:path*']
}
