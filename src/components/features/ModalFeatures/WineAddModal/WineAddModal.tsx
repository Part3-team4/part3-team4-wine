'use client';

import { useState } from 'react';
import Modal from '@/components/common/Modal/Modal';
import Button from '@/components/common/Button/Button';
import FormInput from '@/components/common/Input/FormInput';
import ImageInput from '@/components/common/Input/ImageInput';
import styles from './WineAddModal.module.scss';
import SelectBox from '@/components/common/SelectBox/SelectBox';
import { WINE_TYPE_OPTIONS } from '@/constants/wine';

export type WineFormData = {
  name: string;
  price: number;
  region: string;
  type: 'RED' | 'WHITE' | 'SPARKLING';
  image: File | null;
};

type WineAddModalProps = {
  onSubmit: (data: WineFormData) => Promise<void>;
  isLoading?: boolean;
};

/**
 * WineAddModal
 *
 * 새로운 와인을 등록하는 모달 컴포넌트입니다.
 * 모달 내부에서 자체적으로 상태를 관리하고, 제출 시에만 부모에게 데이터를 전달합니다.
 *
 * @component
 * @param {Object} props
 * @param {Function} props.onSubmit - 와인 등록 제출 핸들러 (WineFormData를 받음)
 * @param {boolean} [props.isLoading] - 로딩 상태
 *
 * @example
 * const handleOpenWineAddModal = () => {
 *   const modalId = open(
 *     <WineAddModal
 *       onSubmit={async (data) => {
 *         await submitWineAPI(data);
 *         close(modalId);
 *       }}
 *     />
 *   );
 * };
 */
export default function WineAddModal({ onSubmit, isLoading = false }: WineAddModalProps) {
  const [formData, setFormData] = useState<WineFormData>({
    name: '',
    price: 0,
    region: '',
    type: 'RED',
    image: null,
  });

  const handleFormChange = (key: keyof WineFormData, value: string | number | File | null) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!formData.name || !formData.price || !formData.region) {
      alert('모든 필드를 입력해주세요.');
      return;
    }

    await onSubmit(formData);
  };

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
            onChange={(e) => handleFormChange('name', e.target.value)}
          />
          <FormInput
            label="가격"
            type="number"
            placeholder="가격 입력"
            value={formData.price}
            onChange={(e) => handleFormChange('price', Number(e.target.value))}
          />
          <FormInput
            label="원산지"
            type="text"
            placeholder="원산지 입력"
            value={formData.region}
            onChange={(e) => handleFormChange('region', e.target.value)}
          />
          <SelectBox
            label="타입"
            placeholder="RED"
            options={WINE_TYPE_OPTIONS}
            onChange={(value) => handleFormChange('type', value)}
          />
          <ImageInput
            label="와인 사진"
            onFileChange={(file) => handleFormChange('image', file)}
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
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? '등록 중...' : '와인 등록하기'}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
