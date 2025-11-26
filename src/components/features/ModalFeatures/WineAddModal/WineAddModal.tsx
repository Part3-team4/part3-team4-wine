'use client';

import Modal from '@/components/common/Modal/Modal';
import Button from '@/components/common/Button/Button';
import FormInput from '@/components/common/Input/FormInput';
import ImageInput from '@/components/common/Input/ImageInput';
import styles from './WineAddModal.module.scss';

type WineAddModalProps = {
  onCancel?: () => void;
  onAdd?: () => void;
};

export default function WineAddModal({ onCancel, onAdd }: WineAddModalProps) {
  return (
    <Modal withCloseButton={true} className={styles.modalWrapper}>
      <Modal.Header>
        <div className={styles.header}>와인 등록</div>
      </Modal.Header>
      <Modal.Content>
        <div className={styles.content}>
          <div>
            <FormInput label="와인 이름" type="text" placeholder="와인 이름 입력" />
          </div>
          <div>
            <FormInput label="가격" type="number" placeholder="가격 입력" />
          </div>
          <div>
            <FormInput label="원산지" type="text" placeholder="원산지 입력" />
          </div>
          <div>
            {/*타입은 추후 SelectBox 컴포넌트로 변경할 예정*/}
            <FormInput label="타입" type="text" placeholder="red" />
          </div>
          <div>
            <ImageInput
              label="와인 사진"
              onFileChange={(file) => {
                // 추후 api 연동
              }}
              accept="image/png, image/jpeg"
              className={styles.wineImage}
            />
          </div>
        </div>
      </Modal.Content>
      <Modal.Footer>
        <div className={styles.footer}>
          <Button className={styles.cancleBtn} size="large" variant="tinted" onClick={onCancel}>
            취소
          </Button>
          <Button className={styles.addBtn} size="large" variant="filled" onClick={onAdd}>
            와인 등록하기
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
