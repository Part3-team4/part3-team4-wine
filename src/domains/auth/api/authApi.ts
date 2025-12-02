// src/domains/auth/api/authApi.ts
import { api } from '@/libs/api';
import type { SignInFormData, SignInResponse } from '../types/signIn.types';
import type { SignUpRequest, SignUpResponse } from '../types/signUp.types';

export const authApi = {
  /**
   * 로그인
   */
  signIn: async (params: SignInFormData): Promise<SignInResponse> => {
    const res = await api.post<SignInResponse>('/auth/signin', params);
    return res.data;
  },

  /**
   * 회원가입
   */
  signUp: async (params: SignUpRequest): Promise<SignUpResponse> => {
    const res = await api.post<SignUpResponse>('/auth/signup', params);
    return res.data;
  },
};
