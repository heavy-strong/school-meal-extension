const times = ["breakfast", "lunch", "dinner"];
const baseURL = "http://jrady721.cafe24.com";

export function getNextMenu(callback) {
    chrome.storage.sync.get(async result => {
        const data = await fetch(
            `${baseURL}/api/nextmeal/${result.office}/school/${result.school}/level/${result.level}`
        );
        const meal = await data.json();
        callback(meal);
    });
}

// 급식 메뉴 가져오기
export function getMenu(ymd, callback) {
    console.log(ymd);
    chrome.storage.sync.get(result => {
        if (result.date === ymd && result.breakfast) {
            times.forEach(t => {
                callback(t, result[t]);
            });
        } else {
            times.forEach(async (t, idx) => {
                try {
                    const data = await fetch(
                        `${baseURL}/api/meal/${ymd}/type/${idx + 1}/office/${result.office}/school/${
                            result.school
                        }/level/${result.level}`
                    );
                    const meal = await data.json();
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
                } catch (e) {
                    callback(t, null);
                }
            });
        }
    });
}
