/**
 * 프로필 이미지를 보여주는 컴포넌트.
 *
 * - 기본 이미지를 포함해 어떤 이미지든 넣을 수 습니다.
 * - size 값으로 정사각형 크기를 지정할 수 습니다.
 * - Next.js `Image` 컴포넌트의 `fill`을 사용해서 부모 박스를 꽉 채워 렌더링됩니다.
 *
 * @prop {string | StaticImageData} [src=ProfileDefault]
 *   표시할 프로필 이미지. 문자열 URL 또는 정적 이미지 import 모두 가능합니다.
 *
 * @prop {number} [size=45]
 *   프로필 이미지의 가로·세로 크기(px). 정사각형으로 렌더링됩니다.
 *
 * @prop {string} [alt='프로필 이미지']
 *   이미지 대체 텍스트.
 *
 * @example
 * // 기본 크기, 기본 이미지, 기본 설명
 * <Profile />
 *
 * // 크기 60, 기본 이미지, 기본 설명
 * <Profile size={60} />
 *
 * // 기본 크기, 원하는 이미지, 작성 설명
 * <Profile src="/avatars/user1.png" alt="강아지 프로필" />
 */

import Image, { StaticImageData } from 'next/image';
import styles from './Profile.module.scss';
import { ProfileDefault } from '@/assets';

interface ProfileProps {
  src?: string | StaticImageData;
  size?: number;
  alt?: string;
}

export default function Profile({
  src = ProfileDefault,
  size = 45,
  alt = '프로필 이미지',
}: ProfileProps) {
  return (
    <div className={styles.profile} style={{ width: size, height: size }}>
      <Image src={src} alt={alt} fill sizes={`${size}px`} />
    </div>
  );
}
