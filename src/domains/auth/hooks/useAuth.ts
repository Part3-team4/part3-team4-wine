'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { cookieManager } from '@/libs/cookies';

/**
 * 인증 상태 관리 훅
 */
export function useAuth() {
  const router = useRouter();
  const pathname = usePathname();
  const [isLogin, setIsLogin] = useState(false);
  const [mounted, setMounted] = useState(false);

  // 마운트 후 cookie 확인 (hydration 이슈 방지)
  useEffect(() => {
    setMounted(true);
    const token = cookieManager.getAccessToken();
    setIsLogin(!!token);
  }, []);

  // 로그아웃
  const handleLogout = () => {
    cookieManager.clearTokens();
    setIsLogin(false);
    router.push('/');
  };

  // 마이페이지 여부
  const isMyProfilePage = pathname === '/myprofile';

  return {
    isLogin,
    isMyProfilePage,
    handleLogout,
    mounted, // 로딩 상태 제공
  };
}
