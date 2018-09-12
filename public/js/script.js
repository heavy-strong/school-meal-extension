// default
const keys = ['office', 'school', 'level']
const baseURL = 'http://jrady721.cafe24.com'

// 오늘
let date = new Date()

$(function () {
    // 설정된 오늘의 급식 불러오기
    chrome.storage.sync.get(['breakfast', 'lunch', 'dinner', 'date'], function (result) {
        chrome.runtime.getBackgroundPage(e => {
            // 만약 현재 날짜의 지금날짜가 동일하다면 로컬에서 불러오고 아니면 다시 로드한다.
            if (result.date === e.getYmd(new Date())) {
                $('#date').html(result.date)
                $('#breakfast').html(result.breakfast)
                $('#lunch').html(result.lunch)
                $('#dinner').html(result.dinner)
            } else {
                $('#date').html(e.getYmd(new Date()))
                getMenu(e.getYmd(new Date()))
            }
        })
    })

    // 설정 불러오기
    chrome.storage.sync.get(keys, function (data) {
        // 설정이 있을 떄만 설정에 저장
        if(data.level) {
            $('#office').val(data.office)
            $('#school').val(data.school)
            $(`#level-${data.level}`).attr('checked', true)
        } else {
            
        }
    })
})

// 오늘
$('#btn-today').click(function () {
    loading()

    date = new Date()
    chrome.runtime.getBackgroundPage(e => {
        $('#date').html(e.getYmd(date))
        getMenu(e.getYmd(date))
    })
})

// 내일
$('#btn-next').click(function () {
    loading()

    chrome.runtime.getBackgroundPage(e => {
        date.setDate(date.getDate() + 1)
        $('#date').html(e.getYmd(date))
        getMenu(e.getYmd(date))
    })
})

// 이전날 
$('#btn-prev').click(function () {
    loading()

    chrome.runtime.getBackgroundPage(e => {
        date.setDate(date.getDate() - 1)
        $('#date').html(e.getYmd(date))
        getMenu(e.getYmd(date))
    })
})

// loading...
function loading() {
    $('#breakfast').html('로딩중...')
    $('#lunch').html('로딩중...')
    $('#dinner').html('로딩중...')
}

// 급식 불러오기
function getMenu(ymd) {
    chrome.storage.local.get(keys, function (data) {
        $.get(`${baseURL}/api/meal/${ymd}/type/1/office/${data.office}/school/${data.school}/level/${data.level}`, function (data) {
            let meal = JSON.parse(data)
            let breakfast = '<ul>'
            if (meal.menus) {
                meal.menus.forEach(element => {
                    breakfast += '<li>' + element + '</li>'
                })
            }
            breakfast += '</ul>'
            if (breakfast === '<ul></ul>') {
                breakfast = '메뉴가 없습니다.'
            }
            $('#breakfast').html(breakfast)
        })

        $.get(`${baseURL}/api/meal/${ymd}/type/2/office/${data.office}/school/${data.school}/level/${data.level}`, function (data) {
            let meal = JSON.parse(data)
            let lunch = '<ul>'
            if (meal.menus) {
                meal.menus.forEach(element => {
                    lunch += '<li>' + element + '</li>'
                })
            }
            lunch += '</ul>'
            if (lunch === '<ul></ul>') {
                lunch = '메뉴가 없습니다.'
            }
            $('#lunch').html(lunch)
        })

        $.get(`${baseURL}/api/meal/${ymd}/type/3/office/${data.office}/school/${data.school}/level/${data.level}`, function (data) {
            let meal = JSON.parse(data)
            let dinner = '<ul>'
            if (meal.menus) {
                meal.menus.forEach(element => {
                    dinner += '<li>' + element + '</li>'
                })
            }
            dinner += '</ul>'
            if (dinner === '<ul></ul>') {
                dinner = '메뉴가 없습니다.'
            }
            $('#dinner').html(dinner)
        })
    })
}
// setting save-btn
$(document).on('click', '#ok', function () {
    console.log('1')
    let office = $('#office').val()
    let school = $('#school').val()
    let level = $('input[name=level]:checked').val()
    let setting = [{ office: office }, { school: school }, { level: level }]

    chrome.storage.local.set(setting, function () {
        // console.log(data)
    })

    chrome.storage.local.get(keys, function (data) {
        chrome.runtime.getBackgroundPage(e => {
            e.getMenu(e.getYmd(new Date()), data)

            alert('저장되었습니다!')
            location.href = '../index.html'
        })
    })
})

// 취소
$(document).on('click', '#cancel', function () {
    location.href = '../index.html'
})

// 학교 검색
$(document).on('click', '#search', function () {
    let url = 'https://www.meatwatch.go.kr/biz/bm/sel/schoolListPopup.do'
    window.open(url, '학교코드 검색', 'height=400, width=500')
})