'use client';

/**
 * Modal
 *
 * 개별 모달 콘텐츠를 렌더링하는 UI 컴포넌트입니다.
 * - id는 ModalProvider가 모달을 관리하기 위해 필요합니다.
 * - onRequestClose는 모달이 닫힐 때 실행되는 콜백입니다.
 * - children은 실제 모달 내부에 렌더링될 콘텐츠입니다.
 *
 * 따로 사용하지 않습니다.
 * 모달 열기/닫기 등의 동작은 useModal 훅을 통해 제어합니다.
 */

import { useRef } from 'react';
import { useModalContext } from '@/provider/ModalProvider';
import styles from './Modal.module.scss';
import { Close } from '@/assets';
import clsx from 'clsx';
import Image from 'next/image';

type ModalProps = {
  id?: string;
  onRequestClose?: () => void;
  children: React.ReactNode;
  ariaLabel?: string;
  className?: string;
};

export default function Modal({
  id,
  onRequestClose,
  children,
  ariaLabel = 'Modal Dialog',
  className = '',
}: ModalProps) {
  const { closeModal } = useModalContext();
  const contentRef = useRef<HTMLDivElement | null>(null);

  function handleClose() {
    if (onRequestClose) onRequestClose();
    if (id) closeModal(id);
    else closeModal();
  }

  function onOverlayClick(e: React.MouseEvent) {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  }

  return (
    <div className={styles.overlay} onMouseDown={onOverlayClick} role="presentation">
      <div
        className={clsx(styles.modal, className)}
        role="dialog"
        aria-label={ariaLabel}
        aria-modal="true" /* 모달이 떠 있는 동안 뒤는 접근 불가 */
        ref={contentRef}
        tabIndex={-1}
      >
        <div className={styles.header}></div>

        <div className={styles.content}>{children}</div>
        <div className={styles.footer}>버튼 생길 곳 </div>
        <button className={styles.closeBtn} onClick={handleClose} aria-label="닫기">
          <Image src={Close} alt="닫기" width={32} height={32} />
        </button>
      </div>
    </div>
  );
}
