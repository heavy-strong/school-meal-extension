const times = ["breakfast", "lunch", "dinner"];
const baseURL = "http://jrady721.cafe24.com";

// 급식 메뉴 가져오기
export default function getMenu(ymd, setting, callback) {
    console.log(ymd);
    chrome.storage.sync.get(["date", "breakfast", "lunch", "dinner"], result => {
        if (result.date === ymd) {
            times.forEach(t => {
                callback(t, result[t]);
            });
        } else {
            times.forEach((t, idx) => {
                fetch(
                    `${baseURL}/api/meal/${ymd}/type/${idx + 1}/office/${setting.office}/school/${
                        setting.school
                    }/level/${setting.level}`
                ).then(data => {
                    data.json().then(meal => {
                        let mealData = "";
                        if (meal.menus) {
                            meal.menus.forEach(element => {
                                mealData += `<li>${element}</li>`;
                            });
                        }
                        if (mealData === "") {
                            mealData = "메뉴가 없습니다.";
                        }
                        callback(t, mealData);
                    });
                });
            });
        }
    });
}
