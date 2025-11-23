'use client';

import Input from '@/components/common/Input/Input';
import { useState, useRef, useEffect } from 'react';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 페이지 로드 시 자동 포커스
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const validateEmail = (value: string) => {
    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    setEmailError(!isValid && value.length > 0);
  };
  return (
    <>
      <Input
        ref={inputRef}
        label="이메일"
        type="email"
        placeholder="이메일을 입력하세요"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          validateEmail(e.target.value);
        }}
        error={emailError}
        helperText={emailError ? '올바른 이메일 형식이 아닙니다' : ''}
      />

      <Input label="이메일" value="user@example.com" disabled />

      <Input
        label="비밀번호"
        type="password"
        placeholder="비밀번호를 입력하세요"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        helperText="8자 이상 입력해주세요"
      />

      <Input label="닉네임" error helperText="이미 사용중인 닉네임입니다" />

      <Input label="닉네임" maxLength={10} helperText="최대 10자까지 입력 가능합니다" />
    </>
  );
}
