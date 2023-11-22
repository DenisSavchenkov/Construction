// SLIDER-TOP
const swiper = new Swiper('.swiper-top', {
  loop: true,

  autoplay: {
    delay: 3000,
  },
  effect: 'fade',

  pagination: {
    el: '.swiper-pagination-top',
  },

  navigation: {
    nextEl: '.swiper-button-next-top',
    prevEl: '.swiper-button-prev-top',
  },
});

// SWIPER-REVIEWS
const swiperReviews = new Swiper('.swiper-reviews', {
  loop: true,

  autoplay: {
    delay: 2000,
  },
  breakpoints: {
    1100: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1215: {
      slidesPerView: 3,
    },
  },
  navigation: {
    nextEl: '.swiper-button-next-reviews',
    prevEl: '.swiper-button-prev-reviews',
  },
});
// -----------------------------------------------------------------

const popup = document.querySelector('.popup');
const btns = document.querySelectorAll('.order-btn');
const cancel = document.querySelector('.popup__content-cancel');
const sendBtn = document.querySelector('.send-btn');
const form = document.querySelector('.popup__content-form');
const questionBtn = document.querySelector('.questions__form-btn');

// Show popup when clicked on botton
btns.forEach((btn) => {
  btn.addEventListener('click', () => {
    popup.classList.add('popup-active');
    document.body.style.overflow = 'hidden';
  });
});

// Close popup when clicked on botton
window.addEventListener('click', (e) => {
  if (e.target === popup || e.target === cancel) {
    popup.classList.remove('popup-active');
    document.body.style.overflow = 'visible';
  }
});

// Send form
sendBtn.addEventListener('click', () => {
  popup.classList.remove('popup-active');
  document.body.style.overflow = 'visible';
});

// Make sticky "nav" block when scroll down
window.addEventListener('scroll', () => {
  const nav = document.querySelector('.nav');
  nav.classList.toggle('sticky', window.scrollY > 50);
});

// Reset text in input when submit form
window.addEventListener('submit', (e) => {
  e.target.reset();
});

// Burger-menu

const burgerBtn = document.querySelector('.burger__button');
const burgerContent = document.querySelector('.burger__content');
const cancelburger = document.querySelector('.cancel__burger');

// Show burger-content
burgerBtn.addEventListener('click', () => {
  burgerContent.classList.add('active');
});

// Close burger-content
cancelburger.addEventListener('click', () => {
  burgerContent.classList.remove('active');
});
