// src/components/common/ResponsiveImage/ResponsiveImage.tsx
import type { StaticImageData } from 'next/image';

type ResponsiveImageProps = {
  mobile: StaticImageData;
  tablet?: StaticImageData;
  desktop: StaticImageData;
  alt: string;
  className?: string;
  priority?: boolean;
};

/**
 * 반응형 이미지 컴포넌트
 * - picture/source 태그 사용
 * - CSS media query로 자동 전환
 * - JS 상태 관리 불필요
 */
export default function ResponsiveImage({
  mobile,
  tablet,
  desktop,
  alt,
  className,
  priority = false,
}: ResponsiveImageProps) {
  return (
    <picture className={className}>
      {/* Desktop: 1024px 이상 */}
      <source media="(min-width: 1024px)" srcSet={desktop.src} />

      {/* Tablet: 768px ~ 1023px */}
      {tablet && <source media="(min-width: 768px)" srcSet={tablet.src} />}

      {/* Mobile: 767px 이하 (기본값) */}
      <img
        src={mobile.src}
        alt={alt}
        loading={priority ? undefined : 'lazy'}
        decoding="async"
        style={{ width: '100%', height: 'auto' }}
      />
    </picture>
  );
}
