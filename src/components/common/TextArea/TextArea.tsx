import styles from '@/components/common/TextArea/TextArea.module.scss';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, forwardRef, useState } from 'react';

/**
 * TextArea 컴포넌트의 props 타입 정의
 *
 * @typedef {Object} TextAreaProps
 * @property {string} [label] - textarea 위에 표시될 라벨 텍스트
 * @property {string} [helperText] - textarea 아래에 표시될 도움말 또는 에러 메시지
 * @property {boolean} [error=false] - true일 경우 에러 스타일 적용
 * @property {number} [maxLength=500] - 최대 입력 가능한 글자 수
 * @property {boolean} [showCount=true] - 글자 수 표시 여부
 */
type TextAreaProps = ComponentPropsWithRef<'textarea'> & {
  label?: string;
  helperText?: string;
  error?: boolean;
  maxLength?: number;
  showCount?: boolean;
};

/**
 * 재사용 가능한 TextArea 컴포넌트
 *
 * @component
 *
 * @description
 * label, helperText, error 상태, 글자 수 제한을 지원하는 textarea 컴포넌트입니다.
 * 높이는 120px 고정, 너비는 부모 요소 전체, 내용이 길어지면 스크롤이 생성됩니다.
 *
 * @example
 * // 기본 사용 - 와인 후기 작성
 * const [review, setReview] = useState('');
 *
 * <TextArea
 *   label="후기"
 *   placeholder="후기를 작성해 주세요"
 *   value={review}
 *   onChange={(e) => setReview(e.target.value)}
 * />
 *
 * @example
 * // 에러 상태
 * const [comment, setComment] = useState('');
 * const [error, setError] = useState(false);
 *
 * const handleSubmit = () => {
 *   if (comment.length < 10) {
 *     setError(true);
 *     return;
 *   }
 *   // 제출 로직...
 * };
 *
 * <TextArea
 *   label="코멘트"
 *   placeholder="최소 10자 이상 입력해주세요"
 *   value={comment}
 *   onChange={(e) => {
 *     setComment(e.target.value);
 *     setError(false);
 *   }}
 *   error={error}
 *   helperText={error ? '최소 10자 이상 입력해주세요' : ''}
 * />
 *
 * @example
 * // 글자 수 표시 숨김
 * <TextArea
 *   label="설명"
 *   placeholder="설명을 입력하세요"
 *   value={description}
 *   onChange={(e) => setDescription(e.target.value)}
 *   showCount={false}
 * />
 *
 * @example
 * // 비활성화 상태
 * <TextArea
 *   label="후기"
 *   value="이미 작성된 후기입니다."
 *   disabled
 * />
 *
 */
const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      label,
      helperText,
      error = false,
      maxLength = 500,
      showCount = true,
      className,
      value,
      ...props
    },
    ref,
  ) => {
    // 현재 글자 수
    const currentLength = value?.toString().length || 0;

    return (
      <div className={styles.textareaContainer}>
        {/* 라벨과 글자 수 표시 */}
        {(label || showCount) && (
          <div className={styles.header}>
            {label && <label className={styles.label}>{label}</label>}
            {showCount && (
              <span className={styles.counter}>
                {currentLength}/{maxLength}
              </span>
            )}
          </div>
        )}

        {/* TextArea */}
        <textarea
          ref={ref}
          className={clsx(
            styles.textarea,
            {
              [styles.error]: error,
            },
            className,
          )}
          value={value}
          maxLength={maxLength}
          {...props}
        />

        {/* 도움말 또는 에러 메시지 */}
        {helperText && (
          <p
            className={clsx(styles.helperText, {
              [styles.errorText]: error,
            })}
          >
            {helperText}
          </p>
        )}
      </div>
    );
  },
);

TextArea.displayName = 'TextArea';

export default TextArea;
