import dynamic from 'next/dynamic';
import RecommendWineCard from '../WineCard/RecommendWineCard';
import styles from './WineSlider.module.scss';

const Slider = dynamic(() => import('react-slick'), { ssr: false });

export default function WineSlider() {
  const settings = {
    infinite: false,
    slidesToShow: 4.5,
    slidesToScroll: 1,
    swipeToSlide: true,
    arrows: true,
    dots: false,
    swipe: false,
    speed: 500,
  };

  return (
    <Slider {...settings} className={styles.wineSlider}>
      <RecommendWineCard id={1} name="ss" rating={2} />
      <RecommendWineCard id={1} name="ss" rating={2} />
      <RecommendWineCard id={1} name="ss" rating={2} />
      <RecommendWineCard id={1} name="ss" rating={2} />
      <RecommendWineCard id={1} name="ss" rating={2} />
      <RecommendWineCard id={1} name="ss" rating={2} />
    </Slider>
  );
}
