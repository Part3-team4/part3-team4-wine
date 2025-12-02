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
import ReviewAddModal from '@/components/features/ModalFeatures/ReviewAddModal/ReviewAddModal';
import { WineFormData } from '@/components/features/ModalFeatures/WineAddModal/WineAddModal';
import DeleteModal from '@/components/features/ModalFeatures/DeleteModal/DeleteModal';
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

  const [editingReview, setEditingReview] = useState<Review | null>(null);
  const [editingWine, setEditingWine] = useState<Wine | null>(null);

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

  // // 리뷰 수정 핸들러
  // const handleEditReview = (review: Review) => {
  //   setEditingReview(review);
  //   // 리뷰 수정 모달 열기 (모달 컴포넌트가 있다고 가정)
  //   open(<ReviewAddModal />);
  // };

  const handleDeleteReview = async (id: number) => {
    const modalId = open(
      <DeleteModal
        onDelete={async () => {
          try {
            await api.delete(`/reviews/${id}`);

            setReviews(reviews.filter((r) => r.id !== id));
            close(modalId);
          } catch (error) {
            console.error('리뷰 삭제 실패:', error);
            alert('리뷰 삭제에 실패했습니다. 다시 한번 시도해주세요.');
            close(modalId);
          }
          close(modalId);
        }}
        onCancel={() => close(modalId)}
      />,
    );
  };

  // // 리뷰 수정 완료 핸들러
  // const handleUpdateReview = async (
  //   id: number,
  //   updatedData: { rating: number; content: string },
  // ) => {
  //   try {
  //     const res = await api.patch(`/reviews/${id}`, updatedData);

  //     // 로컬 상태 업데이트
  //     setReviews(reviews.map((r) => (r.id === id ? { ...r, ...res.data } : r)));

  //     setEditingReview(null);
  //     close();
  //     alert('리뷰가 수정되었습니다.');
  //   } catch (error) {
  //     console.error('리뷰 수정 실패:', error);
  //     alert('리뷰 수정에 실패했습니다.');
  //   }
  // };

  // // 와인 수정 핸들러
  // const handleEditWine = (wine: Wine) => {
  //   setEditingWine(wine);
  //   // 와인 수정 모달 열기
  //   open('wineEditModal');
  // };

  const handleDeleteWine = (id: number) => {
    const modalId = open(
      <DeleteModal
        onDelete={async () => {
          try {
            await api.delete(`/wines/${id}`);

            setWines(wines.filter((w) => w.id !== id));
            close(modalId);
          } catch (error) {
            console.error('와인 삭제 실패:', error);
            alert('리뷰 삭제에 실패했습니다. 다시 한번 시도해주세요.');
            close(modalId);
          }
          close(modalId);
        }}
        onCancel={() => close(modalId)}
      />,
    );
  };

  // // 와인 수정 완료 핸들러
  // const handleUpdateWine = async (id: number, updatedData: Partial<Wine>) => {
  //   try {
  //     const res = await api.patch(`wines/${id}`, updatedData);

  //     setWines(wines.map((w) => (w.id === id ? { ...w, ...res.data } : w)));

  //     setEditingWine(null);
  //     close();
  //     alert('와인 정보가 수정되었습니다.');
  //   } catch (error) {
  //     console.error('와인 수정 실패:', error);
  //     alert('와인 수정에 실패했습니다.');
  //   }
  // };

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

      const uploadedImageUrl = res.data.url || res.data.image;

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
                // onEdit={() => handleEditReview(review)}
                onDelete={() => handleDeleteReview(review.id)}
              />
            ))
          ) : (
            wines.map((wine) => (
              <MylistWineCard
                key={wine.id}
                name={wine.name}
                region={wine.region}
                price={wine.price}
                // onEdit={() => handleEditWine(wine)}
                onDelete={() => handleDeleteWine(wine.id)}
              />
            ))
          )}
        </div>
      </section>
    </main>
  );
}
