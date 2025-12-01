'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Styles from '@/app/(auth)/signup/page.module.scss';
import FormInput from '@/components/common/Input/FormInput';
import Button from '@/components/common/Button/Button';
import { LogoBlack } from '@/assets';

export default function SignupPage() {
  const router = useRouter();

  // 로그인 되어있으면 접근 차단
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) router.replace('/');
  }, [router]);

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

  /** 이메일 형식 */
  const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  /** 비밀번호 정규식: 숫자, 영문, 특수문자만 */
  const isValidPassword = (pw: string) => /^[A-Za-z0-9!@#$%^&*]+$/.test(pw);

  /** blur 시 개별 필드 검사 */
  const validateField = (field: string, value: string) => {
    let message = '';

    switch (field) {
      case 'email':
        if (!value) message = '이메일은 필수 입력입니다.';
        else if (!isValidEmail(value)) message = '이메일 형식으로 작성해 주세요.';
        break;

      case 'nickname':
        if (!value) message = '닉네임은 필수 입력입니다.';
        else if (value.length > 20) message = '닉네임은 최대 20자까지 가능합니다.';
        break;

      case 'password':
        if (!value) message = '비밀번호는 필수 입력입니다.';
        else if (value.length < 8) message = '비밀번호는 최소 8자 이상입니다.';
        else if (!isValidPassword(value))
          message = '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.';
        break;

      case 'passwordCheck':
        if (!value) message = '비밀번호 확인을 입력해주세요.';
        else if (value !== password) message = '비밀번호가 일치하지 않습니다.';
        break;
    }

    setErrors((prev) => ({ ...prev, [field]: message }));
    return message;
  };

  /** 전체 폼 검사 */
  const validateForm = () => {
    const emailErr = validateField('email', email);
    const nicknameErr = validateField('nickname', nickname);
    const pwErr = validateField('password', password);
    const pwCheckErr = validateField('passwordCheck', passwordCheck);

    return !(emailErr || nicknameErr || pwErr || pwCheckErr);
  };

  /** 회원가입 요청 */
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const res = await fetch('https://winereview-api.vercel.app/4/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          nickname,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || '회원가입 실패');
      }

      // 자동 로그인
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);

      router.push('/');
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        email: '이미 사용 중인 이메일이거나 가입할 수 없습니다.',
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
          onBlur={() => validateField('email', email)}
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
          onBlur={() => validateField('nickname', nickname)}
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
          onBlur={() => validateField('password', password)}
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
          onBlur={() => validateField('passwordCheck', passwordCheck)}
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
