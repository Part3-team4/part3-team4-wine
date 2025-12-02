import { create } from 'zustand';

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  isLogin: boolean;

  login: (accessToken: string, refreshToken: string) => void;
  logout: () => void;
  initializeAuth: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  accessToken: null,
  refreshToken: null,
  isLogin: false,

  // 로그인 처리
  login: (accessToken, refreshToken) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken);
      localStorage.setItem('refreshToken', refreshToken);
    }

    set({
      accessToken,
      refreshToken,
      isLogin: true,
    });
  },

  // 로그아웃 처리
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }

    set({
      accessToken: null,
      refreshToken: null,
      isLogin: false,
    });
  },

  // 새로고침 시 로그인 유지 (SSR 안전 처리)
  initializeAuth: () => {
    if (typeof window === 'undefined') return;

    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');

    if (accessToken && refreshToken) {
      set({
        accessToken,
        refreshToken,
        isLogin: true,
      });
    }
  },
}));
