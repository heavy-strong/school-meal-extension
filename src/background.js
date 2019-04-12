import getMenu from "./getMenu";
import getYmd from "./getYmd";

const keys = ["office", "school", "level"];

// 처음 설치 후 실행
chrome.runtime.onInstalled.addListener(function() {});

// 백그라운드
chrome.storage.sync.get(keys, function(setting) {
    // 설정이 존재하지 않으면 기본설정으로 설정하고 로드함
    if (!setting.level) {
        option = {
            office: "dge.go.kr",
            school: "D100000282",
            level: "4",
            date: getYmd(new Date())
        };
        // 설정
        chrome.storage.sync.set(option, function() {
            // 모두 세팅을 마쳤을 때
            chrome.storage.sync.get(keys, function(setting) {
                getMenu(getYmd(new Date()), setting, (time, data) => {
                    chrome.storage.sync.set(
                        {
                            [time]: data
                        },
                        function() {
                            console.log("set sync data");
                        }
                    );
                });
            });
        });
    } else {
        // get Menu
        getMenu(getYmd(new Date()), setting, (time, data) => {
            chrome.storage.sync.set(
                {
                    [time]: data
                },
                function() {
                    console.log("set sync data");
                }
            );
        });
    }
});
