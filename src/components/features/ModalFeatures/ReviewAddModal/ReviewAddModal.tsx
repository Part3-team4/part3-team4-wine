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

type ReviewAddModalProps = {
  wineName: string;
  onAdd?: () => void;
};

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
export default function ReviewAddModal({ wineName, onAdd }: ReviewAddModalProps) {
  const [review, setReview] = useState('');

  return (
    <Modal withCloseButton={true} className={styles.modalWrapper}>
      <Modal.Header>
        <div className={styles.header}>리뷰 등록</div>
      </Modal.Header>
      <Modal.Content>
        <div className={styles.content}>
          <div className={styles.section}>
            <div className={styles.wineIntroWrapper}>
              <div className={styles.iconWrapper}>
                <Image src={Wine} alt="와인 아이콘" width={54} height={54} />
              </div>
              <div className={styles.nameAndStarWrapper}>
                <div className={styles.name}>{wineName}</div>
                <StarRating clickable={true} />
              </div>
            </div>
            <div className={styles.textarea}>
              <TextArea
                placeholder="후기를 작성해 주세요"
                value={review}
                onChange={(e) => setReview(e.target.value)}
              />
            </div>
          </div>
          <div className={styles.section}>
            <h3 className={styles.subTitle}>와인의 맛은 어땠나요?</h3>
            <WineFlavor />
          </div>
          <div className={styles.section}>
            <h3 className={styles.subTitle}>기억에 남는 향이 있나요?</h3>
            <AromaChipList />
          </div>
        </div>
      </Modal.Content>
      <Modal.Footer>
        <div className={styles.footer}>
          <Button className={styles.addBtn} size="large" variant="filled" onClick={onAdd}>
            리뷰 남기기
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
