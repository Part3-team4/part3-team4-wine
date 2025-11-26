import Modal from '@/components/common/Modal/Modal';
import styles from './DeleteModal.module.scss';
import Button from '@/components/common/Button/Button';

type DeleteModalProps = {
  onDelete?: () => void;
  onCancel?: () => void;
};

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
