import { getNextMenu } from "@/scripts/utils/getNextMenu";

/**
 * 다음 급식 알림
 */
export function getNextMeal() {
  const mealTime = {
    breakfast: "다음날 아침",
    lunch: "점심",
    dinner: "저녁",
  };
  getNextMenu((data: any) => {
    chrome.notifications.clear(data.type, () => {
      let menuStr = "";
      data.menus.forEach((menu: string, index: number) => {
        if (index > 0 && index % 2 === 0) {
          menuStr += "\n";
        } else {
          menuStr += " ";
        }
        menuStr += "· " + menu;
      });
      chrome.notifications.create(data.type, {
        title: mealTime[data.type as 'breakfast' | 'lunch' | 'dinner'],
        type: "basic",
        iconUrl: "icon/icon48.png",
        message: menuStr,
      });
      console.debug('NOTIFICATION DATA', data);
    });
  });
  // 하루 타임아웃
  setTimeout(getNextMeal, 24 * 60 * 60 * 1000);
}
