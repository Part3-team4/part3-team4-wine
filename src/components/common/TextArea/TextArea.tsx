import styles from '@/components/common/TextArea/TextArea.module.scss';
import clsx from 'clsx';
import React, { ComponentPropsWithRef } from 'react';

/**
 * TextArea 컴포넌트의 Props 인터페이스
 */
interface TextAreaProps extends ComponentPropsWithRef<'textarea'> {
  /** 추가 CSS 클래스명 */
  className?: string;
}
/**
 * 재사용 가능한 TextArea 컴포넌트
 *
 * @component
 *
 * @description
 * 높이는 120px 고정, 너비는 부모 요소 전체, 내용이 길어지면 스크롤이 생성됩니다.
 *
 * @example
 * // 기본 사용 - 와인 후기 작성
 * const [review, setReview] = useState('');
 *
 * <TextArea
 *   placeholder="후기를 작성해 주세요"
 *   value={review}
 *   onChange={(e) => setReview(e.target.value)}
 * />
 *
 */
export default function TextArea({ className, ...props }: TextAreaProps) {
  return (
    <div className={styles.textareaContainer}>
      <textarea className={clsx(styles.textarea, className)} {...props} />
    </div>
  );
}
