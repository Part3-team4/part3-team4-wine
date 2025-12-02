'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

export default function KakaoAuthPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get('code');

    if (!code) {
      alert('카카오 인가 코드가 없습니다.');
      router.push('/signin');
      return;
    }

    // 우리 백엔드로 code 전달
    const kakaoLogin = async () => {
      try {
        const res = await fetch('https://winereview-api.vercel.app/4/auth/signIn/KAKAO', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            redirectUri: 'https://part3-team4-wine-2.vercel.app/auth/kakao',

            token: code,
          }),
        });

        const data = await res.json();

        if (!res.ok) {
          console.error(data);
          alert('카카오 로그인 실패');
          router.push('/signin');
          return;
        }

        //Zustand 로그인 처리
        login(data.accessToken, data.refreshToken);

        //메인으로 이동
        router.push('/');
      } catch (err) {
        console.error(err);
        alert('카카오 로그인 중 오류 발생');
        router.push('/signin');
      }
    };

    kakaoLogin();
  }, [login, router]);

  return <div>카카오 로그인 처리 중...</div>;
}
