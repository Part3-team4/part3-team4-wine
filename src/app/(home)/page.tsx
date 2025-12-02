import Style from '@/app/(home)/page.module.scss';
import Button from '@/components/common/Button/Button';
import ResponsiveImage from '@/components/common/ResponsiveImage/ResponsiveImage';
import {
  landingMainBannerLg,
  landingMainBannerMd,
  landingMainBannerSm,
  landingConImg01Lg,
  landingConImg01Sm,
  landingConImg02Lg,
  landingConImg02Sm,
  landingConImg03Lg,
  landingConImg03Sm,
} from '@/assets/images/landing/index';
import Link from 'next/link';

export default function Home() {
  return (
    <main className={Style.mainContent}>
      {/* 메인 배너 */}
      <div className={Style.mainBanner}>
        <ResponsiveImage
          mobile={landingMainBannerSm}
          tablet={landingMainBannerMd}
          desktop={landingMainBannerLg}
          alt="와인 메인 배너 - 한 곳에서 관리하는 나만의 와인창고"
          className={Style.bannerImage}
          priority
        />
      </div>

      {/* 콘텐츠 */}
      <div className={Style.mainContFrame}>
        <ResponsiveImage
          mobile={landingConImg01Sm}
          desktop={landingConImg01Lg}
          alt="매달 새롭게 만나는 와인 추천 콘텐츠"
          className={Style.contentImage}
        />
        <ResponsiveImage
          mobile={landingConImg02Sm}
          desktop={landingConImg02Lg}
          alt="매달 새롭게 만나는 와인 추천 콘텐츠"
          className={Style.contentImage}
        />
        <ResponsiveImage
          mobile={landingConImg03Sm}
          desktop={landingConImg03Lg}
          alt="매달 새롭게 만나는 와인 추천 콘텐츠"
          className={Style.contentImage}
        />
      </div>

      {/* 하단 버튼 */}
      <Link href="/wines">
        <Button variant="filled" size="medium" rounded className={Style.mainBtn}>
          와인 보러가기
        </Button>
      </Link>
    </main>
  );
}
