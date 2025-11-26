import React from 'react';
import styles from './LandingImage.module.scss';

interface Props {
  pc: string;
  tablet: string;
  mobile: string;
  alt?: string;
  className?: string;
}

export default function LandingImage({ pc, tablet, mobile, alt, className }: Props) {
  return (
    <picture className={className}>
      <source media="(min-width: 1024px)" srcSet={pc} />
      <source media="(min-width: 768px)" srcSet={tablet} />
      <img src={mobile} alt={alt} className={styles.img} />
    </picture>
  );
}
