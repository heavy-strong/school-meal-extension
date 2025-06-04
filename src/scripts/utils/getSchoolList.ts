// updateList
import $ from 'jquery';
import { baseURL } from '@/scripts/values';
import { school } from '@/scripts/script';

export async function getSchoolList() {
  let search = $('#school').val();

  // https://open.neis.go.kr/ 에서 발급 받은 API 키를 입력해주세요.
  const apiKey = 'c80e62c92b3049ddaa9f3679ca54e4fe';
  const response = await $.get('https://open.neis.go.kr/hub/schoolInfo', {
    Type: 'json',
    KEY: apiKey,
    SCHUL_NM: search,
  });
  try {
    const json = JSON.parse(response);

    if (json?.RESULT?.MESSAGE) throw new Error(json.RESULT.MESSAGE);

    const head = json.schoolInfo[0].head;
    const row = json.schoolInfo[1].row;

    console.log('RESPONSE', json);
    console.log('HEAD', head);
    console.log('ROW', row);

    const listEl = document.querySelector('#school-list');

    if (listEl) {
      listEl.innerHTML = row.map((e: any) => {
        return `<div>${JSON.stringify(e.SCHUL_NM)}</div>`
      }).join('')
    }

    return row;
  } catch (err) {
    console.error('FAILED SEARCH', err);
  }


  return;
//   // 학교기본정보 API
//   // https://open.neis.go.kr/portal/data/service/selectServicePage.do?infId=OPEN17020190531110010104913&infSeq=2
//   const url = "https://open.neis.go.kr/hub/schoolInfo" + '?' + encodeURI() http_build_query(array(
//     'Type': 'json',
//     'KEY' => $apiKey,
//     'SCHUL_NM' => $name,
//
// //            KEY	  STRING(필수)	  인증키	  기본값 : sample key
// //            Type	  STRING(필수)	  호출 문서(xml, json)	  기본값 : xml
// //            pIndex	  INTEGER(필수)	  페이지 위치	  기본값 : 1(sample key는 1 고정)
// //            pSize	  INTEGER(필수)	  페이지 당 신청 숫자	  기본값 : 100(sample key는 5 고정)
// //            ATPT_OFCDC_SC_CODE	     STRING(선택)	    시도교육청코드
// //            SD_SCHUL_CODE	     STRING(선택)	    표준학교코드
// //            SCHUL_NM	     STRING(선택)	    학교명
// //            SCHUL_KND_SC_NM	     STRING(선택)	    학교종류명
// //            LCTN_SC_NM	     STRING(선택)	    소재지명
// //            FOND_SC_NM	     STRING(선택)	    설립명
// ));
//
//   const apiCall = file_get_contents($url);
//   const failArray = json_decode($apiCall, true);
//   if (isset($failArray['RESULT']['MESSAGE'])) {
//     const resultFail = $failArray['RESULT']['MESSAGE'];
//     return $resultFail;
//   }
//
//   const a = json_encode($apiCall, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT);
//
//   // 백 슬래쉬를 제거한다
//   let b = stripslashes($a);
//   // 앞 뒤의 " 문자를 제거한다
//   let c = substr($b, 1, -1);
//
//   let apiResult = json_decode($c, true);
//
//   let info = 'schoolInfo';
//   let resultSuccess = $apiResult[$info][0]['head'][1]['RESULT']['MESSAGE']; //예) 정상 처리되었습니다.
//
//   // get first row item
//   let row = $apiResult[$info][1]['row'];
//   /*
//      {
//         "ATPT_OFCDC_SC_CODE": "B10",
//         "ATPT_OFCDC_SC_NM": "서울특별시교육청",
//         "SD_SCHUL_CODE": "7011489",
//         "SCHUL_NM": "단국대학교부속소프트웨어고등학교",
//         "ENG_SCHUL_NM": "Dankook University Software High School",
//         "SCHUL_KND_SC_NM": "고등학교",
//         "LCTN_SC_NM": "서울특별시",
//         "JU_ORG_NM": "서울특별시교육청",
//         "FOND_SC_NM": "사립",
//         "ORG_RDNZC": "06278 ",
//         "ORG_RDNMA": "서울특별시 강남구 도곡로64길 21",
//         "ORG_RDNDA": "(대치동 1013)",
//         "ORG_TELNO": "02-2116-0115",
//         "HMPG_ADRES": "http://dankook.sen.hs.kr",
//         "COEDU_SC_NM": "남",
//         "ORG_FAXNO": "02-2116-0176",
//         "HS_SC_NM": "특성화고",
//         "INDST_SPECL_CCCCL_EXST_YN": "N",
//         "HS_GNRL_BUSNS_SC_NM": "전문계",
//         "SPCLY_PURPS_HS_ORD_NM": null,
//         "ENE_BFE_SEHF_SC_NM": "전기",
//         "DGHT_SC_NM": "주간",
//         "FOND_YMD": "19471103",
//         "FOAS_MEMRD": "19501103",
//         "LOAD_DTM": "20230205"
//      }
//    * */
//
//   if ($resultSuccess === '정상 처리되었습니다.') {
//     let array = array(
//       'status': 'success',
// //            'code' => $row['SD_SCHUL_CODE'],
//       'data' => $row
//   );
//   } elseif (isset($resultFail)) {
//     if ($resultFail === '해당하는 데이터가 없습니다.') {
//       let array = array(
//         'status': 'fail',
//         'message': '해당하는 데이터가 없습니다.',
//     );
//     } else {
//       let array = {
//         'status': 'fail',
//         'message': '정보를 가져올 수 없습니다.',
//     }
//     }
//   }
//
//   return array;

  return;

  $.get(`${baseURL}/api/school/${search}`, function(data) {
    let json = JSON.parse(data);

    // 검색결과가 없을 경우
    if (json.schools === undefined || json.schools.length === 0) {
      $('#school-list').html(
        '<span style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">검색결과가 없습니다.</span>',
      );
    } else {
      // 리스트 초기화
      $('#school-list').html('');
      json.schools.forEach((element: any) => {
        // 검색한 것 중, 사용자가 설장한 학교랑 일치하는 학교가 있을경우 active
        let active = element.code === school ? ' active' : '';

        let list = `<li class="school-list${active}" data-code="${ele ment.code}" data-office="${element.office}" data-level="${element.level}"><h3>${element.name}</h3>`;
        list += `<h5>${element.address}</h5></li>`;

        // 학교 리스트에 추가
        $('#school-list').append(list);
      });
    }
  });
}