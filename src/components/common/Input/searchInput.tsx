import styles from '@/components/common/Input/searchInput.module.scss';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, forwardRef } from 'react';
import { Search } from '@/assets/index';

type SearchInputProps = ComponentPropsWithRef<'input'> & {
  fullWidth?: boolean;
};

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
