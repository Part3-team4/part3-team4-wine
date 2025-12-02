'use client';

import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import Styles from '@/app/(auth)/signup/page.module.scss';
import FormInput from '@/components/common/Input/FormInput';
import Button from '@/components/common/Button/Button';
import { LogoBlack } from '@/assets';
import { useSignUpForm } from '@/domains/auth/hooks/useSignUpForm';

export default function SignupPage() {
  const router = useRouter();
  const { form, isPending, apiError, handleSubmit } = useSignUpForm();

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className={Styles.container}>
      <div className={Styles.logoContainer}>
        <h1>
          <Link href="/" title="홈으로 이동">
            <Image src={LogoBlack} alt="로고" width={100} height={30} />
          </Link>
        </h1>
      </div>

      <form className={Styles.form} onSubmit={handleSubmit}>
        {/* 이메일 */}
        <FormInput
          label="이메일"
          type="email"
          placeholder="whyne@email.com"
          error={apiError || errors.email?.message}
          {...register('email')}
        />

        {/* 닉네임 */}
        <FormInput
          label="닉네임"
          placeholder="whyne"
          error={errors.nickname?.message}
          {...register('nickname')}
        />

        {/* 비밀번호 */}
        <FormInput
          label="비밀번호"
          type="password"
          placeholder="영문, 숫자, 특수문자(!@#$%^&*) 제한"
          error={errors.password?.message}
          {...register('password')}
        />

        {/* 비밀번호 확인 */}
        <FormInput
          label="비밀번호 확인"
          type="password"
          placeholder="비밀번호 확인"
          error={errors.passwordConfirmation?.message}
          {...register('passwordConfirmation')}
        />

        {/* 가입하기 버튼 */}
        <Button variant="filled" size="large" fullWidth disabled={isPending} type="submit">
          {isPending ? '가입 중...' : '가입하기'}
        </Button>

        {/* 로그인 이동 */}
        <div className={Styles.footer}>
          <span className={Styles.footerText}>계정이 이미 있으신가요?</span>
          <Button
            type="button"
            className={Styles.footerLink}
            onClick={() => router.push('/signin')}
          >
            로그인하기
          </Button>
        </div>
      </form>
    </div>
  );
}
