import Modal from '@/components/common/Modal/Modal';
import WineFilter from '../../WineFilter/WineFilter';
import Button from '@/components/common/Button/Button';
import styles from './WineFilterModal.module.scss';

export default function WineFilterModal() {
  const onReset = () => {
    // 초기화 버튼
  };

  const onApply = () => {
    // 필터 적용 버튼
  };

  return (
    <div>
      <Modal withCloseButton={true} className={styles.modalWrapper}>
        <Modal.Header>
          <div className={styles.header}>필터</div>
        </Modal.Header>
        <Modal.Content>
          <WineFilter />
        </Modal.Content>
        <Modal.Footer>
          <div className={styles.footer}>
            <Button className={styles.resetBtn} size="large" variant="tinted" onClick={onReset}>
              초기화
            </Button>
            <Button className={styles.applyBtn} size="large" variant="filled" onClick={onApply}>
              필터 적용하기
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
