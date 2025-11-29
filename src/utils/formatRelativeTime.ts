/**
 * 주어진 날짜를 기준으로 현재 시각과의 차이를
 * 사람 친화적인 상대 시간 문자열로 변환합니다.
 *
 * 감성적인 규칙을 적용해 "방금 전", "어제"와 같은 표현을 포함합니다.
 *
 * 적용 규칙:
 * - 30초 미만 → "방금 전"
 * - 1분 미만 → "n초 전"
 * - 2분 미만 → "1분 전"
 * - 60분 미만 → "n분 전"
 * - 36시간 미만 → "n시간 전"
 * - 48시간 미만 → "어제"
 * - 31일 미만 → "n일 전"
 * - 12개월 미만 → "n개월 전"
 * - 그 이상 → "n년 전"
 *
 * @param {Date | string | number} pastDate
 *  상대 시간을 계산할 기준 날짜.
 *  - Date 객체
 *  - 날짜 문자열(ISO 포맷 등)
 *  - timestamp(정수)
 *
 * @returns {string}
 *  상대 시간 문자열 (예: "방금 전", "3시간 전", "2개월 전")
 *
 * @example
 * formatRelativeTime("2025-01-29T12:00:00Z");
 * // "3시간 전"
 *
 * @example
 * formatRelativeTime(Date.now() - 40 * 1000);
 * // "40초 전"
 *
 * 실제 사용방법
 *
 * import { formatRelativeTime } from '@/utils/formatRelativeTime';
 *
 * formatRelativeTime(시간);
 */

export function formatRelativeTime(pastDate: Date | string | number) {
  const past = new Date(pastDate).getTime();
  const now = Date.now();
  const diff = now - past;

  const sec = Math.floor(diff / 1000);
  const min = Math.floor(sec / 60);
  const hour = Math.floor(min / 60);
  const day = Math.floor(hour / 24);
  const month = Math.floor(day / 31);
  const year = Math.floor(month / 12);

  /* 감성 규칙 시작 */

  if (sec < 30) return '방금 전';
  if (sec < 60) return `${sec}초 전`;

  if (min < 2) return '1분 전';
  if (min < 60) return `${min}분 전`;

  if (hour < 36) return `${hour}시간 전`;
  if (hour < 48) return '어제';

  if (day < 31) return `${day}일 전`;
  if (month < 12) return `${month}개월 전`;

  return `${year}년 전`;
}
