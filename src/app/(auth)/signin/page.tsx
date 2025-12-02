'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FormInput from '@/components/common/Input/FormInput';
import Button from '@/components/common/Button/Button';
import Styles from '@/app/(auth)/signin/page.module.scss';
import { LogoBlack, Kakao } from '@/assets';
import Image from 'next/image';
import Link from 'next/link';
import { signinSchema } from '@/schemas/authSchema';
import { useAuthStore } from '@/store/authStore';

export default function LoginPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  /** 로그인 요청 */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = signinSchema.safeParse({ email, password });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        email: fieldErrors.email?.[0] ?? '',
        password: fieldErrors.password?.[0] ?? '',
      });

      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('https://winereview-api.vercel.app/19-4/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || '로그인 실패');

      login(data.accessToken, data.refreshToken);
      router.push('/');
    } catch (error) {
      setErrors({
        email: '이메일 혹은 비밀번호를 확인해주세요.',
        password: '',
      });
    } finally {
      setIsLoading(false);
    }
  };

  /** 엔터키 제출 */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleLogin(e);
  };

  // 카카오 로그인
  const handleKakaoLogin = () => {
    const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_REST_KEY;
    const REDIRECT_URI = 'http://localhost:3001/auth/kakao';

    // ✅ 여기서 강제로 멈춤
    alert(`KAKAO KEY: ${REST_API_KEY}`);

    const KAKAO_AUTH_URL =
      `https://kauth.kakao.com/oauth/authorize` +
      `?client_id=${REST_API_KEY}` +
      `&redirect_uri=${encodeURIComponent(REDIRECT_URI)}` +
      `&response_type=code`;

    // window.location.href = KAKAO_AUTH_URL;
  };

  // 비밀번호 분실
  const handleForgotPassword = () => {
    alert('안타깝군요');
  };

  return (
    <div className={Styles.container}>
      {/* 로고 영역 */}
      <div className={Styles.logoContainer}>
        <h1>
          <Link href="/" title="홈으로 이동">
            <Image src={LogoBlack} alt="와인 로고" width={104} height={30} />
          </Link>
        </h1>
      </div>

      {/* 폼 영역 */}
      <form className={Styles.form} onSubmit={handleLogin}>
        {/* 이메일 입력 영역 */}
        <FormInput
          label="이메일"
          type="email"
          placeholder="이메일 입력"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((prev) => ({ ...prev, email: '' }));
          }}
          onKeyDown={handleKeyDown}
          error={errors.email}
        />

        {/* 비밀번호 입력 영역 */}
        <FormInput
          label="비밀번호"
          type="password"
          placeholder="비밀번호 입력"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((prev) => ({ ...prev, password: '' }));
          }}
          onKeyDown={handleKeyDown}
          error={errors.password}
        />

        {/* 비밀번호 분실 영역 */}
        <button type="button" className={Styles.forgotPassword} onClick={handleForgotPassword}>
          비밀번호를 잊으셨나요?
        </button>

        {/* 로그인 버튼 영역 */}
        <Button variant="filled" size="large" fullWidth disabled={isLoading}>
          {isLoading ? '로그인 중...' : '로그인'}
        </Button>

        {/* 카카오 로그인 영역 */}
        <Button
          type="button"
          variant="subtle"
          size="large"
          fullWidth
          icon={<Image src={Kakao} alt="Kakao" width={24} height={24} />}
          onClick={handleKakaoLogin}
        >
          kakao로 시작하기
        </Button>

        {/* 안내 영역 */}
        <div className={Styles.footer}>
          <span className={Styles.footerText}>계정이 없으신가요?</span>
          <button
            type="button"
            className={Styles.footerLink}
            onClick={() => router.push('/signup')}
          >
            회원가입하기
          </button>
        </div>
      </form>
    </div>
  );
}
