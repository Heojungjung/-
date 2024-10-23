var swiper = new Swiper(".swiper", {
  slidesPerView: 1,
  centeredSlides: true,
  spaceBetween: 0,
  loop: true,
  autoplay: {
    delay: 2500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    769: { // 768px 이상일 경우
      slidesPerView: "auto",
      spaceBetween: 75, // spaceBetween 값을 0으로 설정
    },
    1200: { // 1200px 이상일 경우
      slidesPerView: "auto",
      spaceBetween: 125, // spaceBetween 값을 0으로 설정
    }
  }
});

var isPaused = false;
document.querySelector('.pause').addEventListener('click', function () {
  if (!isPaused) {
    swiper.autoplay.stop(); // 자동 재생 중지
    this.querySelector('img').src = 'images/main_section_slide_stop.svg'; // play 아이콘으로 변경
  } else {
    swiper.autoplay.start(); // 자동 재생 재개
    this.querySelector('img').src = 'images/main_section_slide_pause.svg'; // pause 아이콘으로 변경
  }
  isPaused = !isPaused;
});

