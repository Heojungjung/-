const sections = document.querySelectorAll('section');
let currentSectionIndex = 0;
let scrolling = false;

   // 다음 섹션으로 스크롤하는 함수
   function scrollToNextSection() {
    scrolling = true;
    currentSectionIndex++;
    if (currentSectionIndex >= sections.length) {
      currentSectionIndex = 0;
    }
    // 다음 섹션으로 스무스하게 스크롤
    sections[currentSectionIndex].scrollIntoView({
      behavior: 'smooth'
    });
  }

  // 이전 섹션으로 스크롤하는 함수
  function scrollToPreviousSection() {
    scrolling = true;
    currentSectionIndex--;
    if (currentSectionIndex < 0) {
      currentSectionIndex = sections.length - 1;
    }
    // 이전 섹션으로 스무스하게 스크롤
    sections[currentSectionIndex].scrollIntoView({
      behavior: 'smooth'
    });
  }

  // 마우스 휠 스크롤 이벤트 리스너
  document.addEventListener('wheel', function (event) {
    event.preventDefault(); // 기본 스크롤 동작 방지
    if (!scrolling) { // 스크롤 중이 아닌 경우에만 실행
      if (event.deltaY > 0) { // 마우스 휠이 아래로 스크롤될 때
        if (currentSectionIndex === sections.length - 1) {
          // 현재 섹션이 마지막 섹션인 경우 스크롤 이벤트 무시
          return;
        }
        scrollToNextSection(); // 다음 섹션으로 스크롤
      } else { // 마우스 휠이 위로 스크롤될 때
        scrollToPreviousSection(); // 이전 섹션으로 스크롤
      }
      // 스크롤 후 1초 후에 다시 스크롤 가능하도록 설정
      setTimeout(function () {
        scrolling = false;
      }, 1000);
    }
  });

  window.addEventListener('scroll', function () {
    let currentSection = 0;
    let minDistance = Math.abs(window.scrollY - sections[0].offsetTop);
    // 모든 섹션에 대해 반복하여 가장 가까운 섹션을 찾음
    sections.forEach(function (section, index) {
      const distance = Math.abs(window.scrollY - section.offsetTop);
      if (distance < minDistance) {
        minDistance = distance;
        currentSection = index;
      }
    });
});