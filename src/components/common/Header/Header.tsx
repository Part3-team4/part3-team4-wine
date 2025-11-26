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

import Image from 'next/image';
import styles from './Header.module.scss';
import { Logo } from '@/assets';
import Link from 'next/link';
import Dropdown from '../Dropdown/';
import Profile from '../Profile/Profile';

export default function Header() {
  return (
    <div className={styles.header}>
      <h1>
        <Link href="/" title="홈으로 이동">
          <Image src={Logo} alt="와인 로고" />
        </Link>
      </h1>
      <div>
        {/* 비 로그인 상태 */}
        {/* <ul className={styles.list}>
          <li>
            <Link href="/signin">로그인</Link>
          </li>
          <li>
            <Link href="/signup">회원가입</Link>
          </li>
        </ul> */}

        {/* 마이 페이지 */}
        {/* <ul className={styles.list}>
          <li>
            <Link href="/wines">와인 목록</Link>
          </li>
          <li>
            <Link href="/">로그아웃</Link>
          </li>
        </ul> */}

        {/* 로그인 상태 */}
        <Dropdown>
          <Dropdown.Trigger>
            <Profile size={45} />
          </Dropdown.Trigger>
          <Dropdown.Menu>
            <Dropdown.Item value="edit">
              <Link href="#" title="마이페이지로 이동">
                마이페이지
              </Link>
            </Dropdown.Item>
            <Dropdown.Item value="del">
              <Link href="#" title="로그아웃">
                로그아웃
              </Link>
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
