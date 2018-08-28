let x = new Date();
let y = x.getFullYear().toString();
let m = (x.getMonth() + 1).toString();
let d = x.getDate().toString();
(d.length == 1) && (d = '0' + d);
(m.length == 1) && (m = '0' + m);
let yyyymmdd = y + '.' + m + '.' + d;

$(function () {
    $.get(`http://jrady721.cafe24.com/api/meal/${yyyymmdd}/type/1/office/dge.go.kr/school/D100000282/level/4`, function (data) {
        let meal = JSON.parse(data)
        let breakfast = '<ul>'
        meal.menus.forEach(element => {
            breakfast += '<li>' + element + '</li>'
        });
        breakfast += '</ul>'
        $('#breakfast').html(breakfast)
    })

    $.get(`http://jrady721.cafe24.com/api/meal/${yyyymmdd}/type/2/office/dge.go.kr/school/D100000282/level/4`, function (data) {
        let meal = JSON.parse(data)
        let lunch = '<ul>'
        meal.menus.forEach(element => {
            lunch += '<li>' + element + '</li>'
        });
        lunch += '</ul>'
        $('#lunch').html(lunch)
    })

    $.get(`http://jrady721.cafe24.com/api/meal/${yyyymmdd}/type/3/office/dge.go.kr/school/D100000282/level/4`, function (data) {
        let meal = JSON.parse(data)
        let dinner = '<ul>'
        meal.menus.forEach(element => {
            dinner += '<li>' + element + '</li>'
        });
        dinner += '</ul>'
        $('#dinner').html(dinner)
    })
})

$('#btn-next').click(function () {
    x.setDate(x.getDate() + 1)
    y = x.getFullYear().toString();
    m = (x.getMonth() + 1).toString();
    d = x.getDate().toString();
    (d.length == 1) && (d = '0' + d);
    (m.length == 1) && (m = '0' + m);
    yyyymmdd = y + '.' + m + '.' + d;

    $.get(`http://jrady721.cafe24.com/api/meal/${yyyymmdd}/type/1/office/dge.go.kr/school/D100000282/level/4`, function (data) {
        let meal = JSON.parse(data)
        let breakfast = '<ul>'
        meal.menus.forEach(element => {
            breakfast += '<li>' + element + '</li>'
        });
        breakfast += '</ul>'
        $('#breakfast').html(breakfast)
    })

    $.get(`http://jrady721.cafe24.com/api/meal/${yyyymmdd}/type/2/office/dge.go.kr/school/D100000282/level/4`, function (data) {
        let meal = JSON.parse(data)
        let lunch = '<ul>'
        meal.menus.forEach(element => {
            lunch += '<li>' + element + '</li>'
        });
        lunch += '</ul>'
        $('#lunch').html(lunch)
    })

    $.get(`http://jrady721.cafe24.com/api/meal/${yyyymmdd}/type/3/office/dge.go.kr/school/D100000282/level/4`, function (data) {
        let meal = JSON.parse(data)
        let dinner = '<ul>'
        meal.menus.forEach(element => {
            dinner += '<li>' + element + '</li>'
        });
        dinner += '</ul>'
        $('#dinner').html(dinner)
    })
})

$('#btn-prev').click(function () {
    x.setDate(x.getDate() - 1)
    y = x.getFullYear().toString();
    m = (x.getMonth() + 1).toString();
    d = x.getDate().toString();
    (d.length == 1) && (d = '0' + d);
    (m.length == 1) && (m = '0' + m);
    yyyymmdd = y + '.' + m + '.' + d;

    $.get(`http://jrady721.cafe24.com/api/meal/${yyyymmdd}/type/1/office/dge.go.kr/school/D100000282/level/4`, function (data) {
        let meal = JSON.parse(data)
        let breakfast = '<ul>'
        meal.menus.forEach(element => {
            breakfast += '<li>' + element + '</li>'
        });
        breakfast += '</ul>'
        $('#breakfast').html(breakfast)
    })

    $.get(`http://jrady721.cafe24.com/api/meal/${yyyymmdd}/type/2/office/dge.go.kr/school/D100000282/level/4`, function (data) {
        let meal = JSON.parse(data)
        let lunch = '<ul>'
        meal.menus.forEach(element => {
            lunch += '<li>' + element + '</li>'
        });
        lunch += '</ul>'
        $('#lunch').html(lunch)
    })

    $.get(`http://jrady721.cafe24.com/api/meal/${yyyymmdd}/type/3/office/dge.go.kr/school/D100000282/level/4`, function (data) {
        let meal = JSON.parse(data)
        let dinner = '<ul>'
        meal.menus.forEach(element => {
            dinner += '<li>' + element + '</li>'
        });
        dinner += '</ul>'
        $('#dinner').html(dinner)
    })
})

$('#btn-today').click(function () {
    x = new Date();
    y = x.getFullYear().toString();
    m = (x.getMonth() + 1).toString();
    d = x.getDate().toString();
    (d.length == 1) && (d = '0' + d);
    (m.length == 1) && (m = '0' + m);
    yyyymmdd = y + '.' + m + '.' + d;

    $.get(`http://jrady721.cafe24.com/api/meal/${yyyymmdd}/type/1/office/dge.go.kr/school/D100000282/level/4`, function (data) {
        let meal = JSON.parse(data)
        let breakfast = '<ul>'
        meal.menus.forEach(element => {
            breakfast += '<li>' + element + '</li>'
        });
        breakfast += '</ul>'
        $('#breakfast').html(breakfast)
    })

    $.get(`http://jrady721.cafe24.com/api/meal/${yyyymmdd}/type/2/office/dge.go.kr/school/D100000282/level/4`, function (data) {
        let meal = JSON.parse(data)
        let lunch = '<ul>'
        meal.menus.forEach(element => {
            lunch += '<li>' + element + '</li>'
        });
        lunch += '</ul>'
        $('#lunch').html(lunch)
    })

    $.get(`http://jrady721.cafe24.com/api/meal/${yyyymmdd}/type/3/office/dge.go.kr/school/D100000282/level/4`, function (data) {
        let meal = JSON.parse(data)
        let dinner = '<ul>'
        meal.menus.forEach(element => {
            dinner += '<li>' + element + '</li>'
        });
        dinner += '</ul>'
        $('#dinner').html(dinner)
    })
})