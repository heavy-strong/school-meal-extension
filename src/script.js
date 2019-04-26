import $ from "jquery";

import {getMenu} from "./getMenu";
import getYmd from "./getYmd";

// default
const keys = ["office", "school", "level", "name"];
const baseURL = "http://jrady721.cafe24.com";

let office, school, level, name;

// 오늘
let date = new Date();

$(function () {
    // 설정된 오늘의 급식 불러오기
    chrome.storage.sync.get(["breakfast", "lunch", "dinner", "date"], function (result) {
        // 만약 현재 날짜의 지금날짜가 동일하다면 로컬에서 불러오고 아니면 다시 로드한다.
        if (result.date === getYmd(new Date())) {
            $("#btn-today").text(result.date);
            $("#breakfast > ul").html(result.breakfast);
            $("#lunch > ul").html(result.lunch);
            $("#dinner > ul").html(result.dinner);
        } else {
            $("#btn-today").text(getYmd(new Date()));
            getMenuFront(getYmd(new Date()));
        }
    });

    // 설정 불러오기
    chrome.storage.sync.get(keys, function (data) {
        // 설정이 있을 떄만 설정에 저장
        if (data.level) {
            office = data.office;
            school = data.school;
            level = data.level;
            // $(".school-name").text(data.name);
        }
    });
});

// Today Button
$("#btn-today").click(function () {
    loading();

    date = new Date();
    $("#btn-today").html(getYmd(date));
    getMenuFront(getYmd(date));
});
$("#btn-today").on("mouseover", function () {
    $("#btn-today").text("TODAY MEAL");
});
$("#btn-today").on("mouseleave", function () {
    $("#btn-today").text(getYmd(date));
});

// Next Button
$("#btn-next").click(function () {
    loading();

    date.setDate(date.getDate() + 1);
    $("#btn-today").html(getYmd(date));
    getMenuFront(getYmd(date));
});

// Prev Button
$("#btn-prev").click(function () {
    loading();

    date.setDate(date.getDate() - 1);
    $("#btn-today").html(getYmd(date));
    getMenuFront(getYmd(date));
});

// 검색
$("#btn-search").click(function () {
    updateList();
});
$(document).on("keydown", "#school", function (e) {
    if (e.key === "Enter") {
        updateList();
    }
});

// updateList
function updateList() {
    let search = $("#school").val();
    $.get(`${baseURL}/api/school/${search}`, function (data) {
        let json = JSON.parse(data);

        // 검색결과가 없을 경우
        if (json.schools == undefined || json.schools.length == 0) {
            $("#school-list").html(
                '<span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">검색결과가 없습니다.</span>'
            );
        } else {
            // 리스트 초기화
            $("#school-list").html("");
            json.schools.forEach(element => {
                // 검색한 것 중, 사용자가 설장한 학교랑 일치하는 학교가 있을경우 active
                let active = element.code === school ? ' active' : '';

                let list = `<li class='school-list${active}' data-code='${element.code}' data-office='${element.office}' data-level='${element.level}'><h3>${element.name}</h3>`;
                list += `<h5>${element.address}</h5></li>`;

                // 학교 리스트에 추가
                $("#school-list").append(list);
            });
        }
    });
}

// 학교 선택
$(document).on("click", ".school-list", function () {
    office = $(this).attr("data-office");
    school = $(this).attr("data-code");
    level = $(this).attr("data-level");
    name = $(this)
        .find("h3")
        .text();

    // $(".school-name").text(name);

    $('.active').removeClass('active');
    $(this).addClass('active');
    // alert(name + " 선택 완료");
});

// loading...
function loading() {
    $("#breakfast > ul").html("불러오는 중...");
    $("#lunch > ul").html("불러오는 중...");
    $("#dinner > ul").html("불러오는 중...");
}

// 급식메뉴 불러와서 데이터 삽입
function getMenuFront(ymd, callback) {

    // 메뉴 가져오기
    getMenu(ymd, (time, data) => {
        // 데이터가 없을 경우
        if (!data) {
            $(`#${time} > ul`).html("오류가 발생했습니다.");
        } else {
            $(`#${time} > ul`).html(data);
        }

        // 여기가 원래 콜백위치
        callback && callback();
    });
}

// setting save-btn
$(document).on("click", "#ok", function () {
    console.log("save");
    // 세팅 데이터 가져오기
    let setting = {office: office, school: school, level: level, name: name};

    // setting 저장
    chrome.storage.sync.set(setting, function () {
        let chk = 0;
        getMenu(getYmd(new Date()), (time, data) => {
            console.log(time, data);
            if (!data) {
                alert('설정 저장에 오류가 있습니다.');
            } else {
                chrome.storage.sync.set({[time]: data});

                chk++;
                // 모든 데이터를 불러왔을 때 이동한다.
                if (chk === 2) {
                    location.replace('/index.html');
                    alert('저장완료');
                }
            }
        }, true);


    });
});

// 취소
$(document).on("click", "#cancel", function () {
    location.replace("/index.html");
});