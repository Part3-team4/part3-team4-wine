// src/components/common/Header/Header.tsx
import Image from 'next/image';
import Link from 'next/link';
import { cookies } from 'next/headers';
import styles from './Header.module.scss';
import { Logo } from '@/assets';
import HeaderContent from './HeaderContent';

/**
 * Header 서버 컴포넌트
 * - SSR로 cookie를 읽어서 인증 상태 판단
 * - HeaderContent에서 pathname 기반으로 렌더링 제어
 */
export default async function Header() {
  // Cookie 기반 로그인 상태 확인
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const isLogin = !!accessToken;

  return (
    <div className={styles.header}>
      <h1>
        <Link href="/" title="홈으로 이동">
          <Image src={Logo} alt="와인 로고" />
        </Link>
      </h1>

      <div>
        <HeaderContent isLogin={isLogin} />
      </div>
    </div>
  );
}
