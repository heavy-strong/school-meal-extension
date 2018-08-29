chrome.runtime.onInstalled.addListener(function () {
    $(function () {
        let keys = ['office', 'school', 'level'];
        chrome.storage.local.get(keys, function (data) {
            if (!data.office) {
                console.log('1');
                let setting = [{office: 'dge.go.kr'}, {school: 'D100000282'}, {level: '4'}]
                setting.forEach(function (data2) {
                    chrome.storage.local.set(data2, function () {
                        getMenu(getYmd(new Date()), data)
                    })
                });
            } else {
                getMenu(getYmd(new Date()), data)
            }
        })
    })
});

function getMenu(ymd, data) {
    console.log(data);
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
        chrome.storage.local.set({breakfast: breakfast}, function () {
            console.log('set localstorage data!');
        });
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
        chrome.storage.local.set({lunch: lunch}, function () {
            console.log('set localstorage data!');
        });
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
        chrome.storage.local.set({dinner: dinner}, function () {
            console.log('set localstorage data!');
        });
    })
}

function getYmd(date) {
    let y = date.getFullYear().toString();
    let m = (date.getMonth() + 1).toString();
    let d = date.getDate().toString();
    (d.length === 1) && (d = '0' + d);
    (m.length === 1) && (m = '0' + m);
    return y + '.' + m + '.' + d;
}