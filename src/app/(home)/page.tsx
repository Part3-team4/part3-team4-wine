import Style from '@/app/(home)/page.module.scss';
import Button from '@/components/common/Button/Button';

export default function Home() {
  return (
    <>
      <main className={Style.mainContent}>
        <div className={Style.mainBanner}>mainBanner</div>
        <div className={Style.mainContFrame}>
          <div className={Style.mainCont}>mainCont</div>
          <div className={Style.mainCont}>mainCont</div>
          <div className={Style.mainCont}>mainCont</div>
        </div>
        <Button variant="filled" size="medium" rounded className={Style.mainBtn}>
          와인 보러가기
        </Button>
      </main>
    </>
  );
}
