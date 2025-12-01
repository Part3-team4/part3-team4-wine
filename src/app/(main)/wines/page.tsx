'use client';

import styles from './wines.module.scss';
import ListWineCard from '@/components/features/WineCard/ListWineCard';
import SearchInput from '@/components/common/Input/searchInput';
import { useState } from 'react';
import WineFilter from '@/components/features/WineFilter/WineFilter';
import WineSlider from '@/components/features/WineSlider/WineSlider';

export default function Page() {
  const [searchText, setSearchText] = useState('');

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
            <li>
              <button>많은 리뷰</button>
            </li>
            <li>
              <button>높은가격순</button>
            </li>
            <li>
              <button>낮은 가격순</button>
            </li>
            <li>
              <button className={styles.active}>추천순</button>
            </li>
          </ul>
          <ul className={styles.wineList}>
            <li>
              <ListWineCard
                name="a"
                rating={2}
                id={1}
                region="asdsd"
                price={12312323}
                reviewLength={2}
                reviewContent="sadas"
              />
            </li>
            <li>
              <ListWineCard
                name="a"
                rating={2}
                id={1}
                region="asdsd"
                price={12312323}
                reviewLength={2}
                reviewContent="sadas"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
