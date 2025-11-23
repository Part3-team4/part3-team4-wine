'use client';

import { ReactNode } from 'react';
import { useModalContext } from './ModalProvider';

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
 * - open(children, options?): 모달을 엽니다. 반환값(id)을 저장해야 나중에 close(id)로 닫을 수 있습니다.
 * - close(id): 반드시 open()이 반환한 id를 사용해야 합니다. 하드코딩된 id는 사용하지 마세요.
 *
 * @example
 * import { useModal } from "@/components/common/Modal/useModal";
 * import Modal from "@/components/common/Modal/Modal";
 *
 * export default function Page() {
 *   const { open, close } = useModal();
 *
 *   function handleOpen() {
 *     // open()이 반환한 id를 저장
 *     const id = open(
 *       <Modal>
 *         <h2>안녕하세요!</h2>
 *         <button onClick={() => close(id)}>닫기</button>
 *       </Modal>
 *     );
 *   }
 *
 *   return <button onClick={handleOpen}>모달 열기</button>;
 * }
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
