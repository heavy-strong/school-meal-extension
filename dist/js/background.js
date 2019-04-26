/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _getMenu__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _getYmd__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);



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
    Object(_getMenu__WEBPACK_IMPORTED_MODULE_0__["getNextMenu"])(data => {
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
            date: Object(_getYmd__WEBPACK_IMPORTED_MODULE_1__["default"])(new Date()),
            alarmTimes: alarmTimes
        };
        // 설정
        chrome.storage.sync.set(option, function() {
            // 모두 세팅을 마쳤을 때
            Object(_getMenu__WEBPACK_IMPORTED_MODULE_0__["getMenu"])(Object(_getYmd__WEBPACK_IMPORTED_MODULE_1__["default"])(new Date()), (time, data) => {
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
        Object(_getMenu__WEBPACK_IMPORTED_MODULE_0__["getMenu"])(Object(_getYmd__WEBPACK_IMPORTED_MODULE_1__["default"])(new Date()), (time, data) => {
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


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getNextMenu", function() { return getNextMenu; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getMenu", function() { return getMenu; });
const times = ["breakfast", "lunch", "dinner"];
const baseURL = "http://jrady721.cafe24.com";

function getNextMenu(callback) {
    chrome.storage.sync.get(async result => {
        const data = await fetch(
            `${baseURL}/api/nextmeal/${result.office}/school/${result.school}/level/${result.level}`
        );
        const meal = await data.json();
        callback(meal);
    });
}

// 급식 메뉴 가져오기
function getMenu(ymd, callback) {
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


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return getYmd; });
// yyyy.mm.dd 포맷으로 변경
function getYmd(date) {
    let y = date.getFullYear().toString();
    let m = (date.getMonth() + 1).toString();
    let d = date.getDate().toString();

    if (d.length === 1) {
        d = "0" + d;
    }
    if (m.length === 1) {
        m = "0" + m;
    }

    return y + "." + m + "." + d;
}


/***/ })
/******/ ]);