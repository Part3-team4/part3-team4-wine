'use client';

import styles from './wines.module.scss';
import ListWineCard from '@/components/features/WineCard/ListWineCard';
import SearchInput from '@/components/common/Input/searchInput';
import { useEffect, useState } from 'react';
import WineFilter from '@/components/features/WineFilter/WineFilter';
import WineSlider from '@/components/features/WineSlider/WineSlider';
import { api } from '@/libs/api';

interface Wine {
  id: number;
  name: string;
  rating: number;
  region: string;
  price: number;
  image?: string;
  reviewLength: number;
  reviewContent: string;
}

export default function Page() {
  const [searchText, setSearchText] = useState('');
  const [wines, setWines] = useState<Wine[]>([]);

  // wine불러오기
  useEffect(() => {
    const fetchWines = async () => {
      const res = await api.get('/wines?limit=20');
      setWines(res.data.list);
    };
    fetchWines();
  }, []);

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
        </div>
      </div>
    </div>
  );
}
