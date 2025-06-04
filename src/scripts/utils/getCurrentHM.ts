/**
 * 현재 시간을 0 ~ 1440으로 불러옴
 */
export function getCurrentHM() {
  const now = new Date();
  return now.getHours() * 60 + now.getMinutes();
}
