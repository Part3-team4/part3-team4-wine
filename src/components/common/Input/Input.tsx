import style from '@/components/common/Input/Input.module.scss';
import clsx from 'clsx';
import React, { ComponentPropsWithRef } from 'react';

/**
 * Input 컴포넌트에 전달할 수 있는 모든 props 타입.
 * HTML 기본 input 속성들을 모두 상속하고,
 * className을 자유롭게 추가할 수 있습니다.
 */
export type InputProps = ComponentPropsWithRef<'input'> & {
  className?: string;
};

/**
 * 재사용 가능한 기본 Input 컴포넌트.
 * - 기본 스타일을 유지하면서
 * - 추가로 전달된 className을 clsx로 병합합니다.
 */
export default function Input({ className, ...props }: InputProps) {
  return <input {...props} className={clsx(style.input, className)} />;
}
