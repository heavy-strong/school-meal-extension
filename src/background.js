import { getMenu, getNextMenu } from "./getMenu";
import getYmd from "./getYmd";

const keys = ["office", "school", "level", "alarmTimes"];
/**
 * 기본 알림 시간
 * 아침: 그 전날 20:00
 * 점심: 12:00
 * 저녁: 17:50
 * 0 ~ 1440으로 표현
 */
const alarmTimes = [720, 1070, 1200];

/**
 * 현재 시간을 0 ~ 1440으로 불러옴
 */
function getCurrentHM() {
    const now = new Date();
    return now.getHours() * 60 + now.getMinutes();
}

/**
 * 다음 급식 알림
 */
function getNextMeal() {
    // chrome.storage.sync.get(keys, setting => {});
    // // fetch(`http://jrady721.cafe24.com/api/nextmeal/${setting.}/school/D100000282/level/4`).then(response => {
    // //     response.json().then(value => {
    // //         getNextMenu(result => {
    // //             console.log(result);
    // //         });
    // //     });
    // // });
    const mealTime = {
        breakfast: "다음날 아침",
        lunch: "점심",
        dinner: "저녁"
    };
    getNextMenu(data => {
        chrome.notifications.clear(data.type, () => {
            let menuStr = "";
            data.menus.forEach((menu, index) => {
                if (index > 0 && index % 2 === 0) {
                    menuStr += "\n";
                } else {
                    menuStr += " ";
                }
                menuStr += "· " + menu;
            });
            chrome.notifications.create(data.type, {
                title: mealTime[data.type],
                type: "basic",
                iconUrl: "icon/icon48.png",
                message: menuStr
            });
            console.log(data);
        });
    });
    // 하루 타임아웃
    setTimeout(getNextMeal, 24 * 60 * 60 * 1000);
}

function alarm(times) {
    const current = getCurrentHM();
    times.forEach(value => {
        const diff = (value + 1440 - current) % 1440;
        console.log("wait " + diff * 60 * 1000);
        setTimeout(getNextMeal, diff * 60 * 1000);
    });
    // setTimeout(getNextMeal, 500);
}

// 처음 설치 후 실행
chrome.runtime.onInstalled.addListener(function() {});

// 백그라운드
chrome.storage.sync.get(keys, function(setting) {
    // 설정이 존재하지 않으면 기본설정으로 설정하고 로드함
    if (!setting.level) {
        let option = {
            office: "dge.go.kr",
            school: "D100000282",
            level: "4",
            date: getYmd(new Date()),
            alarmTimes: alarmTimes
        };
        // 설정
        chrome.storage.sync.set(option, function() {
            // 모두 세팅을 마쳤을 때
            getMenu(getYmd(new Date()), (time, data) => {
                chrome.storage.sync.set(
                    {
                        [time]: data
                    },
                    function() {
                        console.log("set sync data");
                    }
                );
            });
            alarm(option.alarmTimes);
        });
    } else if (!setting.alarmTimes) {
        setting.alarmTimes = alarmTimes;
        chrome.storage.sync.set(setting);
        alarm(setting.alarmTimes);
    }
    if (setting.level) {
        // get Menu
        getMenu(getYmd(new Date()), (time, data) => {
            chrome.storage.sync.set(
                {
                    [time]: data
                },
                function() {
                    console.log("set sync data");
                }
            );
        });
        alarm(setting.alarmTimes);
    }
});
