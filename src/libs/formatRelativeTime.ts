/**
 * 주어진 날짜 기준으로 상대 시간을 문자열로 변환합니다.
 * @param pastDate Date | number | string (Date로 변환 가능한 값)
 * @returns "00초 전", "00분 전", "00시간 전" 등
 */
export function formatRelativeTime(pastDate: Date | string | number) {
  const past = new Date(pastDate).getTime();
  const now = Date.now();
  const diff = now - past; // ms 단위 차이

  const sec = Math.floor(diff / 1000);
  const min = Math.floor(sec / 60);
  const hour = Math.floor(min / 60);
  const day = Math.floor(hour / 24);
  const month = Math.floor(day / 31); // 31일 기준
  const year = Math.floor(month / 12); // 12개월 기준

  if (sec < 60) return `${String(sec).padStart(2, '0')}초 전`;
  if (min < 60) return `${String(min).padStart(2, '0')}분 전`;
  if (hour < 24) return `${String(hour).padStart(2, '0')}시간 전`;
  if (day < 31) return `${String(day).padStart(2, '0')}일 전`;
  if (month < 12) return `${String(month).padStart(2, '0')}개월 전`;
  return `${String(year).padStart(2, '0')}년 전`;
}

// formatRelativeTime('2025-01-28T22:00:00');
// "01시간 전"

// formatRelativeTime(Date.now() - 40 * 1000);
// "40초 전"

// formatRelativeTime(Date.now() - 10 * 24 * 60 * 60 * 1000);
// "10일 전"

// formatRelativeTime(Date.now() - 400 * 24 * 60 * 60 * 1000);
