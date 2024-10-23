document.addEventListener('DOMContentLoaded', () => {
  const sortButtons = document.querySelectorAll('.board_categori li');
  const menus = document.querySelectorAll('.board_menu .menu');

  // 정렬 버튼 클릭 이벤트
  sortButtons.forEach(button => {
      button.addEventListener('click', () => {
          sortButtons.forEach(btn => btn.classList.remove('active'));
          button.classList.add('active');
      });
  });

  // 메뉴 클릭 이벤트
  menus.forEach(menu => {
      menu.addEventListener('click', function() {
          menus.forEach(m => m.classList.remove('active'));
          this.classList.add('active');
      });
  });

  const bestbtn = document.querySelector('.menu.best');
  const firstbtn = document.querySelector('.menu.first');
  const bestitems = document.querySelectorAll('.board_items .item.best');
  const firstitems = document.querySelectorAll('.board_items .item.first');
  const allItems = document.querySelectorAll('.board_items .item');

  let currentPage = 0; // 현재 페이지 인덱스
  let currentItems = bestitems; // 현재 표시할 아이템

  function displayItems(items) {
      allItems.forEach(item => item.style.display = 'none'); // 모든 아이템 숨기기
      items.forEach(item => item.style.display = ''); // 선택된 아이템 표시
      currentItems = items; // 현재 아이템 업데이트
      setupPagination(items); // 페이지네이션 설정
      updatePagination(items); // 현재 페이지 아이템 표시
  }

  function setupPagination(items) {
      const rowsPerPage = 6; // 한 페이지에 보여줄 아이템 수
      const pageCount = Math.ceil(items.length / rowsPerPage); // 페이지 개수
      const numbers = document.querySelector('#numbers');
      numbers.innerHTML = ''; // 페이지 번호 초기화

      for (let i = 1; i <= pageCount; i++) {
          numbers.innerHTML += `<li><a href="">${i}</a></li>`;
      }

      const numberBtn = numbers.querySelectorAll('a');

      numberBtn.forEach((item, idx) => {
          item.addEventListener('click', (e) => {
              e.preventDefault(); // a태그의 기본 기능 방지
              currentPage = idx; // 현재 페이지 인덱스 업데이트
              updatePagination(currentItems); // 페이지 업데이트
          });
      });

      // "이전" 및 "다음" 버튼 이벤트
      const prevBtn = document.querySelector('.prev_btn');
      const nextBtn = document.querySelector('.next_btn');

      prevBtn.addEventListener('click', () => {
          if (currentPage > 0) {
              currentPage--; // 이전 페이지로 이동
              updatePagination(currentItems);
          }
      });

      nextBtn.addEventListener('click', () => {
          const totalPages = Math.ceil(currentItems.length / 6);
          if (currentPage < totalPages - 1) {
              currentPage++; // 다음 페이지로 이동
              updatePagination(currentItems);
          }
      });

      // 첫 페이지 active 설정
      if (numberBtn.length > 0) {
          numberBtn[0].classList.add('active'); // 첫 페이지 active 설정
      }
  }

  function updatePagination(items) {
      const rowsPerPage = 6; // 한 페이지에 보여줄 아이템 수
      const start = currentPage * rowsPerPage;
      const end = start + rowsPerPage;

      items.forEach((item, index) => {
          item.style.display = (index >= start && index < end) ? '' : 'none'; // 현재 페이지 아이템 표시
      });

      // 페이지 번호 업데이트
      const numberBtn = document.querySelectorAll('#numbers a');
      numberBtn.forEach((btn, idx) => {
          btn.classList.toggle('active', idx === currentPage);
      });
  }

  // 버튼 클릭 시 아이템 표시
  bestbtn.addEventListener('click', function() {
      currentPage = 0; // 페이지 초기화
      displayItems(bestitems); // best 아이템 표시
  });

  firstbtn.addEventListener('click', function() {
      currentPage = 0; // 페이지 초기화
      displayItems(firstitems); // first 아이템 표시
  });

  // 초기 상태 설정: 기본으로 best 버튼 활성화
  bestbtn.click();
});