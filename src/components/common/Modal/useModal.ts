'use client';

import { ReactNode } from 'react';
import { useModalContext } from './ModalProvider';

/**
 * useModal
 *
 * 모달을 열고 닫는 기능을 제공하는 커스텀 훅입니다.
 *
 * - open(children, options?): 모달을 열고 모달 id를 반환합니다.
 * - close(id?): 특정 모달(id)을 닫거나 id 없으면 전체 모달을 닫습니다.
 *
 * @example
 *
 * import { useModal } from "@/components/common/Modal/useModal";
 * import Modal from "@/components/common/Modal/Modal";
 *
 * export default function Page() {
 *   const { open, close } = useModal();
 *
 *   function handleOpen() {
 *     // open은 "JSX(ReactNode)"를 첫 인자로 받습니다.
 *     const id = open(
 *       <Modal id="welcome">
 *         <h2>환영합니다!</h2>
 *         <p>모달 내부 내용</p>
 *
 *         <button onClick={() => close("welcome")}>닫기</button>
 *       </Modal>
 *     );
 *
 *     // 필요하면 id를 보관하여 나중에 close(id)로 닫을 수 있음
 *   }
 *
 *   return <button onClick={handleOpen}>모달 열기</button>;
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
