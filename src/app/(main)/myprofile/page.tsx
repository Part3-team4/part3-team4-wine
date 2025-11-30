'use client';

import { useState } from 'react';
import { Wine } from '@/assets';
import Profile from '@/components/common/Profile/Profile';
import styles from './page.module.scss';
import clsx from 'clsx';
import WineReview from '@/components/features/WineReviewCard/WineReview';
import Button from '@/components/common/Button/Button';
import NoResult from '@/components/common/NoResult/NoResult';
import MylistWineCard from '@/components/features/WineCard/MylistWineCard';
import ImageInput from '@/components/common/Input/ImageInput';
import Input from '@/components/common/Input/Input';
import { StaticImageData } from 'next/image';

type TabType = 'review' | 'wine';

interface Tab {
  id: TabType;
  label: string;
}

const TABS: Tab[] = [
  { id: 'review', label: '내가 쓴 후기' },
  { id: 'wine', label: '내가 등록한 와인' },
];

const EMPTY_MESSAGES = {
  review: '작성된 리뷰가 없어요',
  wine: '등록한 와인이 없어요',
} as const;

const mockReviewData = [
  {
    id: '1',
    name: '이름',
    rating: 5.0,
    date: '2025-11-28T12:00:00',
    content: '향이 정말 좋고 바디감도 묵직해요!',
  },
  {
    id: '2',
    name: '이름',
    rating: 5.0,
    date: '2025-11-28T12:00:00',
    content: '향이 정말 좋고 바디감도 묵직해요!',
  },
  {
    id: '3',
    name: '이름',
    rating: 5.0,
    date: '2025-11-28T12:00:00',
    content: '향이 정말 좋고 바디감도 묵직해요!',
  },
];

const mockWineData = [
  { id: '1', name: 'Cabernet Sauvignon 2016', region: 'Western Cape, South Africa', price: 64990 },
  { id: '2', name: 'Cabernet Sauvignon 2016', region: 'Western Cape, South Africa', price: 64990 },
];

const mockUser = { url: Wine, nickname: '완다' };

export default function Page() {
  const [isEditing, setIsEditing] = useState(false);
  const [profileFile, setProfileFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | StaticImageData>(mockUser.url);
  const [nickname, setNickname] = useState(mockUser.nickname);

  const [activeTab, setActiveTab] = useState<TabType>('review');

  // 추후 API 데이터로 교체
  const [reviews, setReviews] = useState(mockReviewData);
  const [wines, setWines] = useState(mockWineData);

  const currentData = activeTab === 'review' ? reviews : wines;
  const isEmpty = currentData.length === 0;

  const handleSave = () => {
    // 추후 API 호출해서 저장
    console.log('저장', { profileFile, nickname });
    setIsEditing(false);
  };

  const handleProfileChange = (file: File | null) => {
    if (!file) return;
    setProfileFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const renderContent = () => {
    if (isEmpty) {
      return (
        <NoResult
          content={EMPTY_MESSAGES[activeTab]}
          showButton={true}
          buttonText={activeTab === 'review' ? '리뷰 남기기' : '와인 등록하기'}
          onButtonClick={() => {
            /* 페이지 이동 */
          }}
        />
      );
    }
    if (activeTab === 'review') {
      return reviews.map((review) => (
        <WineReview
          key={review.id}
          name={review.name}
          rating={review.rating}
          date={review.date}
          content={review.content}
        />
      ));
    }

    return wines.map((wine) => (
      <MylistWineCard key={wine.id} name={wine.name} region={wine.region} price={wine.price} />
    ));
  };

  return (
    <main className={styles.myPage}>
      <section className={styles.profileWrapper}>
        {isEditing ? (
          <>
            <ImageInput
              variant="circle"
              size={162}
              currentImageUrl={previewUrl}
              alwaysShowOverlay
              onFileChange={handleProfileChange}
            />
            <Input
              onChange={(e) => setNickname(e.target.value)}
              placeholder={nickname}
              className={styles.nicknameInput}
            />
            <Button className={styles.button} size="large" onClick={handleSave}>
              수정 완료
            </Button>
          </>
        ) : (
          <>
            <Profile src={previewUrl} size={162} />
            <div className={styles.nickname}>{nickname}</div>
            <Button className={styles.button} size="large" onClick={() => setIsEditing(true)}>
              프로필 수정
            </Button>
          </>
        )}
      </section>
      <section className={styles.contentWrapper}>
        <div className={styles.navWrapper}>
          <div className={styles.tabGroup}>
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={clsx(styles.tab, {
                  [styles.active]: activeTab === tab.id,
                })}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          <div className={styles.count}>총 {currentData.length}개</div>
        </div>
        <div
          className={clsx(styles.contentArea, {
            [styles.wineContent]: activeTab === 'wine',
          })}
        >
          {renderContent()}
        </div>
      </section>
    </main>
  );
}
