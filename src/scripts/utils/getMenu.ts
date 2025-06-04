import { baseURL } from '@/scripts/values';

const mealTypes = ['breakfast', 'lunch', 'dinner'];

// 급식 메뉴 가져오기
export function getMenu(ymd: string, callback: (type: string, value: any) => void, force: boolean = false) {
  console.debug('YMD', ymd);

  chrome.storage.sync.get((data) => {
    console.debug('SYNC DATA', data);
    if (!force && data.date === ymd && data.breakfast) {
      mealTypes.forEach((type) => {
        callback(type, data[type]);
      });
    } else {
      console.debug('FORCE LOAD');
      mealTypes.forEach(async (t, idx) => {
        try {
          const meals = await fetch(
            `${baseURL}/api/meal/${ymd}/type/${idx + 1}/office/${data.office}/school/${data.school}/level/${data.level}`,
          );
          const meal = await meals.json();

          // meal data 초기화
          let mealData = '';
          if (meal.menus) {
            meal.menus.forEach((element: any) => {
              mealData += `<li>${element}</li>`;
            });
          }
          if (mealData === '') {
            mealData = '메뉴가 없습니다.';
          }
          callback(t, mealData);
        } catch (e) {
          callback(t, null);
        }
      });
    }
  });
}
