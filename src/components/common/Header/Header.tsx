/**
 *
 * Header 컴포넌트.
 *
 * @example
 *
 * <Header/>
 * 일단 이렇게 사용
 * 로그인, 비로그인, 마이페이지 케이스는 차후에 작업 예정
 * 마이페이지 링크, 로그아웃 기능 차후에 적용 예정
 * 반응형도 나중에 작업 예정
 * */

'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

import styles from './Header.module.scss';
import { Logo } from '@/assets';
import Dropdown from '../Dropdown/';
import Profile from '../Profile/Profile';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  // 로그인 여부
  const isLoggedIn = typeof window !== 'undefined' && !!localStorage.getItem('accessToken');

  // 마이페이지 여부
  const isMyProfile = pathname === '/myprofile';

  // 로그아웃 (→ 랜딩페이지 /)
  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    alert('로그아웃 되었습니다.');
    window.location.href = '/';
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
        {/*  비로그인 상태 */}
        {!isLoggedIn && (
          <ul className={styles.list}>
            <li>
              <Link href="/signin">로그인</Link>
            </li>
            <li>
              <Link href="/signup">회원가입</Link>
            </li>
          </ul>
        )}

        {/*  로그인 상태 + 마이페이지가 아닐 때 → 프로필 드롭다운 */}
        {isLoggedIn && !isMyProfile && (
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

        {/*  로그인 상태 + 마이페이지일 때 → 버튼 2개 */}
        {isLoggedIn && isMyProfile && (
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
