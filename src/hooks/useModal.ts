'use client';

import { ReactNode } from 'react';
import { useModalContext } from '@/provider/ModalProvider';

/**
 * useModal
 *
 * 모달을 열고 닫는 기능을 제공하는 커스텀 훅입니다.
 *
 * @returns {{
 *   open: (children: ReactNode, options?: { onClose?: () => void }) => string;
 *   close: (id?: string) => void;
 * }}
 *
 * @function open
 * 모달을 엽니다. 반환된 id를 저장하여 나중에 특정 모달을 닫을 수 있습니다.
 * @param {ReactNode} children - 모달에 렌더링할 컴포넌트
 * @param {Object} options - 추가 옵션
 * @param {Function} options.onClose - 모달이 닫힐 때 실행될 콜백
 * @returns {string} 생성된 모달의 고유 ID
 *
 * @function close
 * 열려있는 모달을 닫습니다.
 * @param {string} id - 닫을 모달의 ID (생략 시 모든 모달 닫음)
 *
 * @example
 * // 페이지에서 모달 열기
 * 'use client';
 *
 * import { useModal } from '@/hooks/useModal';
 * import DeleteModal from '@/components/features/ModalFeatures/DeleteModal/DeleteModal';
 *
 * export default function Page() {
 *   const { open, close } = useModal();
 *
 *   const handleOpenDeleteModal = () => {
 *     const id = open(
 *       <DeleteModal
 *         onDelete={() => {
 *           console.log('삭제됨');
 *           close(id);
 *         }}
 *         onCancel={() => close(id)}
 *       />
 *     );
 *   };
 *
 *   return <button onClick={handleOpenDeleteModal}>삭제</button>;
 * }
 *
 */
export function useModal() {
  const { openModal, closeModal } = useModalContext();

  const open = (children: ReactNode, options?: { onClose?: () => void }) => {
    return openModal(children, options);
  };

  const close = (id?: string) => {
    closeModal(id);
  };

  return { open, close };
}
