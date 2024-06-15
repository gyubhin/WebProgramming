document.addEventListener('DOMContentLoaded', function() {
    const currentDateElement = document.querySelector('.current-date');
    const daysList = document.querySelector('.calendar .days');
    
    // 현재 년월 가져오기
    let currentDate = new Date();
    let currentYear = currentDate.getFullYear();
    let currentMonth = currentDate.getMonth() + 1; // getMonth()는 0부터 시작하므로 +1 해줌
    
    // 초기 달력 생성
    renderCalendar(currentYear, currentMonth);
    
    // 이전 월 버튼 클릭 시
    document.getElementById('prevMonth').addEventListener('click', function() {
      currentMonth--;
      if (currentMonth < 1) {
        currentMonth = 12;
        currentYear--;
      }
      renderCalendar(currentYear, currentMonth);
    });
    
    // 다음 월 버튼 클릭 시
    document.getElementById('nextMonth').addEventListener('click', function() {
      currentMonth++;
      if (currentMonth > 12) {
        currentMonth = 1;
        currentYear++;
      }
      renderCalendar(currentYear, currentMonth);
    });
    
    // 달력을 생성하고 화면에 표시하는 함수
    function renderCalendar(year, month) {
      // 날짜 객체 생성
      const firstDay = new Date(year, month - 1, 1);
      const lastDay = new Date(year, month, 0);
      const daysInMonth = lastDay.getDate();
      const startDay = firstDay.getDay(); // 해당 월의 첫째 날의 요일 (0: 일요일, 1: 월요일, ..., 6: 토요일)
      
      // 현재 년월 표시 업데이트
      currentDateElement.textContent = `${year}년 ${month}월`;
      
      // 이전에 있던 날짜들을 초기화
      daysList.innerHTML = '';
      
      // 빈칸으로 시작하게 하기 위해 이전 달의 마지막 날들을 추가
      for (let i = startDay - 1; i >= 0; i--) {
        const prevDate = new Date(year, month - 1, -i);
        const prevDay = prevDate.getDate();
        const prevMonth = prevDate.getMonth() + 1;
        const prevYear = prevDate.getFullYear();
        const prevDateString = `${prevYear}-${prevMonth}-${prevDay}`;
        const listItem = createCalendarItem(prevDay, 'inactive', prevDateString);
        daysList.appendChild(listItem);
      }
      
      // 해당 달의 모든 날짜들 추가
      for (let i = 1; i <= daysInMonth; i++) {
        const dateString = `${year}-${month}-${i}`;
        const listItem = createCalendarItem(i, 'active', dateString);
        daysList.appendChild(listItem);
      }
      
      // 다음 달의 시작부분을 만들기 위해 추가
      const totalDays = startDay + daysInMonth;
      const totalWeeks = Math.ceil(totalDays / 7);
      const remainingDays = totalWeeks * 7 - totalDays;
      
      for (let i = 1; i <= remainingDays; i++) {
        const nextDate = new Date(year, month, i);
        const nextDay = nextDate.getDate();
        const nextMonth = nextDate.getMonth() + 1;
        const nextYear = nextDate.getFullYear();
        const nextDateString = `${nextYear}-${nextMonth}-${nextDay}`;
        const listItem = createCalendarItem(nextDay, 'inactive', nextDateString);
        daysList.appendChild(listItem);
      }
    }
    
    // 달력 리스트 아이템 생성 함수
    function createCalendarItem(day, status, dateString) {
      const listItem = document.createElement('li');
      listItem.textContent = day;
      listItem.classList.add(status);
      listItem.setAttribute('data-date', dateString);
      return listItem;
    }
  });
  