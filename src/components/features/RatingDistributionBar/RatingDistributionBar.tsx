/**
 * 평점 분포를 막대 그래프로 시각화하는 컴포넌트.
 *
 * @component
 *
 * @description
 * 1점부터 5점까지의 평점 데이터를 받아 각 점수별 비율(%)을 막대 형태로 보여줍니다.
 * 퍼센트 데이터는 0~100 사이의 값을 기준으로 막대의 너비가 결정됩니다.
 *
 * @example
 * // 기본 사용
 * const data = [
 *   { score: 5, value: 80 },
 *   { score: 4, value: 70 },
 *   { score: 3, value: 25 },
 *   { score: 2, value: 10 },
 *   { score: 1, value: 2 },
 * ];
 *
 * <RatingDistributionBar data={data} />
 *
 * @example
 * // API로 받은 개수를 퍼센트로 변환하여 사용하는 경우
 * const raw = [
 *   { score: 5, value: 103 },
 *   { score: 4, value: 80 },
 *   { score: 3, value: 15 },
 *   { score: 2, value: 7 },
 *   { score: 1, value: 2 },
 * ];
 *
 * const total = raw.reduce((acc, v) => acc + v.value, 0);
 * const percentData = raw.map((item) => ({
 *   ...item,
 *   value: Math.round((item.value / total) * 100),
 * }));
 *
 * <RatingDistributionBar data={percentData} />
 */

import styles from './RatingDistributionBar.module.scss';

interface RatingDistributionBarProps {
  data: {
    score: number;
    value: number;
  }[];
}

export default function RatingDistributionBar({ data }: RatingDistributionBarProps) {
  return (
    <div className={styles.rating}>
      {data.map(({ score, value }) => (
        <div key={score} className={styles.row}>
          <span className={styles.label}>{score}점</span>
          <div className={styles.barBackground}>
            <div className={styles.barFill} style={{ width: `${value}%` }} />
          </div>
        </div>
      ))}
    </div>
  );
}
