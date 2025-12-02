// src/libs/cookies.ts
import { setCookie, getCookie, deleteCookie } from 'cookies-next';
import type { OptionsType } from 'cookies-next/lib/types';

const COOKIE_OPTIONS: OptionsType = {
  path: '/',
  maxAge: 60 * 60 * 24 * 7, // 7일
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
};

/**
 * Cookie 관리 유틸리티
 */
export const cookieManager = {
  /**
   * 액세스 토큰 저장
   */
  setAccessToken: (token: string) => {
    setCookie('accessToken', token, COOKIE_OPTIONS);
  },

  /**
   * 리프레시 토큰 저장
   */
  setRefreshToken: (token: string) => {
    setCookie('refreshToken', token, {
      ...COOKIE_OPTIONS,
      maxAge: 60 * 60 * 24 * 30, // 30일
    });
  },

  /**
   * 액세스 토큰 가져오기
   */
  getAccessToken: (): string | undefined => {
    return getCookie('accessToken') as string | undefined;
  },

  /**
   * 리프레시 토큰 가져오기
   */
  getRefreshToken: (): string | undefined => {
    return getCookie('refreshToken') as string | undefined;
  },

  /**
   * 모든 토큰 삭제
   */
  clearTokens: () => {
    deleteCookie('accessToken');
    deleteCookie('refreshToken');
  },
};
