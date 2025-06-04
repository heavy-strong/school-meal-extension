// 모듈 불러오기
import { getMenu } from './utils/getMenu';
import getYmd from './utils/getYmd';
import { alarm } from '@/scripts/utils/alarm';

export const keys = ['office', 'school', 'level', 'alarmTimes'];
/**
 * 기본 알림 시간
 * 아침: 그 전날 20:00
 * 점심: 12:00
 * 저녁: 17:50
 * 0 ~ 1440으로 표현
 */
export const alarmTimes = [720, 1070, 1200];

// 처음 설치 후 실행
chrome.runtime.onInstalled.addListener(function() {
});

// 백그라운드
chrome.storage.sync.get(keys, function(setting) {
  // 설정이 존재하지 않으면 기본설정으로 설정하고 로드함
  if (!setting.level) {
    let option = {
      office: 'dge.go.kr',
      school: 'D100000282',
      level: '4',
      date: getYmd(new Date()),
      alarmTimes: alarmTimes,
    };
    // 설정
    chrome.storage.sync.set(option, function() {
      // 모두 세팅을 마쳤을 때
      getMenu(getYmd(new Date()),
        (time, data) => {
          chrome.storage.sync.set(
            {
              [time]: data,
            },
            function() {
              console.debug('set sync data');
            },
          );
        },
      );

      alarm(option.alarmTimes);
    });
  } else if (!setting.alarmTimes) {
    setting.alarmTimes = alarmTimes;
    chrome.storage.sync.set(setting);
    alarm(setting.alarmTimes);
  }
  if (setting.level) {
    // get Menu
    getMenu(getYmd(new Date()), (time, data) => {
      chrome.storage.sync.set({ [time]: data }, function() {
        console.debug('set sync data');
      });
    });

    alarm(setting.alarmTimes);
  }
});
