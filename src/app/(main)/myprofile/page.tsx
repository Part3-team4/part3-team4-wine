'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Profile from '@/components/common/Profile/Profile';
import styles from './page.module.scss';
import clsx from 'clsx';
import WineReview from '@/components/features/WineReviewCard/WineReview';
import Button from '@/components/common/Button/Button';
import NoResult from '@/components/common/NoResult/NoResult';
import MylistWineCard from '@/components/features/WineCard/MylistWineCard';
import ImageInput from '@/components/common/Input/ImageInput';
import Input from '@/components/common/Input/Input';
import { useModal } from '@/hooks/useModal';
import WineAddModal from '@/components/features/ModalFeatures/WineAddModal/WineAddModal';
import { WineFormData } from '@/components/features/ModalFeatures/WineAddModal/WineAddModal';
import { Wine, Review, User } from '@/types/wine';
import { api } from '@/libs/api';

type TabType = 'review' | 'wine';

interface Tab {
  id: TabType;
  label: string;
}

const TABS: Tab[] = [
  { id: 'review', label: '내가 쓴 후기' },
  { id: 'wine', label: '내가 등록한 와인' },
];

export default function Page() {
  const { open, close } = useModal();
  const router = useRouter();

  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('review');

  const [reviews, setReviews] = useState<Review[]>([]);
  const [wines, setWines] = useState<Wine[]>([]);
  const [user, setUser] = useState<User>({ id: 1, nickname: '', image: '' });

  const [isSaving, setIsSaving] = useState(false);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const [isWineLoading, setIsWineLoading] = useState(false);

  const currentData = activeTab === 'review' ? reviews : wines;
  const isEmpty = currentData.length === 0;

  useEffect(() => {
    const fetchWines = async () => {
      const res = await api.get('/users/me/wines?limit=20');
      setWines(res.data.list);
      console.log(res.data.list);
    };

    const fetchReviews = async () => {
      const res = await api.get('/users/me/reviews?limit=20');
      setReviews(res.data.list);
      console.log(res.data.list);
    };

    const fetchUser = async () => {
      const res = await api.get('/users/me');
      setUser(res.data);
      console.log(res.data);
    };

    fetchWines();
    fetchReviews();
    fetchUser();
  }, []);

  const handleProfileChange = async (file: File | null) => {
    if (!file) return;

    try {
      setIsSaving(true);

      const formData = new FormData();
      formData.append('image', file);

      const res = await api.post('/images/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const uploadedImageUrl = res.data.url;

      setUser({ ...user, image: uploadedImageUrl });

      setPreviewUrl(uploadedImageUrl);
    } catch (error) {
      console.error('이미지 업로드 실패:', error);
      alert('이미지 업로드에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };
  const handleSave = async () => {
    try {
      const res = await api.patch('/users/me', {
        nickname: user.nickname,
        image: user.image,
      });

      setUser(res.data);
      setPreviewUrl(null);

      alert('프로필이 수정되었습니다!');
    } catch (e) {
      console.error(e);
      alert('프로필 수정 실패');
    } finally {
      setIsEditing(false);
    }
  };

  const handleNavigateToWines = () => {
    router.push('/wines');
  };

  return (
    <main className={styles.myPage}>
      <section className={styles.profileWrapper}>
        {isEditing ? (
          <>
            <ImageInput
              variant="circle"
              size={162}
              currentImageUrl={previewUrl ?? user.image}
              alwaysShowOverlay
              onFileChange={handleProfileChange}
              disabled={isSaving}
            />
            <Input
              value={user.nickname}
              onChange={(e) => setUser({ ...user, nickname: e.target.value })}
              placeholder={user.nickname}
              className={styles.nicknameInput}
            />
            <Button className={styles.button} size="large" onClick={handleSave}>
              수정 완료
            </Button>
          </>
        ) : (
          <>
            <Profile src={user.image} size={162} />
            <div className={styles.nickname}>{user.nickname}</div>
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
            [styles.reviewContent]: activeTab === 'review',
            [styles.empty]: isEmpty,
          })}
        >
          {isEmpty ? (
            <NoResult
              content={activeTab === 'review' ? '작성된 리뷰가 없어요' : '등록한 와인이 없어요'}
              showButton
              buttonText={activeTab === 'review' ? '리뷰 남기기' : '와인 등록하기'}
              onButtonClick={handleNavigateToWines}
            />
          ) : activeTab === 'review' ? (
            reviews.map((review) => (
              <WineReview
                key={review.id}
                name={review.wine.name}
                rating={review.rating}
                date={review.createdAt}
                content={review.content}
              />
            ))
          ) : (
            wines.map((wine) => (
              <MylistWineCard
                key={wine.id}
                name={wine.name}
                region={wine.region}
                price={wine.price}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
}
