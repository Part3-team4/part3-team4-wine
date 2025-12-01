'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import FormInput from '@/components/common/Input/FormInput';
import Button from '@/components/common/Button/Button';
import Styles from '@/app/(auth)/signin/page.module.scss';
import { LogoBlack, Kakao } from '@/assets';
import Image from 'next/image';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();

  // 로그인 되어있으면 접근 차단
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) router.replace('/');
  }, [router]);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({ email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  /** 이메일 형식 검사 */
  const validateEmailFormat = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  /** blur 시 단일 필드 검사 */
  const validateField = (field: 'email' | 'password', value: string) => {
    let error = '';

    if (field === 'email') {
      if (!value) error = '이메일은 필수 입력입니다.';
      else if (!validateEmailFormat(value)) error = '이메일 형식으로 작성해 주세요.';
    }

    if (field === 'password') {
      if (!value) error = '비밀번호는 필수 입력입니다.';
    }

    setErrors((prev) => ({ ...prev, [field]: error }));
    return error;
  };

  /** 전체 폼 검사 */
  const validateForm = () => {
    const emailError = validateField('email', email);
    const passwordError = validateField('password', password);

    return !emailError && !passwordError;
  };

  /** 로그인 요청 */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await fetch('https://winereview-api.vercel.app/4/auth/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || '로그인에 실패했습니다.');

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

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
    alert('카카오 로그인 기능 추후에 추가될 예정');
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
          onBlur={() => validateField('email', email)}
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
          onBlur={() => validateField('password', password)}
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
