'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import Style from '@/app/(home)/page.module.scss';
import Button from '@/components/common/Button/Button';

// 이미지 import
import landingMainBannerLg from '@/assets/images/landing/lg_01.png';
import landingMainBannerMd from '@/assets/images/landing/md_01.png';
import landingMainBannerSm from '@/assets/images/landing/sm_01.png';
import landingConImg01Lg from '@/assets/images/landing/lg_02.png';
import landingConImg01Sm from '@/assets/images/landing/sm_02.png';
import landingConImg02Lg from '@/assets/images/landing/lg_03.png';
import landingConImg02Sm from '@/assets/images/landing/sm_03.png';
import landingConImg03Lg from '@/assets/images/landing/lg_04.png';
import landingConImg03Sm from '@/assets/images/landing/sm_04.png';

export default function Home() {
  const [screenSize, setScreenSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;

      if (width >= 1024) {
        setScreenSize('desktop');
      } else if (width >= 768) {
        setScreenSize('tablet');
      } else {
        setScreenSize('mobile');
      }
    };

    // 초기 실행
    handleResize();

    // Debounce: 리사이즈 이벤트 최적화
    let timeoutId: NodeJS.Timeout;
    const debouncedResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(handleResize, 150);
    };

    window.addEventListener('resize', debouncedResize);

    return () => {
      window.removeEventListener('resize', debouncedResize);
      clearTimeout(timeoutId);
    };
  }, []);

  // 화면 크기별 이미지 선택
  const getBannerImage = () => {
    if (screenSize === 'mobile') return landingMainBannerSm;
    if (screenSize === 'tablet') return landingMainBannerMd;
    return landingMainBannerLg;
  };

  const getSection01Image = () => {
    return screenSize === 'mobile' ? landingConImg01Sm : landingConImg01Lg;
  };

  const getSection02Image = () => {
    return screenSize === 'mobile' ? landingConImg02Sm : landingConImg02Lg;
  };

  const getSection03Image = () => {
    return screenSize === 'mobile' ? landingConImg03Sm : landingConImg03Lg;
  };

  return (
    <>
      {/* 랜딩페이지 컨텐츠 */}
      <main className={Style.mainContent}>
        {/* 메인 배너 */}
        <div className={Style.mainBanner}>
          <Image
            src={getBannerImage()}
            alt="와인 메인 배너 - 한 곳에서 관리하는 나만의 와인창고"
            className={Style.bannerImage}
            priority
          />
        </div>

        {/* 콘텐츠 */}
        <div className={Style.mainContFrame}>
          <Image
            src={getSection01Image()}
            alt="매달 새롭게 만나는 와인 추천 콘텐츠"
            className={Style.contentImage}
          />
          <Image
            src={getSection02Image()}
            alt="매달 새롭게 만나는 와인 추천 콘텐츠"
            className={Style.contentImage}
          />
          <Image
            src={getSection03Image()}
            alt="매달 새롭게 만나는 와인 추천 콘텐츠"
            className={Style.contentImage}
          />
        </div>
        {/* 하단 버튼 */}
        <Button variant="filled" size="medium" rounded className={Style.mainBtn}>
          와인 보러가기
        </Button>
      </main>
    </>
  );
}
