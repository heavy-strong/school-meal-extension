import $ from 'jquery';

import { getMenu } from './utils/getMenu';
import getYmd from './utils/getYmd';
import { getSchoolList } from '@/scripts/utils/getSchoolList';

// default
export const keys = ['office', 'school', 'level', 'name'];

export let office: string | undefined, school: string | undefined, level: string | undefined, name: string | undefined;

// 오늘
let date = new Date();

$(function() {
  // 설정된 오늘의 급식 불러오기
  chrome.storage.sync.get(['breakfast', 'lunch', 'dinner', 'date'], function(result) {
    // 만약 현재 날짜의 지금날짜가 동일하다면 로컬에서 불러오고 아니면 다시 로드한다.
    if (result.date === getYmd(new Date())) {
      $('#btn-today').text(result.date);
      $('#breakfast > ul').html(result.breakfast);
      $('#lunch > ul').html(result.lunch);
      $('#dinner > ul').html(result.dinner);
    } else {
      $('#btn-today').text(getYmd(new Date()));
      getMenuFront(getYmd(new Date()));
    }
  });

  // 설정 불러오기
  chrome.storage.sync.get(keys, function(data) {
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
$('#btn-today').click(function() {
  loading();

  date = new Date();
  $('#btn-today').html(getYmd(date));
  getMenuFront(getYmd(date));
});
$('#btn-today').on('mouseover', function() {
  $('#btn-today').text('TODAY MEAL');
});
$('#btn-today').on('mouseleave', function() {
  $('#btn-today').text(getYmd(date));
});

// Next Button
$('#btn-next').click(function() {
  loading();

  date.setDate(date.getDate() + 1);
  $('#btn-today').html(getYmd(date));
  getMenuFront(getYmd(date));
});

// Prev Button
$('#btn-prev').click(function() {
  loading();

  date.setDate(date.getDate() - 1);
  $('#btn-today').html(getYmd(date));
  getMenuFront(getYmd(date));
});

// 검색
$('#btn-search').click(function() {
  getSchoolList();
});
$(document).on('keydown', '#school', function(e) {
  if (e.key === 'Enter') {
    getSchoolList();
  }
});

// 학교 선택
$(document).on('click', '.school-list', function() {
  office = $(this).attr('data-office');
  school = $(this).attr('data-code');
  level = $(this).attr('data-level');
  name = $(this).find('h3').text();

  // $(".school-name").text(name);

  $('.active').removeClass('active');
  $(this).addClass('active');
  // alert(name + " 선택 완료");
});

// loading...
function loading() {
  $('#breakfast > ul').html('불러오는 중...');
  $('#lunch > ul').html('불러오는 중...');
  $('#dinner > ul').html('불러오는 중...');
}

// 급식메뉴 불러와서 데이터 삽입
function getMenuFront(ymd: string, callback?: () => void) {
  // 메뉴 가져오기
  getMenu(ymd, (time, data) => {
    // 데이터가 없을 경우
    if (!data) {
      $(`#${time} > ul`).html('오류가 발생했습니다.');
    } else {
      $(`#${time} > ul`).html(data);
    }

    // 여기가 원래 콜백위치
    callback && callback();
  });
}

// setting save-btn
$(document).on('click', '#ok', function() {
  console.debug('save');
  // 세팅 데이터 가져오기
  let setting = { office: office, school: school, level: level, name: name };

  // setting 저장
  chrome.storage.sync.set(setting, function() {
    let chk = 0;
    getMenu(
      getYmd(new Date()),
      (time, data) => {
        console.debug('TIME', time, 'DATA', data);

        if (!data) {
          alert('설정 저장에 오류가 있습니다.');
        } else {
          chrome.storage.sync.set({ [time]: data });

          chk++;
          // 모든 데이터를 불러왔을 때 이동한다.
          if (chk === 2) {
            location.replace('/index.html');
            alert('저장완료');
          }
        }
      },
      true,
    );
  });
});

// 취소
$(document).on('click', '#cancel', function() {
  location.replace('/index.html');
});