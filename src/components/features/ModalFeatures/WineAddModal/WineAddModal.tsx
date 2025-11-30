'use client';

import { useState } from 'react';
import Modal from '@/components/common/Modal/Modal';
import Button from '@/components/common/Button/Button';
import FormInput from '@/components/common/Input/FormInput';
import ImageInput from '@/components/common/Input/ImageInput';
import styles from './WineAddModal.module.scss';
import SelectBox from '@/components/common/SelectBox/SelectBox';
import { WINE_TYPE_OPTIONS } from '@/constants/wine';

type WineFormData = {
  name: string;
  price: number;
  region: string;
  type: string;
  image: File | null;
};

type WineAddModalProps = {
  formData: WineFormData;
  onFormChange: (key: keyof WineFormData, value: string | number | File | null) => void;
  onSubmit: () => void;
  isLoading?: boolean;
};

/**
 * WineAddModal
 *
 * 새로운 와인을 등록하는 모달 컴포넌트입니다.
 * 상태 관리는 부모 컴포넌트에서 처리합니다.
 *
 * @component
 * @param {Object} props
 * @param {WineFormData} props.formData - 와인 폼 데이터
 * @param {Function} props.onFormChange - 폼 데이터 변경 핸들러
 * @param {Function} props.onSubmit - 제출 핸들러
 * @param {boolean} [props.isLoading] - 로딩 상태
 *
 * @example
 * // 페이지에서 사용 예시
 * 'use client';
 *
 * import { useState } from 'react';
 * import { useModal } from '@/hooks/useModal';
 * import WineAddModal from '@/components/features/ModalFeatures/WineAddModal/WineAddModal';
 * import axios from 'axios';
 *
 * export default function WineListPage() {
 *   const { open, close } = useModal();
 *   const [formData, setFormData] = useState({
 *     name: '',
 *     price: 0,
 *     region: '',
 *     type: 'RED',
 *     image: null,
 *   });
 *   const [isLoading, setIsLoading] = useState(false);
 *
 *   const handleFormChange = (key, value) => {
 *     setFormData(prev => ({ ...prev, [key]: value }));
 *   };
 *
 *   const handleSubmit = async () => {
 *     if (!formData.name || !formData.price || !formData.region) {
 *       alert('모든 필드를 입력해주세요.');
 *       return;
 *     }
 *
 *     setIsLoading(true);
 *     try {
 *       const submitData = new FormData();
 *       submitData.append('name', formData.name);
 *       submitData.append('price', formData.price.toString());
 *       submitData.append('region', formData.region);
 *       submitData.append('type', formData.type);
 *       if (formData.image) {
 *         submitData.append('image', formData.image);
 *       }
 *
 *       await axios.post('/api/wines', submitData, {
 *         headers: { 'Content-Type': 'multipart/form-data' }
 *       });
 *
 *       // 와인 목록 갱신
 *       refetchWines();
 *       close(modalId);
 *     } catch (error) {
 *       console.error('와인 등록 실패:', error);
 *       alert('와인 등록에 실패했습니다.');
 *     } finally {
 *       setIsLoading(false);
 *     }
 *   };
 *
 *   const handleOpenWineAddModal = () => {
 *     const modalId = open(
 *       <WineAddModal
 *         formData={formData}
 *         onFormChange={handleFormChange}
 *         onSubmit={handleSubmit}
 *         isLoading={isLoading}
 *       />
 *     );
 *   };
 *
 *   return <button onClick={handleOpenWineAddModal}>와인 등록하기</button>;
 * }
 *
 */
export default function WineAddModal({
  formData: propValue,
  onFormChange: externalOnFormChange,
  onSubmit,
  isLoading = false,
}: WineAddModalProps) {
  // UI 테스트를 위한 내부 상태 (props가 없을 때만 사용)
  const [internalFormData, setInternalFormData] = useState<WineFormData>({
    name: '',
    price: 0,
    region: '',
    type: 'RED',
    image: null,
  });

  // 외부 props가 있으면 외부 것 사용, 없으면 내부 상태 사용
  const formData = propValue || internalFormData;
  const onFormChange =
    externalOnFormChange ||
    ((key, value) => {
      setInternalFormData((prev) => ({ ...prev, [key]: value }));
    });

  return (
    <Modal withCloseButton={true} className={styles.modalWrapper}>
      <Modal.Header>
        <div className={styles.header}>와인 등록</div>
      </Modal.Header>
      <Modal.Content>
        <div className={styles.content}>
          <FormInput
            label="와인 이름"
            type="text"
            placeholder="와인 이름 입력"
            value={formData.name}
            onChange={(e) => onFormChange('name', e.target.value)}
          />
          <FormInput
            label="가격"
            type="number"
            placeholder="가격 입력"
            value={formData.price}
            onChange={(e) => onFormChange('price', Number(e.target.value))}
          />
          <FormInput
            label="원산지"
            type="text"
            placeholder="원산지 입력"
            value={formData.region}
            onChange={(e) => onFormChange('region', e.target.value)}
          />
          <SelectBox
            label="타입"
            placeholder="RED"
            options={WINE_TYPE_OPTIONS}
            onChange={(value) => onFormChange('type', value)}
          />
          <ImageInput
            label="와인 사진"
            onFileChange={(file) => {
              // 추후 api 연동
              onFormChange('image', file);
            }}
            accept="image/png, image/jpeg"
            className={styles.wineImage}
          />
        </div>
      </Modal.Content>
      <Modal.Footer>
        <div className={styles.footer}>
          <Button
            className={styles.addBtn}
            size="large"
            variant="filled"
            onClick={onSubmit}
            disabled={isLoading}
          >
            {isLoading ? '등록 중...' : '와인 등록하기'}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
