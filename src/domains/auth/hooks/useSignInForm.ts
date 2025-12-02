// src/domains/auth/hooks/useSignInForm.ts
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { signInFormSchema } from '../types/signIn.types';
import { authMutations } from '../query/authMutations';
import { cookieManager } from '@/libs/cookies';
import type { SignInFormData } from '../types/signIn.types';

/**
 * 로그인 폼 훅
 */
export function useSignInForm() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string>('');

  const form = useForm<SignInFormData>({
    resolver: zodResolver(signInFormSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate, isPending } = useMutation({
    ...authMutations.signIn(),
    onSuccess: (response) => {
      cookieManager.setAccessToken(response.accessToken);
      cookieManager.setRefreshToken(response.refreshToken);
      router.push('/');
    },
    onError: () => {
      setApiError('이메일 혹은 비밀번호를 확인해주세요.');
    },
  });

  const handleSubmit = form.handleSubmit((data) => {
    setApiError('');
    mutate(data);
  });

  return {
    form,
    isPending,
    apiError,
    handleSubmit,
  };
}
