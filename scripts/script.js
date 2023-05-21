// ************* NAVIGATION HAMBURGER MENU *************
//******************************************************

const hamNav = document.querySelector(".icon");
const menu = document.querySelector(".menu");
const menuItems = document.querySelectorAll(".menuItem");
const closeIcon= document.querySelector(".closeIcon");
const menuIcon = document.querySelector(".menuIcon");

function toggleMenu() {
  if (menu.classList.contains("showMenu")) {
    menu.classList.remove("showMenu");
    closeIcon.style.display = "none";
    menuIcon.style.display = "block";
  } else {
    menu.classList.add("showMenu");
    closeIcon.style.display = "block";
    menuIcon.style.display = "none";
  }
}

hamNav.addEventListener("click", toggleMenu);

// ************* VIDEO CAROUSEL *************
//******************************************************

const slideWrapper = document.querySelector('.carouselItems');
const slides = Array.from(slideWrapper.children);
  console.log(slides);
const nextBtn = document.querySelector('.rightBtn');
const prevBtn = document.querySelector('.leftBtn');
const dotsNav = document.querySelector('.carouselNav');
const dots = Array.from(dotsNav.children);
  console.log(dots);

  const slideWidth = slides[0].getBoundingClientRect().width;
  console.log(slideWidth);

  const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
  };
  
  slides.forEach(setSlidePosition);


//REUSABLE FUNCTIONS -----------------

const moveToSlide = (slideWrapper, currentSlide, targetSlide) => {
  slideWrapper.style.transform =  'translateX(-' + targetSlide.style.left + ')';
  currentSlide.classList.remove('currentSlide');
  targetSlide.classList.add('currentSlide');
}

const updateDots = (currentDot, targetDot) => {
  currentDot.classList.remove('currentSlide');
  targetDot.classList.add('currentSlide');
}

const hideShowArrows = (slides, prevBtn, nextBtn, targetIndex) => {
  if(targetIndex === 0) {
    prevBtn.classList.add('isHidden');
    nextBtn.classList.remove('isHidden');
  } else if(targetIndex === slides.length - 1) {
    prevBtn.classList.remove('isHidden');
    nextBtn.classList.add('isHidden');
  } else {
    prevBtn.classList.remove('isHidden');
    nextBtn.classList.remove('isHidden');
  }
}

// END REUSABLE FUNCTIONS -----------

//next button
nextBtn.addEventListener('click', e => {
  const currentSlide = slideWrapper.querySelector('.currentSlide');
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector('.currentSlide');
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex(slide => slide === nextSlide);
  moveToSlide(slideWrapper, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevBtn, nextBtn, nextIndex);
})

//previous button
prevBtn.addEventListener('click', e => {
  const currentSlide = slideWrapper.querySelector('.currentSlide');
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector('.currentSlide');
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex(slide => slide === prevSlide);
  moveToSlide(slideWrapper, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevBtn, nextBtn, prevIndex);
})

//dot indicators
dotsNav.addEventListener('click', e => {
  // const targetDot = e;
  // console.log(e.target);
  const targetDot = e.target.closest('button');
  console.log(targetDot);
  
  console.log('test1');
  //prevent the code for working if it is not a button
  if(!targetDot) return;
  console.log('test2');
  currentSlide = slideWrapper.querySelector('.currentSlide');
  const currentDot = dotsNav.querySelector('.currentSlide');
  console.log(dots);
  const targetIndex = dots.findIndex(dot => dot === targetDot);
  console.log(targetIndex);
  const targetSlide = slides[targetIndex]
  console.log(targetSlide);
  moveToSlide(slideWrapper, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, prevBtn, nextBtn, targetIndex);
})

function debounce(func, delay) {
  let timerId;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timerId);
    timerId = setTimeout(function() {
      func.apply(context, args);
    }, delay);
  }
}

// dealing with resize and ensurong page looks OK
window.addEventListener('resize', debounce(function(){

   //reload of the page
   location.reload()
}, 250)); 
  