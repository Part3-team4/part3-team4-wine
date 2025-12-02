'use client';

import styles from './wines.module.scss';
import ListWineCard from '@/components/features/WineCard/ListWineCard';
import SearchInput from '@/components/common/Input/searchInput';
import { useCallback, useEffect, useState } from 'react';
import WineFilter from '@/components/features/WineFilter/WineFilter';
import WineSlider from '@/components/features/WineSlider/WineSlider';
import { api } from '@/libs/api';
import Button from '@/components/common/Button/Button';
import { useModal } from '@/hooks/useModal';
import WineAddModal from '@/components/features/ModalFeatures/WineAddModal/WineAddModal';
import NoResult from '@/components/common/NoResult/NoResult';

interface Wine {
  id: number;
  name: string;
  avgRating: number;
  region: string;
  price: number;
  image?: string;
  reviewCount: number;
  recentReview?: {
    content: string;
  } | null;
}

export default function Page() {
  // 와인 등록하기
  const { open, close } = useModal();

  const [searchText, setSearchText] = useState('');

  const [allWines, setAllWines] = useState<Wine[]>([]);
  const [wines, setWines] = useState<Wine[]>([]);
  const [recommendedWines, setRecommendedWines] = useState([]);

  // 정렬
  const [sortType, setSortType] = useState<'recommended' | 'review' | 'priceHigh' | 'priceLow'>(
    'recommended',
  );

  const sortWines = useCallback(
    (list: Wine[]) => {
      switch (sortType) {
        case 'review':
          return [...list].sort((a, b) => b.reviewCount - a.reviewCount); // 리뷰 많은 순
        case 'priceHigh':
          return [...list].sort((a, b) => b.price - a.price); // 높은 가격 순
        case 'priceLow':
          return [...list].sort((a, b) => a.price - b.price); // 낮은 가격 순
        case 'recommended':
        default:
          return [...list].sort((a, b) => b.avgRating - a.avgRating); // 추천 = 평점순
      }
    },
    [sortType],
  );

  useEffect(() => {
    setWines(sortWines(allWines));
  }, [sortType, allWines, sortWines]);

  // 와인 등록하기
  async function createWine(data: {
    name: string;
    region: string;
    image: string;
    price: number;
    type: 'RED' | 'WHITE' | 'SPARKLING';
  }) {
    const res = await api.post('/wines', data);
    return res.data;
  }

  // 이미지 업로드
  async function uploadImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);

    const res = await api.post('/images/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return res.data;
  }

  const handleOpenWineAddModal = () => {
    const modalId = open(
      <WineAddModal
        onSubmit={async (data) => {
          // 1) 이미지 업로드 (있을 경우만)
          const imageUrl = data.image ? (await uploadImage(data.image)).url : '';

          // 2) 와인 등록 API 호출
          await createWine({
            name: data.name,
            region: data.region,
            price: data.price,
            type: data.type,
            image: imageUrl,
          });

          await fetchWines();

          // 3) 등록 성공 후 모달 닫기
          close(modalId);
        }}
      />,
    );
  };

  // 와인 리스트
  const fetchWines = useCallback(async () => {
    const res = await api.get('/wines?limit=50');
    setAllWines(res.data.list);
    setWines(res.data.list);
  }, []);

  const handleSearch = () => {
    if (!searchText.trim()) {
      setWines(allWines);
      setSortType('recommended');
      return;
    }

    // 검색
    const filtered = allWines.filter((wine) =>
      wine.name.toLowerCase().includes(searchText.toLowerCase()),
    );

    setWines(filtered);
  };

  // wine불러오기
  useEffect(() => {
    // 추천 와인 리스트
    const fetchRecommendedWines = async () => {
      const res = await api.get('/wines/recommended?limit=20');
      setRecommendedWines(res.data);
    };

    fetchWines();
    fetchRecommendedWines();
  }, []);

  return (
    <div className={styles.winesWrap}>
      <div className={styles.slideArea}>
        <h2>이번 달 추천 와인</h2>
        <div className={styles.recommendSlide}>
          {recommendedWines.length > 0 && <WineSlider data={recommendedWines} />}
        </div>
      </div>
      <div className={styles.contentArea}>
        <div className={styles.filterArea}>
          <SearchInput
            placeholder="와인을 검색해 보세요"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
          />
          <div className={styles.wineFilterArea}>
            <WineFilter />
            <div className={styles.buttonArea}>
              <div className={styles.half}>
                <Button size="medium" variant="tinted">
                  필터 적용
                </Button>
                <Button size="medium" variant="outlined">
                  초기화
                </Button>
              </div>
              <Button size="medium" fullWidth onClick={handleOpenWineAddModal}>
                와인 등록하기
              </Button>
            </div>
          </div>
        </div>
        <div className={styles.wineListArea}>
          <ul className={styles.sortList}>
            <li>
              <button
                onClick={() => setSortType('review')} // ⭐ 추가
                className={sortType === 'review' ? styles.active : ''}
              >
                많은 리뷰
              </button>
            </li>

            <li>
              <button
                onClick={() => setSortType('priceHigh')} // ⭐ 추가
                className={sortType === 'priceHigh' ? styles.active : ''}
              >
                높은가격순
              </button>
            </li>

            <li>
              <button
                onClick={() => setSortType('priceLow')} // ⭐ 추가
                className={sortType === 'priceLow' ? styles.active : ''}
              >
                낮은 가격순
              </button>
            </li>

            <li>
              <button
                onClick={() => setSortType('recommended')} // ⭐ 추가
                className={sortType === 'recommended' ? styles.active : ''}
              >
                추천순
              </button>
            </li>
          </ul>
          {allWines.length > 0 && wines.length === 0 ? (
            <NoResult content="검색 결과가 없습니다." />
          ) : (
            <ul className={styles.wineList}>
              {wines.map((wine) => (
                <li key={wine.id}>
                  <ListWineCard
                    id={wine.id}
                    name={wine.name}
                    rating={wine.avgRating}
                    region={wine.region}
                    price={wine.price}
                    reviewLength={wine.reviewCount}
                    reviewContent={wine.recentReview?.content}
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
