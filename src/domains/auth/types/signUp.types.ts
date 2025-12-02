import { z } from 'zod';

/**
 * 비밀번호 정규식: 숫자, 영문, 특수문자만
 */
const PASSWORD_REGEX = /^[A-Za-z0-9!@#$%^&*]+$/;

/**
 * SignUp 폼 검증 스키마
 */
export const signUpFormSchema = z
  .object({
    email: z.string().min(1, '이메일은 필수 입력입니다.').email('이메일 형식으로 작성해 주세요.'),
    nickname: z
      .string()
      .min(1, '닉네임은 필수 입력입니다.')
      .max(20, '닉네임은 최대 20자까지 가능합니다.'),
    password: z
      .string()
      .min(8, '비밀번호는 최소 8자 이상입니다.')
      .regex(PASSWORD_REGEX, '비밀번호는 숫자, 영문, 특수문자로만 가능합니다.'),
    passwordConfirmation: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['passwordConfirmation'],
  });

/**
 * SignUp 폼 타입
 */
export type SignUpFormData = z.infer<typeof signUpFormSchema>;

/**
 * SignUp API 요청 타입
 */
export type SignUpRequest = SignUpFormData;

/**
 * SignUp API 응답 타입
 */
export type SignUpResponse = {
  accessToken: string;
  refreshToken: string;
};
