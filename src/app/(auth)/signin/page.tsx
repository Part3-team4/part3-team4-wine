'use client';

import { useRouter } from 'next/navigation';
import FormInput from '@/components/common/Input/FormInput';
import Button from '@/components/common/Button/Button';
import Styles from '@/app/(auth)/signin/page.module.scss';
import { LogoBlack, Kakao } from '@/assets';
import Image from 'next/image';
import Link from 'next/link';
import { useSignInForm } from '@/domains/auth/hooks/useSignInForm';

export default function LoginPage() {
  const router = useRouter();
  const { form, isPending, apiError, handleSubmit } = useSignInForm();

  // 카카오 로그인
  const handleKakaoLogin = () => {
    alert('카카오 로그인 기능 추후에 추가될 예정');
  };

  // 비밀번호 분실
  const handleForgotPassword = () => {
    alert('안타깝군요');
  };

  const {
    register,
    formState: { errors },
  } = form;

  return (
    <div className={Styles.container}>
      {/* 로고 영역 */}
      <div className={Styles.logoContainer}>
        <h1>
          <Link href="/" title="홈으로 이동">
            <Image src={LogoBlack} alt="와인 로고" width={104} height={30} />
          </Link>
        </h1>
      </div>

      {/* 폼 영역 */}
      <form className={Styles.form} onSubmit={handleSubmit}>
        {/* 이메일 입력 영역 */}
        <FormInput
          label="이메일"
          type="email"
          placeholder="이메일 입력"
          error={apiError || errors.email?.message}
          {...register('email')}
        />

        {/* 비밀번호 입력 영역 */}
        <FormInput
          label="비밀번호"
          type="password"
          placeholder="비밀번호 입력"
          error={errors.password?.message}
          {...register('password')}
        />

        {/* 비밀번호 분실 영역 */}
        <Button type="button" className={Styles.forgotPassword} onClick={handleForgotPassword}>
          비밀번호를 잊으셨나요?
        </Button>

        {/* 로그인 버튼 영역 */}
        <Button variant="filled" size="large" fullWidth disabled={isPending} type="submit">
          {isPending ? '로그인 중...' : '로그인'}
        </Button>

        {/* 카카오 로그인 영역 */}
        <Button
          type="button"
          variant="subtle"
          size="large"
          fullWidth
          icon={<Image src={Kakao} alt="Kakao" width={24} height={24} />}
          onClick={handleKakaoLogin}
        >
          kakao로 시작하기
        </Button>

        {/* 안내 영역 */}
        <div className={Styles.footer}>
          <span className={Styles.footerText}>계정이 없으신가요?</span>
          <Button
            type="button"
            className={Styles.footerLink}
            onClick={() => router.push('/signup')}
          >
            회원가입하기
          </Button>
        </div>
      </form>
    </div>
  );
}
