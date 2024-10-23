document.addEventListener('DOMContentLoaded', function() {
let slideImages = document.querySelectorAll('.l_slide .slide_img'); // 모든 슬라이드 이미지
let countSlideIdx = 0; // 현재 슬라이드 인덱스
let totalSlides = slideImages.length; // 총 슬라이드 수
let autoSlideInterval; // 자동 슬라이드 타이머
let isPaused = false; // 자동 슬라이드가 일시 정지 상태인지 여부

// 슬라이드 숫자 업데이트 함수
function updateSlideCounter() {
    document.getElementById('countSlide').textContent = countSlideIdx + 1; 
}

// 슬라이드 전환 함수
function changeSlide() {
    slideImages[countSlideIdx].classList.remove('active'); // 현재 슬라이드 숨기기
    countSlideIdx = (countSlideIdx + 1) % totalSlides; // 인덱스 증가 (순환)
    slideImages[countSlideIdx].classList.add('active'); // 다음 슬라이드 보이기
    updateSlideCounter(); // 슬라이드 숫자 업데이트
}

// 자동 슬라이드 시작
function startAutoSlide() {
    if (!isPaused) {
        autoSlideInterval = setInterval(changeSlide, 2500); // 5초마다 changeSlide 호출
    }
}

// 자동 슬라이드 중지
function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// 다음 버튼 클릭 이벤트
document.getElementById('nextBtn').addEventListener('click', function() {
    stopAutoSlide(); // 자동 슬라이드 중지
    changeSlide(); // 다음 슬라이드로 이동
    startAutoSlide(); // 다시 자동 슬라이드 시작
});

// 이전 버튼 클릭 이벤트
document.getElementById('prevBtn').addEventListener('click', function() {
    stopAutoSlide(); // 자동 슬라이드 중지
    slideImages[countSlideIdx].classList.remove('active'); // 현재 슬라이드 숨기기
    countSlideIdx = (countSlideIdx - 1 + totalSlides) % totalSlides; // 인덱스 감소 (순환)
    slideImages[countSlideIdx].classList.add('active'); // 이전 슬라이드 보이기
    updateSlideCounter(); // 슬라이드 숫자 업데이트
    startAutoSlide(); // 다시 자동 슬라이드 시작
});

// pause 버튼 클릭 이벤트
document.getElementById('pauseBtn').addEventListener('click', function() {
    if (isPaused) {
        startAutoSlide(); // 자동 슬라이드 시작
        this.innerHTML = '<img src="images/Type=stop.svg" alt="Pause">'; // 버튼 텍스트 변경
    } else {
        stopAutoSlide(); // 자동 슬라이드 중지
        this.innerHTML = '<img src="images/Type=play.svg" alt="Play">'; // 버튼 텍스트 변경
    }
    isPaused = !isPaused; // 상태 반전
});

// 초기 슬라이드 숫자 업데이트 및 자동 슬라이드 시작
updateSlideCounter();
startAutoSlide();
});