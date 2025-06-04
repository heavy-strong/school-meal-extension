import { getCurrentHM } from '@/scripts/utils/getCurrentHM';
import { getNextMeal } from '@/scripts/utils/getNextMeal';

export function alarm(times: number[]) {
  const current = getCurrentHM();
  times.forEach((value) => {
    const diff = (value + 1440 - current) % 1440;
    console.debug('wait ' + diff * 60 * 1000);
    setTimeout(getNextMeal, diff * 60 * 1000);
  });
  // setTimeout(getNextMeal, 500);
}