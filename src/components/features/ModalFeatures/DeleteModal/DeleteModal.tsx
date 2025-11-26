import Modal from '@/components/common/Modal/Modal';
import styles from './DeleteModal.module.scss';
import Button from '@/components/common/Button/Button';

type DeleteModalProps = {
  onDelete?: () => void;
  onCancel?: () => void;
};

/**
 * DeleteModal
 *
 * 삭제 확인을 위한 모달 컴포넌트입니다.
 * 사용자에게 삭제 의사를 재확인하고, 취소 또는 삭제 액션을 제공합니다.
 *
 * @component
 * @param {Object} props
 * @param {Function} [props.onDelete] - 삭제 버튼 클릭 시 실행될 콜백 함수
 * @param {Function} [props.onCancel] - 취소 버튼 클릭 시 실행될 콜백 함수
 *
 * @example
 * // 페이지에서 사용 예시
 * 'use client';
 *
 * import { useModal } from '@/hooks/useModal';
 * import DeleteModal from '@/components/features/ModalFeatures/DeleteModal/DeleteModal';
 *
 * export default function WineDetailPage() {
 *   const { open, close } = useModal();
 *
 *   const handleDelete = () => {
 *     const id = open(
 *       <DeleteModal
 *         onDelete={async () => {
 *           // 삭제 API 호출
 *           await deleteWine(wineId);
 *           console.log('와인이 삭제되었습니다');
 *           close(id);
 *           // 목록 페이지로 이동
 *           router.push('/wines');
 *         }}
 *         onCancel={() => {
 *           console.log('삭제 취소됨');
 *           close(id);
 *         }}
 *       />
 *     );
 *   };
 *
 *   return (
 *     <div>
 *       <Button onClick={handleDelete}>삭제하기</Button>
 *     </div>
 *   );
 * }
 *
 * @example
 * // 리뷰 삭제 예시
 * const handleDeleteReview = (reviewId: number) => {
 *   const id = open(
 *     <DeleteModal
 *       onDelete={async () => {
 *         await deleteReview(reviewId);
 *         close(id);
 *         // 리뷰 목록 새로고침
 *         refetchReviews();
 *       }}
 *       onCancel={() => close(id)}
 *     />
 *   );
 * };
 *
 * @features
 * - X 닫기 버튼 없음 (withCloseButton={false})
 * - 취소/삭제 버튼으로만 닫을 수 있음
 * - 간결한 확인 메시지
 * - 명확한 버튼 구분 (outlined / filled variant)
 *
 * @note
 * - 이 모달은 파괴적 액션(삭제)을 수행하므로 신중하게 사용해야 합니다.
 * - onDelete 콜백에서 실제 삭제 로직과 모달 닫기를 모두 처리해야 합니다.
 */
export default function DeleteModal({ onDelete, onCancel }: DeleteModalProps) {
  return (
    <Modal withCloseButton={false} className={styles.modalWrapper}>
      <Modal.Content>
        <div className={styles.content}>정말 삭제하시겠습니까?</div>
      </Modal.Content>

      <Modal.Footer>
        <div className={styles.footer}>
          <Button className={styles.cancleBtn} variant="outlined" size="large" onClick={onCancel}>
            취소
          </Button>
          <Button className={styles.deleteBtn} variant="filled" size="large" onClick={onDelete}>
            삭제하기
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
