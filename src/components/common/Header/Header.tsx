'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import styles from './Header.module.scss';
import { Logo } from '@/assets';
import Dropdown from '../Dropdown/';
import Profile from '../Profile/Profile';
import { useAuthStore } from '@/store/authStore';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  // Zustand 로그인 상태
  const isLogin = useAuthStore((state) => state.isLogin);
  const logout = useAuthStore((state) => state.logout);

  // 마이페이지 여부
  const isMyProfile = pathname === '/myprofile';

  // 로그아웃 → 랜딩 이동 (뒤로가기 방지)
  const handleLogout = () => {
    logout();
    alert('로그아웃 되었습니다.');
    router.replace('/');
  };

  return (
    <div className={styles.header}>
      {/* 로고 */}
      <h1>
        <Link href="/" title="홈으로 이동">
          <Image src={Logo} alt="와인 로고" />
        </Link>
      </h1>

      {/* 오른쪽 영역 */}
      <div>
        {/* 비로그인 상태 */}
        {!isLogin && (
          <ul className={styles.list}>
            <li>
              <Link href="/signin">로그인</Link>
            </li>
            <li>
              <Link href="/signup">회원가입</Link>
            </li>
          </ul>
        )}

        {/* 로그인 상태 + 마이페이지 아닐 때 → 프로필 드롭다운 */}
        {isLogin && !isMyProfile && (
          <Dropdown>
            <Dropdown.Trigger>
              <Profile size={45} />
            </Dropdown.Trigger>

            <Dropdown.Menu>
              <Dropdown.Item value="myprofile" onClick={() => router.push('/myprofile')}>
                <span>마이페이지</span>
              </Dropdown.Item>

              <Dropdown.Item value="logout" onClick={handleLogout}>
                <span>로그아웃</span>
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        )}

        {/* 로그인 상태 + 마이페이지일 때 → 버튼 2개 */}
        {isLogin && isMyProfile && (
          <ul className={styles.list}>
            <li>
              <button type="button" onClick={() => router.push('/wines')}>
                와인 목록
              </button>
            </li>

            <li>
              <button type="button" onClick={handleLogout}>
                로그아웃
              </button>
            </li>
          </ul>
        )}
      </div>
    </div>
  );
}
