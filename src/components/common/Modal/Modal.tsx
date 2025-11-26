'use client';

/**
 * Modal
 *
 * Compound Component 패턴을 사용한 모달 컴포넌트입니다.
 * Modal.Header, Modal.Content, Modal.Footer를 조합하여 유연한 레이아웃을 구성할 수 있습니다.
 *
 * @component
 * @example
 * // 기본 사용법
 * <Modal>
 *   <Modal.Content>
 *     <h2>제목</h2>
 *     <p>내용</p>
 *   </Modal.Content>
 *   <Modal.Footer>
 *     <Button>확인</Button>
 *   </Modal.Footer>
 * </Modal>
 *
 * @example
 * // X 버튼 없는 모달
 * <Modal withCloseButton={false}>
 *   <Modal.Content>내용</Modal.Content>
 * </Modal>
 *
 *  * @example
 * // 모달 기능 컴포넌트 예시
 * import { useModal } from '@/hooks/useModal';
 * import Modal from '@/components/common/Modal/Modal';
 * import Button from '@/components/common/Button/Button';
 *
 * export default function DeleteModal({ onDelete, onCancel }) {
 *   return (
 *     <Modal withCloseButton={false}>
 *       <Modal.Content>
 *         <div>정말 삭제하시겠습니까?</div>
 *       </Modal.Content>
 *       <Modal.Footer>
 *         <Button onClick={onCancel}>취소</Button>
 *         <Button onClick={onDelete}>삭제</Button>
 *       </Modal.Footer>
 *     </Modal>
 *   );
 * }
 *
 * @props
 * - id: ModalProvider가 모달을 관리하기 위한 고유 식별자
 * - onRequestClose: 모달이 닫힐 때 실행되는 콜백
 * - children: Modal.Header, Modal.Content, Modal.Footer 등의 서브 컴포넌트
 * - ariaLabel: 접근성을 위한 aria-label 속성
 * - className: 모달 컨테이너에 적용할 추가 CSS 클래스
 * - withCloseButton: X 닫기 버튼 표시 여부 (기본값: true)
 *
 * @note
 * - 이 컴포넌트는 직접 렌더링하지 않고 useModal 훅을 통해 사용합니다.
 * - Modal.Content만 스크롤 가능하며, Header와 Footer는 고정됩니다.
 * - ESC 키나 오버레이 클릭으로 모달을 닫을 수 있습니다.
 */

import React, { ReactElement, useRef } from 'react';
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
  withCloseButton?: boolean;
};

type ModalSubComponentProps = { children: React.ReactNode };

export default function Modal({
  id,
  onRequestClose,
  children,
  ariaLabel = 'Modal Dialog',
  className = '',
  withCloseButton = true,
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

  const childrenArray = React.Children.toArray(children);

  const header = childrenArray.find(
    (child): child is ReactElement<ModalSubComponentProps> =>
      React.isValidElement(child) && child.type === Modal.Header,
  );
  const content = childrenArray.find(
    (child): child is ReactElement<ModalSubComponentProps> =>
      React.isValidElement(child) && child.type === Modal.Content,
  );
  const footer = childrenArray.find(
    (child): child is ReactElement<ModalSubComponentProps> =>
      React.isValidElement(child) && child.type === Modal.Footer,
  );

  return (
    <div className={styles.overlay} onMouseDown={onOverlayClick} role="presentation">
      <div
        className={clsx(styles.modal, className)}
        role="dialog"
        aria-label={ariaLabel}
        aria-modal="true"
        ref={contentRef}
        tabIndex={-1}
      >
        {header && <div className={styles.header}>{header.props.children} </div>}
        {content && <div className={styles.content}>{content.props.children}</div>}
        {footer && <div className={styles.footer}>{footer.props.children}</div>}

        {withCloseButton && (
          <button className={styles.closeBtn} onClick={handleClose} aria-label="닫기">
            <Image src={Close} alt="닫기" width={32} height={32} />
          </button>
        )}
      </div>
    </div>
  );
}

/**
 * Modal.Header
 * 모달 상단 영역 컴포넌트 (선택사항)
 */
Modal.Header = function ModalHeader({ children }: ModalSubComponentProps) {
  return <>{children}</>;
};

/**
 * Modal.Content
 * 모달 본문 영역 컴포넌트 (필수)
 * 내용이 길 경우 스크롤이 가능합니다.
 */
Modal.Content = function ModalContent({ children }: ModalSubComponentProps) {
  return <>{children}</>;
};

/**
 * Modal.Footer
 * 모달 하단 영역 컴포넌트 (선택사항)
 * 주로 버튼을 배치하는 데 사용됩니다.
 */
Modal.Footer = function ModalFooter({ children }: ModalSubComponentProps) {
  return <>{children}</>;
};
