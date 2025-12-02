'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import styles from './Header.module.scss';
import Dropdown from '../Dropdown/';
import Profile from '../Profile/Profile';
import { cookieManager } from '@/libs/cookies';
import Button from '../Button/Button';

type HeaderContentProps = {
  isLogin: boolean;
};

/**
 * Header 클라이언트 컴포넌트
 * - 로그아웃, pathname 체크 등 클라이언트 로직만 처리
 */
export default function HeaderContent({ isLogin }: HeaderContentProps) {
  const pathname = usePathname();
  const router = useRouter();

  // auth 페이지에서는 렌더링하지 않음
  if (pathname === '/signin' || pathname === '/signup') {
    return null;
  }

  const handleLogout = () => {
    cookieManager.clearTokens();
    router.push('/');
    router.refresh();
  };

  const isMyProfilePage = pathname === '/myprofile';

  if (!isLogin) {
    // 비로그인 상태: 로그인, 회원가입
    return (
      <ul className={styles.list}>
        <li>
          <Link href="/signin">로그인</Link>
        </li>
        <li>
          <Link href="/signup">회원가입</Link>
        </li>
      </ul>
    );
  }

  if (isMyProfilePage) {
    // 마이페이지: 와인 목록, 로그아웃
    return (
      <ul className={styles.list}>
        <li>
          <Link href="/wines">와인 목록</Link>
        </li>
        <li>
          <Button type="button" onClick={handleLogout}>
            로그아웃
          </Button>
        </li>
      </ul>
    );
  }

  // 로그인 상태 (일반 페이지): Profile 드롭다운
  return (
    <Dropdown>
      <Dropdown.Trigger>
        <Profile size={45} />
      </Dropdown.Trigger>
      <Dropdown.Menu>
        <Dropdown.Item value="mypage">
          <Link href="/myprofile" title="마이페이지로 이동">
            마이페이지
          </Link>
        </Dropdown.Item>
        <Dropdown.Item value="logout">
          <Button type="button" onClick={handleLogout} title="로그아웃">
            로그아웃
          </Button>
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
}
