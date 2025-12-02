import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken')?.value;
  const { pathname } = request.nextUrl;

  // signIn, signUp 페이지에 accessToken 있으면 메인으로 리다이렉트
  if ((pathname === '/signin' || pathname === '/signup') && accessToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  const response = NextResponse.next();

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|svg|webp|gif)).*)'],
};
