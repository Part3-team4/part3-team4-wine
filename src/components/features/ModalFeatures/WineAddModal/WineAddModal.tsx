'use client';

import Modal from '@/components/common/Modal/Modal';
import Button from '@/components/common/Button/Button';
import FormInput from '@/components/common/Input/FormInput';
import ImageInput from '@/components/common/Input/ImageInput';
import styles from './WineAddModal.module.scss';

type WineAddModalProps = {
  onAdd?: () => void;
};

/**
 * WineAddModal
 *
 * 새로운 와인을 등록하는 모달 컴포넌트입니다.
 * 와인 이름, 가격, 원산지, 타입, 사진을 입력받습니다.
 *
 * @component
 * @param {Object} props
 * @param {Function} [props.onAdd] - 와인 등록 버튼 클릭 시 실행될 콜백 함수
 *
 * @example
 * // 페이지에서 사용 예시
 * 'use client';
 *
 * import { useModal } from '@/hooks/useModal';
 * import WineAddModal from '@/components/features/ModalFeatures/WineAddModal/WineAddModal';
 *
 * export default function WineListPage() {
 *   const { open, close } = useModal();
 *
 *   const handleOpenWineAddModal = () => {
 *     const id = open(
 *       <WineAddModal
 *         onAdd={() => {
 *           // 와인 등록 API 호출
 *           console.log('와인 등록 완료');
 *           close(id);
 *         }}
 *       />
 *     );
 *   };
 *
 *   return (
 *     <div>
 *       <button onClick={handleOpenWineAddModal}>와인 등록하기</button>
 *     </div>
 *   );
 * }
 *
 * @features
 * - 와인 이름 입력 (FormInput)
 * - 가격 입력 (FormInput - number type)
 * - 원산지 입력 (FormInput)
 * - 와인 타입 입력 (추후 SelectBox로 변경 예정)
 * - 와인 사진 업로드 (ImageInput)
 */
export default function WineAddModal({ onAdd }: WineAddModalProps) {
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
          <Button className={styles.addBtn} size="large" variant="filled" onClick={onAdd}>
            와인 등록하기
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
