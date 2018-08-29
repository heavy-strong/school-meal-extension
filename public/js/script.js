let date = new Date();
let keys = ['office', 'school', 'level'];

$(function () {
    chrome.runtime.getBackgroundPage(e => {
        $('#date').html(e.getYmd(new Date()));
    })
    chrome.storage.local.get(['breakfast', 'lunch', 'dinner'], function (result) {
        $('#breakfast').html(result.breakfast)
        $('#lunch').html(result.lunch)
        $('#dinner').html(result.dinner)
    });

    chrome.storage.local.get(keys, function (data) {
        $('#office').val(data.office);
        $('#school').val(data.school);
        $(`#level-${data.level}`).attr('checked', true);
    })
})

$('#btn-today').click(function () {
    loading();

    chrome.runtime.getBackgroundPage(e => {
        $('#date').html(e.getYmd(new Date()));
        getMenu(e.getYmd(new Date()));
    })
})

$('#btn-next').click(function () {
    loading();

    chrome.runtime.getBackgroundPage(e => {
        date.setDate(date.getDate() + 1)
        $('#date').html(e.getYmd(date));
        getMenu(e.getYmd(date))
    })
})


$('#btn-prev').click(function () {
    loading();

    chrome.runtime.getBackgroundPage(e => {
        date.setDate(date.getDate() - 1)
        $('#date').html(e.getYmd(date));
        getMenu(e.getYmd(date))
    })
})

function loading() {
    $('#breakfast').html('로딩중...')
    $('#lunch').html('로딩중...')
    $('#dinner').html('로딩중...')
}

function getMenu(ymd) {
    chrome.storage.local.get(keys, function (data) {
        $.get(`http://jrady721.cafe24.com/api/meal/${ymd}/type/1/office/${data.office}/school/${data.school}/level/${data.level}`, function (data) {
            let meal = JSON.parse(data)
            let breakfast = '<ul>'
            if (meal.menus) {
                meal.menus.forEach(element => {
                    breakfast += '<li>' + element + '</li>'
                });
            }
            breakfast += '</ul>'
            if (breakfast === '<ul></ul>') {
                breakfast = '메뉴가 없습니다.';
            }
            $('#breakfast').html(breakfast)
        })

        $.get(`http://jrady721.cafe24.com/api/meal/${ymd}/type/2/office/${data.office}/school/${data.school}/level/${data.level}`, function (data) {
            let meal = JSON.parse(data)
            let lunch = '<ul>'
            if (meal.menus) {
                meal.menus.forEach(element => {
                    lunch += '<li>' + element + '</li>'
                });
            }
            lunch += '</ul>'
            if (lunch === '<ul></ul>') {
                lunch = '메뉴가 없습니다.';
            }
            $('#lunch').html(lunch)
        })

        $.get(`http://jrady721.cafe24.com/api/meal/${ymd}/type/3/office/${data.office}/school/${data.school}/level/${data.level}`, function (data) {
            let meal = JSON.parse(data)
            let dinner = '<ul>'
            if (meal.menus) {
                meal.menus.forEach(element => {
                    dinner += '<li>' + element + '</li>'
                });
            }
            dinner += '</ul>'
            if (dinner === '<ul></ul>') {
                dinner = '메뉴가 없습니다.';
            }
            $('#dinner').html(dinner)
        })
    })
}

$(document).on('click', '#ok', function () {
    let office = $('#office').val();
    let school = $('#school').val();
    let level = $('input[name=level]:checked').val();
    let setting = [{office: office}, {school: school}, {level: level}]
    setting.forEach(function (data) {
        chrome.storage.local.set(data, function () {
            // console.log(data);
        })
    });

    chrome.storage.local.get(keys, function (data) {
        chrome.runtime.getBackgroundPage(e => {
            e.getMenu(e.getYmd(new Date()), data);

            alert('저장되었습니다!');
            location.href = '../index.html';
        })
    })

})
$(document).on('click', '#cancel', function () {
    location.href = '../index.html';
})

$(document).on('click', '#search', function () {
    let url = 'https://www.meatwatch.go.kr/biz/bm/sel/schoolListPopup.do';
    window.open(url, '학교코드 검색', 'height=400, width=500');
})