const keys = ['office', 'school', 'level']
const baseURL = 'http://jrady721.cafe24.com'

// 처음 설치 후 실행
chrome.runtime.onInstalled.addListener(function () {

})

// 백그라운드
chrome.storage.sync.get(keys, function (setting) {
    // 설정이 존재하지 않으면 기본설정으로 설정하고 로드함
    if (!setting.level) {
        option = { office: 'dge.go.kr', school: 'D100000282', level: '4', date: getYmd(new Date()) }
        // 설정
        chrome.storage.sync.set(option, function () {
            // 모두 세팅을 마쳤을 때
            chrome.storage.sync.get(keys, function (setting) {
                getMenu(getYmd(new Date()), setting)
            })
        })
    } else {
        // get Menu
        getMenu(getYmd(new Date()), setting)
    }
})

// 급식 메뉴 가져오기
function getMenu(ymd, setting) {
    // 아침
    $.get(`${baseURL}/api/meal/${ymd}/type/1/office/${setting.office}/school/${setting.school}/level/${setting.level}`, function (data) {
        let meal = JSON.parse(data)
        let breakfast = ''
        if (meal.menus) {
            meal.menus.forEach(element => {
                breakfast += '<li>' + element + '</li>'
            })
        }
        if (breakfast === '') {
            breakfast = '메뉴가 없습니다.'
        }
        chrome.storage.sync.set({ breakfast: breakfast }, function () {
            console.log('set sync data')
        })
    })

    // 점심
    $.get(`${baseURL}/api/meal/${ymd}/type/2/office/${setting.office}/school/${setting.school}/level/${setting.level}`, function (data) {
        let meal = JSON.parse(data)
        let lunch = ''
        if (meal.menus) {

            meal.menus.forEach(element => {
                lunch += '<li>' + element + '</li>'
            })
        }
        if (lunch === '') {
            lunch = '메뉴가 없습니다.'
        }
        chrome.storage.sync.set({ lunch: lunch }, function () {
            console.log('set sync data')
        })
    })

    // 저녁
    $.get(`${baseURL}/api/meal/${ymd}/type/3/office/${setting.office}/school/${setting.school}/level/${setting.level}`, function (data) {
        let meal = JSON.parse(data)
        let dinner = ''
        if (meal.menus) {

            meal.menus.forEach(element => {
                dinner += '<li>' + element + '</li>'
            })
        }
        if (dinner === '') {
            dinner = '메뉴가 없습니다.'
        }
        chrome.storage.sync.set({ dinner: dinner }, function () {
            console.log('set sync data')
        })
    })
}

// yyyy.mm.dd 포맷으로 변경
function getYmd(date) {
    let y = date.getFullYear().toString()
    let m = (date.getMonth() + 1).toString()
    let d = date.getDate().toString()

    if (d.length === 1) {
        d = '0' + d
    }
    if (m.length === 1) {
        m = '0' + m
    }

    return y + '.' + m + '.' + d
}