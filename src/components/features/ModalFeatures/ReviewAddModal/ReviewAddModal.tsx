'use client';

import { useState } from 'react';
import Modal from '@/components/common/Modal/Modal';
import Button from '@/components/common/Button/Button';
import styles from './ReviewAddModal.module.scss';
import Image from 'next/image';
import { Wine } from '@/assets';
import StarRating from '@/components/common/StarRating/StarRating';
import TextArea from '@/components/common/TextArea/TextArea';
import { AromaType } from '@/constants/aroma';
import AromaChipList from '../../AromaChipList/AromaChipList';
import WineFlavor from '../../WineFlavor/WineFlavor';

interface ReviewAddModalProps {
  wineName: string;
  wineId: number;

  mode?: 'add' | 'edit';

  defaultValues?: {
    rating: number;
    lightBold: number;
    smoothTannic: number;
    drySweet: number;
    softAcidic: number;
    aroma: string[];
    content: string;
  };

  onSubmit: (data: {
    rating: number;
    lightBold: number;
    smoothTannic: number;
    drySweet: number;
    softAcidic: number;
    aroma: string[];
    content: string;
  }) => void;
}

/**
 * ReviewAddModal
 *
 * 와인 리뷰를 작성하는 모달 컴포넌트입니다.
 * 별점, 후기 텍스트, 향(Aroma) 선택 기능을 제공합니다.
 *
 * @component
 * @param {Object} props
 * @param {string} props.wineName - 리뷰를 작성할 와인의 이름
 * @param {Function} [props.onAdd] - 리뷰 등록 버튼 클릭 시 실행될 콜백 함수
 *
 * @example
 * // 페이지에서 사용 예시
 * 'use client';
 *
 * import { useModal } from '@/hooks/useModal';
 * import ReviewAddModal from '@/components/features/ModalFeatures/ReviewAddModal/ReviewAddModal';
 *
 * export default function WineDetailPage() {
 *   const { open, close } = useModal();
 *
 *   const handleOpenReviewModal = () => {
 *     const id = open(
 *       <ReviewAddModal
 *         wineName="샤또 마고 2015"
 *         onAdd={() => {
 *           // 리뷰 등록 API 호출
 *           console.log('리뷰 등록 완료');
 *           close(id);
 *         }}
 *       />
 *     );
 *   };
 *
 *   return (
 *     <div>
 *       <Button onClick={handleOpenReviewModal}>리뷰 남기기</Button>
 *     </div>
 *   );
 * }
 *
 * @features
 * - 와인 정보 표시 (이름, 아이콘)
 * - 별점 평가 (StarRating 컴포넌트 사용)
 * - 텍스트 리뷰 작성 (TextArea 컴포넌트 사용)
 * - 와인 향(Aroma) 다중 선택 (Chip 컴포넌트 사용)
 * - Flavor 섹션 (추후 구현 예정)
 */
export default function ReviewAddModal({
  wineName,
  wineId,
  mode = 'add',
  defaultValues,
  onSubmit,
}: ReviewAddModalProps) {
  const [reviewForm, setReviewForm] = useState({
    rating: defaultValues?.rating ?? 0,
    lightBold: defaultValues?.lightBold ?? 5,
    smoothTannic: defaultValues?.smoothTannic ?? 5,
    drySweet: defaultValues?.drySweet ?? 5,
    softAcidic: defaultValues?.softAcidic ?? 5,
    aroma: defaultValues?.aroma ?? [],
    content: defaultValues?.content ?? '',
  });

  return (
    <Modal withCloseButton={true} className={styles.modalWrapper}>
      <Modal.Header>
        <div className={styles.header}>{mode === 'edit' ? '리뷰 수정' : '리뷰 등록'}</div>
      </Modal.Header>

      <Modal.Content>
        <div className={styles.content}>
          {/* 별점 */}
          <div className={styles.nameAndStarWrapper}>
            <div className={styles.name}>{wineName}</div>
            <StarRating
              clickable
              defaultValue={reviewForm.rating}
              onChange={(v) => setReviewForm((p) => ({ ...p, rating: v }))}
            />
          </div>

          {/* 내용 */}
          <TextArea
            placeholder="후기를 작성해 주세요"
            value={reviewForm.content}
            onChange={(e) => setReviewForm((p) => ({ ...p, content: e.target.value }))}
          />

          {/* 맛 */}
          <WineFlavor
            values={{
              body: reviewForm.lightBold,
              tannin: reviewForm.smoothTannic,
              sweetness: reviewForm.drySweet,
              acidity: reviewForm.softAcidic,
            }}
            onChange={(values) =>
              setReviewForm((p) => ({
                ...p,
                lightBold: values!.body,
                smoothTannic: values!.tannin,
                drySweet: values!.sweetness,
                softAcidic: values!.acidity,
              }))
            }
          />

          {/* 향 */}
          <AromaChipList
            clickable
            defaultSelected={reviewForm.aroma}
            onChange={(list) => setReviewForm((p) => ({ ...p, aroma: list }))}
          />
        </div>
      </Modal.Content>

      <Modal.Footer>
        <Button
          className={styles.addBtn}
          size="large"
          variant="filled"
          onClick={() => onSubmit(reviewForm)}
          fullWidth
        >
          {mode === 'edit' ? '리뷰 수정하기' : '리뷰 남기기'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
