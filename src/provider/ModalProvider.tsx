'use client';

/**
 * ModalProvider
 *
 * 앱 전체에서 모달을 사용할 수 있도록 컨텍스트를 제공하는 Provider입니다.
 * - 모달을 포털(#modal-root)에 렌더링합니다.
 * - 여러 모달을 스택 형태로 관리합니다.
 * - ESC 키나 오버레이 클릭으로 최상단 모달을 닫을 수 있습니다.
 * - 모달이 열릴 때 body 스크롤을 잠급니다.
 *
 * 따로 사용하지 않습니다.
 */

import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import ReactDOM from 'react-dom';

/* --- Context Types --- */
type ModalContent = {
  id: string;
  element: React.ReactNode;
  onClose?: () => void;
};

type ModalContextValue = {
  openModal: (element: React.ReactNode, options?: { onClose?: () => void }) => string;
  closeModal: (id?: string) => void;
  closeTopModal: () => void;
  hasModalOpen: boolean;
};

const ModalContext = createContext<ModalContextValue | null>(null);

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modals, setModals] = useState<ModalContent[]>([]);
  const rootRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    let root = document.getElementById('modal-root');
    if (!root) {
      root = document.createElement('div');
      root.id = 'modal-root';
      document.body.appendChild(root);
    }
    rootRef.current = root;

    return () => {};
  }, []);

  /* 모달 열렸을 때 body 스크롤 잠금 */
  useEffect(() => {
    const body = document.body;
    if (modals.length > 0) {
      const prev = { overflow: body.style.overflow, paddingRight: body.style.paddingRight };
      /* 스크롤바 숨김 처리(선택) */
      body.style.overflow = 'hidden';
      return () => {
        body.style.overflow = prev.overflow;
        body.style.paddingRight = prev.paddingRight;
      };
    }
    return;
  }, [modals.length]);

  const openModal = (element: React.ReactNode, options?: { onClose?: () => void }) => {
    const id = Math.random().toString(36).slice(2, 9);
    setModals((prev) => [...prev, { id, element, onClose: options?.onClose }]);
    return id;
  };

  const closeModal = (id?: string) => {
    setModals((prev) => {
      if (!id) return []; /* 모달 창 닫음 */
      const found = prev.find((modal) => modal.id === id);
      if (found?.onClose) {
        try {
          found.onClose();
        } catch (e) {
          /* 무시(fail-safe) */
        }
      }
      return prev.filter((modal) => modal.id !== id);
    });
  };

  const closeTopModal = () => {
    setModals((prev) => {
      const top = prev[prev.length - 1];
      if (top?.onClose) {
        try {
          top.onClose();
        } catch (e) {}
      }
      return prev.slice(0, -1);
    });
  };

  useEffect(() => {
    window.addEventListener('modal-close-top', closeTopModal);
    return () => {
      window.removeEventListener('modal-close-top', closeTopModal);
    };
  }, [closeTopModal]);

  const value = useMemo<ModalContextValue>(
    () => ({ openModal, closeModal, closeTopModal, hasModalOpen: modals.length > 0 }),
    [modals.length],
  );

  return (
    <ModalContext.Provider value={value}>
      {children}
      {rootRef.current &&
        ReactDOM.createPortal(
          <ModalRoot modals={modals} onCloseTop={closeTopModal} />,
          rootRef.current,
        )}
    </ModalContext.Provider>
  );
}

function ModalRoot({ modals, onCloseTop }: { modals: ModalContent[]; onCloseTop: () => void }) {
  /* 모달을 순서대로 렌더링합니다. 맨 위가 마지막 요소입니다. (스택 구조) */
  return (
    <>
      {modals.map((modal, idx) => (
        <ModalWrapper key={modal.id} id={modal.id} isTop={idx === modals.length - 1}>
          {modal.element}
        </ModalWrapper>
      ))}
    </>
  );
}

function ModalWrapper({
  children,
  id,
  isTop,
}: {
  children: React.ReactNode;
  id: string;
  isTop: boolean;
}) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape' && isTop) {
        const escEvent = new CustomEvent('modal-close-top');
        window.dispatchEvent(escEvent);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isTop]);

  return <div className="modalPortalWrapper">{children}</div>;
}

export function useModalContext() {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModalContext는 반드시 ModalProvider 안에서 사용해야 합니다.');
  return ctx;
}
