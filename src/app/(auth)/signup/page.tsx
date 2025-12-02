'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Styles from '@/app/(auth)/signup/page.module.scss';
import FormInput from '@/components/common/Input/FormInput';
import Button from '@/components/common/Button/Button';
import { LogoBlack } from '@/assets';
import { signupSchema } from '@/schemas/authSchema';
import { useAuthStore } from '@/store/authStore';

export default function SignupPage() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');
  const [errors, setErrors] = useState({
    email: '',
    nickname: '',
    password: '',
    passwordCheck: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  /** 회원가입 요청 */
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = signupSchema.safeParse({
      email,
      nickname,
      password,
      passwordCheck,
    });

    // Zod 에러 처리
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrors({
        email: fieldErrors.email?.[0] ?? '',
        nickname: fieldErrors.nickname?.[0] ?? '',
        password: fieldErrors.password?.[0] ?? '',
        passwordCheck: fieldErrors.passwordCheck?.[0] ?? '',
      });

      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch('https://winereview-api.vercel.app/19-4/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          nickname,
          password,
          passwordConfirmation: passwordCheck,
        }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || '회원가입 실패');
      login(data.accessToken, data.refreshToken);
      router.push('/');
    } catch (err) {
      console.error('회원가입 실패:', err);
      setErrors((prev) => ({
        ...prev,
        email: '이미 사용 중인 이메일일 수 있습니다.',
      }));
    } finally {
      setIsLoading(false);
    }
  };

  /** 엔터 제출 */
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSignup(e);
  };

  return (
    <div className={Styles.container}>
      <div className={Styles.logoContainer}>
        <h1>
          <Link href="/" title="홈으로 이동">
            <Image src={LogoBlack} alt="로고" width={100} height={30} />
          </Link>
        </h1>
      </div>

      <form className={Styles.form} onSubmit={handleSignup}>
        {/* 이메일 */}
        <FormInput
          label="이메일"
          type="email"
          placeholder="whyne@email.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            setErrors((p) => ({ ...p, email: '' }));
          }}
          onKeyDown={handleKeyDown}
          error={errors.email}
        />

        {/* 닉네임 */}
        <FormInput
          label="닉네임"
          value={nickname}
          placeholder="whyne"
          onChange={(e) => {
            setNickname(e.target.value);
            setErrors((p) => ({ ...p, nickname: '' }));
          }}
          onKeyDown={handleKeyDown}
          error={errors.nickname}
        />

        {/* 비밀번호 */}
        <FormInput
          label="비밀번호"
          type="password"
          placeholder="영문, 숫자, 특수문자(!@#$%^&*) 제한"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            setErrors((p) => ({ ...p, password: '' }));
          }}
          onKeyDown={handleKeyDown}
          error={errors.password}
        />

        {/* 비밀번호 확인 */}
        <FormInput
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호 확인"
          value={passwordCheck}
          onChange={(e) => {
            setPasswordCheck(e.target.value);
            setErrors((p) => ({ ...p, passwordCheck: '' }));
          }}
          onKeyDown={handleKeyDown}
          error={errors.passwordCheck}
        />

        {/* 가입하기 버튼 */}
        <Button variant="filled" size="large" fullWidth disabled={isLoading}>
          {isLoading ? '가입 중...' : '가입하기'}
        </Button>

        {/* 로그인 이동 */}
        <div className={Styles.footer}>
          <span className={Styles.footerText}>계정이 이미 있으신가요?</span>
          <button
            type="button"
            className={Styles.footerLink}
            onClick={() => router.push('/signin')}
          >
            로그인하기
          </button>
        </div>
      </form>
    </div>
  );
}
