import styles from '@/components/common/Input/searchInput.module.scss';
import clsx from 'clsx';
import { ComponentPropsWithRef } from 'react';
import { Search } from '@/assets/index';
import Image from 'next/image';

/**
 * SearchInput 컴포넌트의 Props 타입
 */
export type SearchInputProps = ComponentPropsWithRef<'input'>;

/**
 * 재사용 가능한 SearchInput 컴포넌트
 *
 * @description
 * 검색 아이콘이 포함된 입력창 컴포넌트입니다.
 * 부모 요소의 전체 너비를 차지합니다.
 *
 * @example
 * ```tsx
 * // 기본 사용
 * <SearchInput placeholder="와인을 검색해 보세요" />
 *
 * // 제어 컴포넌트로 사용
 * const [searchText, setSearchText] = useState('');
 * <SearchInput
 *   value={searchText}
 *   onChange={(e) => setSearchText(e.target.value)}
 *   placeholder="검색어를 입력하세요"
 * />
 * ```
 */
function SearchInput({ className, ...props }: SearchInputProps) {
  return (
    <div className={clsx(styles.searchContainer, className)}>
      <Image className={styles.searchIcon} src={Search} alt="검색" />
      <input type="text" className={styles.searchInput} {...props} />
    </div>
  );
}

export default SearchInput;
