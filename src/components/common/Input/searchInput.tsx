import styles from '@/components/common/Input/searchInput.module.scss';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, forwardRef } from 'react';
import { Search } from '@/assets/index';

/**
 * SearchInput 컴포넌트의 props 타입 정의
 *
 * @typedef {Object} SearchInputProps
 * @property {boolean} [fullWidth=false] - true일 경우 부모 요소의 전체 너비를 차지
 */

type SearchInputProps = ComponentPropsWithRef<'input'> & {
  fullWidth?: boolean;
};

/**
 * 재사용 가능한 SearchInput 컴포넌트
 *
 * @component
 *
 * @description
 * 검색 아이콘이 포함된 입력창 컴포넌트입니다.
 *
 * @example
 * // 기본 사용
 * <SearchInput
 *   placeholder="와인을 검색해 보세요"
 * />
 *
 *  * @example
 * // 전체 너비
 * <SearchInput
 *   fullWidth
 *   placeholder="와인을 검색해 보세요"
 * />
 *
 */

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ fullWidth = false, className, ...props }, ref) => {
    return (
      <div
        className={clsx(
          styles.searchContainer,
          {
            [styles.fullWidth]: fullWidth,
          },
          className,
        )}
      >
        <img className={styles.searchIcon} src={Search.src} />
        <input ref={ref} type="text" className={styles.searchInput} {...props} />
      </div>
    );
  },
);

SearchInput.displayName = 'SearchInput';

export default SearchInput;
