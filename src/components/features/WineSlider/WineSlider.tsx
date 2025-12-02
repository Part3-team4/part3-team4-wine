import dynamic from 'next/dynamic';
import RecommendWineCard from '../WineCard/RecommendWineCard';
import styles from './WineSlider.module.scss';

interface RecommendWine {
  id: number;
  avgRating: number;
  image: string;
  name: string;
}

interface WineSliderProps {
  data: RecommendWine[];
}

const Slider = dynamic(() => import('react-slick'), { ssr: false });

export default function WineSlider({ data }: WineSliderProps) {
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
      {data.map((wine) => (
        <div key={wine.id}>
          <RecommendWineCard
            id={wine.id}
            name={wine.name}
            rating={wine.avgRating}
            image={wine.image}
          />
        </div>
      ))}
    </Slider>
  );
}
