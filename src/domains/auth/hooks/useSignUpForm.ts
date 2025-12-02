'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { signUpFormSchema } from '../types/signUp.types';
import { authMutations } from '../query/authMutations';
import { cookieManager } from '@/libs/cookies';
import type { SignUpFormData } from '../types/signUp.types';

/**
 * 회원가입 폼 훅
 */
export function useSignUpForm() {
  const router = useRouter();
  const [apiError, setApiError] = useState<string>('');

  const form = useForm<SignUpFormData>({
    resolver: zodResolver(signUpFormSchema),
    mode: 'onBlur',
    defaultValues: {
      email: '',
      nickname: '',
      password: '',
      passwordConfirmation: '',
    },
  });

  const { mutate, isPending } = useMutation({
    ...authMutations.signUp(),
    onSuccess: (response) => {
      cookieManager.setAccessToken(response.accessToken);
      cookieManager.setRefreshToken(response.refreshToken);
      router.push('/');
    },
    onError: () => {
      setApiError('이미 사용 중인 이메일이거나 가입할 수 없습니다.');
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
