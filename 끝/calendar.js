document.addEventListener('DOMContentLoaded', function() {
  const currentDateElement = document.querySelector('.current-date');
  const daysList = document.querySelector('.calendar .days');
  const scheduleElement = document.getElementById('monthly-schedule');

  const schedules = {
    '2024-05': [
        { date: '2024-05-01 (수)', event: '근로자의 날' },
        { date: '2024-05-07 (화) ~ 2024-05-09 (목)', event: '봄축제' },
        { date: '2024-05-10 (금)', event: '개교기념일' },
        { date: '2024-05-20 (월) ~ 2024-05-22 (수)', event: '하계 계절수업 수강신청' },
        { date: '2024-05-22 (수)', event: '제1학기 수업일수 2/3선' }
    ],
    '2024-06': [
        { date: '2024-4-29 (월) ~ 2024-6-12 (수)', event: '제1학기 대학원 학위청구 논문발표' },
        { date: '2024-6-10 (월) ~ 2024-6-20 (목)', event: '제1학기 보강지정' },
        { date: '2024-6-10 (월) ~ 2024-7-1 (월)', event: '제1학기 강의평가' },
        { date: '2024-6-14 (금)', event: '제1학기 대학원 학위청구 논문 심사완료' },
        { date: '2024-6-21 (금) ~ 2024-6-27 (목)', event: '제1학기 기말고사' },
        { date: '2024-6-21 (금) ~ 2024-7-1 (월)', event: '제1학기 성적입력' },
        { date: '2024-6-21 (금) ~ 2024-7-4 (목)', event: '제1학기 성적공시' },
        { date: '2024-6-28 (금)', event: '하계방학' }
    ],
    '2024-07': [
        { date: '2024-6-10 (월) ~ 2024-7-1 (월)', event: '제1학기 강의평가' },
        { date: '2024-6-21 (금) ~ 2024-7-1 (월)', event: '제1학기 성적입력' },
        { date: '2024-6-21 (금) ~ 2024-7-4 (목)', event: '제1학기 성적공시' },
        { date: '2024-7-1 (월) ~ 2024-7-19 (금)', event: '하계 계절수업' },
        { date: '2024-7-2 (화) ~ 2024-7-4 (목)', event: '제1학기 성적이의신청 및 정정' },
        { date: '2024-7-5 (금)', event: '(담당교원) 제1학기 성적확정' },
        { date: '2024-7-8 (월)', event: '제1학기 최종 성적확정' },
        { date: '2024-7-10 (수) ~ 2024-7-12 (금)', event: '제2학기 다전공 이수(취소) 및 전과 신청' },
        { date: '2024-7-15 (월) ~ 2024-7-19 (금)', event: '제1학기 대학원 학위청구 논문 완성본 제출' },
        { date: '2024-7-17 (수) ~ 2024-7-19 (금)', event: '제2학기 예비수강신청' },
        { date: '2024-7-25 (목) ~ 2024-7-31 (수)', event: '2024년 8월 조기졸업 및 학사학위취득유예 신청' }
    ],
    '2024-08': [
        { date: '2024-8-5 (월) ~ 2024-10-11 (금)', event: '제2학기 휴·복학' },
        { date: '2024-8-7 (수) ~ 2024-8-9 (금)', event: '제2학기 수강신청' },
        { date: '2024-8-22 (목) ~ 2024-8-26 (월)', event: '제2학기 현금등록(대학원, 전문대학원 및 특수대학원 포함)' },
        { date: '2024-8-23 (금)', event: '2024년 8월 학위수여식' }
    ],
    '2024-09': [
        { date: '2024-9-2 (월)', event: '제2학기 개강' },
        { date: '2024-9-2 (월) ~ 2024-9-6 (금)', event: '제2학기 수강신청 변경' },
        { date: '2024-9-9 (월) ~ 2024-9-14 (토)', event: '제2학기 대학원 외국어 및 종합시험 실시' },
        { date: '2024-9-23 (월) ~ 2024-9-27 (금)', event: '제2학기 수강취소(일반대학원생, 경영대학원생, 교육대학원생 제외)' }
    ],
    '2024-10': [
        { date: '2024-8-5 (월) ~ 2024-10-11 (금)', event: '제2학기 휴·복학' },
        { date: '2024-10-1 (화) ~ 2024-10-14 (월)', event: '제2학기 중간 강의평가' },
        { date: '2024-10-8 (화) ~ 2024-10-11 (금)', event: '제2학기 대학원 학위청구 논문 심사 신청' },
        { date: '2024-10-11 (금)', event: '제2학기 수업일수 1/3선' },
        { date: '2024-10-21 (월) ~ 2024-10-25 (금)', event: '제2학기 중간고사' },
        { date: '2024-10-31 (목)', event: '부경학술문화제' }
    ],
    '2024-11': [
        { date: '2024-11-1 (금) ~ 2024-12-6 (금)', event: '제2학기 대학원 학위청구 논문 발표' },
        { date: '2024-11-13 (수) ~ 2024-11-15 (금)', event: '동계 계절수업 수강신청' },
        { date: '2024-11-15 (금)', event: '제2학기 수업일수 2/3선' }
    ],
    '2024-12': [
        { date: '2024-11-1 (금) ~ 2024-12-6 (금)', event: '제2학기 대학원 학위청구 논문 발표' },
        { date: '2024-12-9 (월) ~ 2024-12-13 (금)', event: '제2학기 보강지정' },
        { date: '2024-12-9 (월) ~ 2024-12-27 (금)', event: '제2학기 강의평가' },
        { date: '2024-12-10 (화)', event: '제2학기 대학원 학위청구 논문 심사 완료' },
        { date: '2024-12-16 (월) ~ 2024-12-20 (금)', event: '제2학기 기말고사' },
        { date: '2024-12-16 (월) ~ 2024-12-26 (목)', event: '제2학기 성적입력' },
        { date: '2024-12-16 (월) ~ 2024-12-31 (화)', event: '제2학기 성적공시' },
        { date: '2024-12-23 (월)', event: '동계방학' },
        { date: '2024-12-23 (월) ~ 2025-1-14 (화)', event: '동계 계절수업' },
        { date: '2024-12-27 (금) ~ 2024-12-31 (화)', event: '제2학기 성적이의신청 및 정정' },
        { date: '2024-12-31 (화)', event: '(담당교원) 제2학기 성적확정' }
    ]
};


  let currentYear = 2024;
  let currentMonth = 6;

  function renderCalendar() {
      const firstDayOfMonth = new Date(currentYear, currentMonth - 1, 1).getDay();
      const lastDateOfMonth = new Date(currentYear, currentMonth, 0).getDate();
      const lastDateOfLastMonth = new Date(currentYear, currentMonth - 1, 0).getDate();

      let daysHTML = '';

      // 이전 달 날짜
      for (let i = firstDayOfMonth; i > 0; i--) {
          daysHTML += `<li class="inactive">${lastDateOfLastMonth - i + 1}</li>`;
      }

      // 현재 달 날짜
      for (let i = 1; i <= lastDateOfMonth; i++) {
          daysHTML += `<li class="active">${i}</li>`;
      }

      // 다음 달 날짜
      const nextDays = 35 - (firstDayOfMonth + lastDateOfMonth); 
      for (let i = 1; i <= nextDays; i++) {
          daysHTML += `<li class="inactive">${i}</li>`;
      }

      daysList.innerHTML = daysHTML;

      const currentMonthFormatted = currentMonth.toString().padStart(2, '0');
      currentDateElement.innerText = `${currentYear}-${currentMonthFormatted}`;
      renderSchedule();
  }

  function renderSchedule() {
      const currentMonthFormatted = `${currentYear}-${currentMonth.toString().padStart(2, '0')}`;
      const currentSchedule = schedules[currentMonthFormatted] || [];

      let scheduleHTML = `<h2>월간 일정 (${currentMonthFormatted})</h2>`;
      scheduleHTML += `<table><thead><tr><th>날짜</th><th>일정</th></tr></thead><tbody>`;

      currentSchedule.forEach(event => {
          scheduleHTML += `<tr><td>${event.date}</td><td>${event.event}</td></tr>`;
      });

      scheduleHTML += `</tbody></table>`;
      scheduleElement.innerHTML = scheduleHTML;
  }

  document.getElementById('prevMonth').addEventListener('click', function() {
      currentMonth--;
      if (currentMonth < 1) {
          currentMonth = 12;
          currentYear--;
      }
      renderCalendar();
  });

  document.getElementById('nextMonth').addEventListener('click', function() {
      currentMonth++;
      if (currentMonth > 12) {
          currentMonth = 1;
          currentYear++;
      }
      renderCalendar();
  });

  renderCalendar();
});
