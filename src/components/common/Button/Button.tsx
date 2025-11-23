import styles from '@/components/common/Button/Button.module.scss';
import clsx from 'clsx';
import React, { ComponentPropsWithRef, forwardRef } from 'react';

/**
 * Button 컴포넌트의 props 타입 정의
 *
 * @typedef {Object} ButtonProps
 * @property {('filled' | 'tinted' | 'outlined' | 'subtle')} [variant='filled'] - 버튼 스타일 변형
 * @property {('xsmall' | 'small' | 'medium' | 'large' | 'xlarge')} [size='medium'] - 버튼 크기
 * @property {React.ReactNode} [icon] - 버튼 내부에 표시할 아이콘
 * @property {boolean} [fullWidth=false] - true일 경우 버튼이 부모 요소의 전체 너비를 차지
 * @property {boolean} [rounded=false] - true일 경우 버튼 모서리가 둥글게 표시
 */

/**
 * variant 사용 가이드:
 *
 * - filled: 주요 액션 (가입하기, 저장, 제출 등)
 *   <Button variant="filled">가입하기</Button>
 *
 * - tinted: 보조 액션 (초기화, 되돌리기 등)
 *   <Button variant="tinted">초기화</Button>
 *
 * - outlined: 중립적 액션 (취소, 닫기 등)
 *   <Button variant="outlined">취소</Button>
 *
 * - subtle: 소셜 로그인, 약한 강조
 *   <Button variant="subtle">kakao로 시작하기</Button>
 */

/**
 * 재사용 가능한 Button 컴포넌트
 *
 * @component
 *
 * @description
 * 다양한 스타일, 크기, 옵션을 지원하는 범용 버튼 컴포넌트입니다.
 * variant, size, icon, fullWidth, rounded 등의 prop을 조합하여 원하는 스타일의 버튼을 만들 수 있습니다.
 *
 * @example
 * // 기본 사용
 * <Button>클릭하세요</Button>
 *
 * @example
 * // subtle (large) - 카카오로 시작하기
 * <Button
 *   variant="subtle"
 *   size="large"
 *   icon={<Kakao />}
 *   fullWidth
 * >
 *   kakao로 시작하기
 * </Button>
 *
 * @example
 * // filled (medium) - 가입하기
 * <Button
 *   variant="filled"
 *   size="medium"
 *   fullWidth
 * >
 *   가입하기
 * </Button>
 *
 * @example
 * // filled : disabled (비활성화)
 * <Button
 *   variant="filled"
 *   size="medium"
 *   fullWidth
 *   disabled
 * >
 *   가입하기
 * </Button>
 *
 * @example
 * // filled (medium) - 둥글게
 * <Button
 *   variant="filled"
 *   size="medium"
 *   rounded
 * >
 *   와인 보러가기
 * </Button>
 *
 * @example
 * // outlined (small) - 아이콘만
 * <Button
 *   variant="outlined"
 *   size="small"
 *   icon={<span><Filter/></span>}
 * />
 *
 * @example
 * // onClick 이벤트 핸들러 사용
 * <Button onClick={() => alert('클릭!')}>
 *   클릭하세요
 * </Button>
 *
 * @example
 * // 폼 제출 버튼
 * <form onSubmit={handleSubmit}>
 *   <Button type="submit" variant="filled">
 *     제출
 *   </Button>
 * </form>
 *
 * @example
 * // 커스텀 className 추가
 * <Button className="my-custom-class">
 *   커스텀 스타일 버튼
 * </Button>
 */

type ButtonProps = ComponentPropsWithRef<'button'> & {
  variant?: 'filled' | 'tinted' | 'outlined' | 'subtle';
  size?: 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge';
  icon?: React.ReactNode;
  fullWidth?: boolean;
  rounded?: boolean;
};

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'filled',
      size = 'medium',
      icon,
      fullWidth = false,
      rounded = false,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        className={clsx(
          styles.button,
          styles[variant],
          styles[size],
          {
            [styles.fullWidth]: fullWidth,
            [styles.rounded]: rounded,
          },
          className,
        )}
        {...props}
      >
        {icon && <span className={styles.icon}>{icon}</span>}
        {children}
      </button>
    );
  },
);

Button.displayName = 'Button';

export default Button;
