// src/app/(main)/wines/page.tsx
'use client';

import { useState } from 'react';
import styles from './wines.module.scss';
import ListWineCard from '@/components/features/WineCard/ListWineCard';
import SearchInput from '@/components/common/Input/searchInput';
import WineFilter from '@/components/features/WineFilter/WineFilter';
import WineSlider from '@/components/features/WineSlider/WineSlider';
import { useWines } from '@/domains/wines/hooks/useWines';
import { WINE_SORT_OPTIONS, type WineSortValue } from '@/domains/wines/types/wine.types';

export default function Page() {
  const [searchText, setSearchText] = useState('');
  const [sortOrder, setSortOrder] = useState<WineSortValue>('recent');

  // 정렬 옵션에 따라 동적으로 쿼리
  const { data, isPending, error } = useWines({
    limit: 20,
    // API스펙이랑 다름
    order: sortOrder,
  });

  const wines = data?.list || [];

  return (
    <div className={styles.winesWrap}>
      <div className={styles.slideArea}>
        <h2>이번 달 추천 와인</h2>
        <div className={styles.recommendSlide}>
          <WineSlider />
        </div>
      </div>
      <div className={styles.contentArea}>
        <div className={styles.filterArea}>
          <SearchInput
            placeholder="와인을 검색해 보세요"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className={styles.wineFilterArea}>
            <WineFilter />
          </div>
        </div>
        <div className={styles.wineListArea}>
          <ul className={styles.sortList}>
            {WINE_SORT_OPTIONS.map((option) => (
              <li key={option.value}>
                <button
                  type="button"
                  className={sortOrder === option.value ? styles.active : undefined}
                  onClick={() => setSortOrder(option.value)}
                >
                  {option.label}
                </button>
              </li>
            ))}
          </ul>

          {isPending && <div>로딩 중...</div>}
          {error && <div>에러가 발생했습니다.</div>}

          {!isPending && !error && (
            <ul className={styles.wineList}>
              {wines.map((wine) => (
                <li key={wine.id}>
                  <ListWineCard
                    id={wine.id}
                    name={wine.name}
                    rating={wine.rating}
                    region={wine.region}
                    price={wine.price}
                    reviewLength={wine.reviewLength}
                    reviewContent={wine.reviewContent}
                    image={wine.image}
                  />
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
