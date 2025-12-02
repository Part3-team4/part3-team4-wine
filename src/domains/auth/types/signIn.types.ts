// src/domains/auth/types/signIn.types.ts
import { z } from 'zod';

/**
 * SignIn 폼 검증 스키마
 */
export const signInFormSchema = z.object({
  email: z
    .string()
    .min(1, '이메일은 필수 입력입니다.')
    .email('이메일 형식으로 작성해 주세요.'),
  password: z.string().min(1, '비밀번호는 필수 입력입니다.'),
});

/**
 * SignIn 폼 타입
 */
export type SignInFormData = z.infer<typeof signInFormSchema>;

/**
 * SignIn API 응답 타입
 */
export type SignInResponse = {
  accessToken: string;
  refreshToken: string;
};
