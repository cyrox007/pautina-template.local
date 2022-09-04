document.addEventListener("DOMContentLoaded", ()=>{
    /* Подсветка меню */
    let url = window.location.pathname;
    let url1 = url.substring(1);

    let links = document.querySelectorAll('.header__link');
    
    links.forEach(element => {
        if (element.getAttribute('href') == url1) {
            element.classList.toggle('active')
        }
    });
    
    /* Бургер меню */
    let mobileNav = document.querySelector('.header__mobile-nav');
    let mobileBtn = document.querySelector('.header__mobile-btn');
    mobileBtn.addEventListener('click', ()=>{
        mobileBtn.classList.toggle('active');
        mobileNav.classList.toggle('visible');
    });

    /* ЧАВО */
    let questions = document.querySelectorAll('.faq__question');
    questions.forEach(elem => {
        elem.addEventListener('click', ()=>{
            elem.querySelector('img').classList.toggle('active');
            let panel = elem.querySelector('.faq__answer');
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    });
    
    /* Слайдер */
    let slides = document.querySelectorAll('.preview-two__big-banner--item');
    let currentSlide = 0;
    nextSlide();
    let interval = setInterval(nextSlide, 10000);
    function nextSlide() {
        slides[currentSlide].className = 'preview-two__big-banner--item';
        currentSlide = (currentSlide+1)%slides.length;
        slides[currentSlide].className = 'preview-two__big-banner--item visible';
    }

    /* Карусель */
    let slider = document.querySelector('.carusel');
    let sliderList = slider.querySelector('.carusel__list');
    let sliderTrack = slider.querySelector('.carusel__track');
    
    let slides_arr = slider.querySelectorAll('.carusel__card');
    
    let slideWidth = slides_arr[0].offsetWidth,
        slideIndex = 0,
        posInit = 0,
        posX1 = 0,
        posX2 = 0,
        posY1 = 0,
        posY2 = 0,
        posFinal = 0,
        isSwipe = false,
        isScroll = false,
        allowSwipe = true,
        transition = true,
        nextTrf = 0,
        prevTrf = 0,
        lastTrf = --slides_arr.length * slideWidth,
        posThreshold = slides_arr[0].offsetWidth * 0.35,
        trfRegExp = /([-0-9.]+(?=px))/,
        swipeStartTime,
        swipeEndTime,
        getEvent = function () {
            return (event.type.search('touch') !== -1) ? event.touches[0] : event;
        },
        slide = function () {
            if (transition) {
                sliderTrack.style.transition = 'transform .5s';
            }
            sliderTrack.style.transform = `translate3d(-${slideIndex * slideWidth}px, 0px, 0px)`;
        },
        swipeStart = function () {
            let evt = getEvent();

            if (allowSwipe) {

                swipeStartTime = Date.now();

                transition = true;

                nextTrf = (slideIndex + 1) * -slideWidth;
                prevTrf = (slideIndex - 1) * -slideWidth;

                posInit = posX1 = evt.clientX;
                posY1 = evt.clientY;

                sliderTrack.style.transition = '';

                document.addEventListener('touchmove', swipeAction);
                document.addEventListener('mousemove', swipeAction);
                document.addEventListener('touchend', swipeEnd);
                document.addEventListener('mouseup', swipeEnd);

                sliderList.classList.remove('grab');
                sliderList.classList.add('grabbing');
            }
        },
        swipeAction = function () {

            let evt = getEvent(),
                style = sliderTrack.style.transform,
                transform = +style.match(trfRegExp)[0];

            posX2 = posX1 - evt.clientX;
            posX1 = evt.clientX;

            posY2 = posY1 - evt.clientY;
            posY1 = evt.clientY;

            if (!isSwipe && !isScroll) {
                let posY = Math.abs(posY2);
                if (posY > 7 || posX2 === 0) {
                    isScroll = true;
                    allowSwipe = false;
                } else if (posY < 7) {
                    isSwipe = true;
                }
            }

            if (isSwipe) {
                if (slideIndex === 0) {
                    if (posInit < posX1) {
                        setTransform(transform, 0);
                        return;
                    } else {
                        allowSwipe = true;
                    }
                }

                // запрет ухода вправо на последнем слайде
                if (slideIndex === --slides_arr.length) {
                    if (posInit > posX1) {
                        setTransform(transform, lastTrf);
                        return;
                    } else {
                        allowSwipe = true;
                    }
                }

                if (posInit > posX1 && transform < nextTrf || posInit < posX1 && transform > prevTrf) {
                    reachEdge();
                    return;
                }

                sliderTrack.style.transform = `translate3d(${transform - posX2}px, 0px, 0px)`;
            }

        },
        swipeEnd = function () {
            posFinal = posInit - posX1;

            isScroll = false;
            isSwipe = false;

            document.removeEventListener('touchmove', swipeAction);
            document.removeEventListener('mousemove', swipeAction);
            document.removeEventListener('touchend', swipeEnd);
            document.removeEventListener('mouseup', swipeEnd);

            sliderList.classList.add('grab');
            sliderList.classList.remove('grabbing');

            if (allowSwipe) {
                swipeEndTime = Date.now();
                if (Math.abs(posFinal) > posThreshold || swipeEndTime - swipeStartTime < 300) {
                    if (posInit < posX1) {
                        slideIndex--;
                    } else if (posInit > posX1) {
                        slideIndex++;
                    }
                }

                if (posInit !== posX1) {
                    allowSwipe = false;
                    slide();
                } else {
                    allowSwipe = true;
                }

            } else {
                allowSwipe = true;
            }

        },
        setTransform = function (transform, comapreTransform) {
            if (transform >= comapreTransform) {
                if (transform > comapreTransform) {
                    sliderTrack.style.transform = `translate3d(${comapreTransform}px, 0px, 0px)`;
                }
            }
            allowSwipe = false;
        },
        reachEdge = function () {
            transition = false;
            swipeEnd();
            allowSwipe = true;
        };

    sliderTrack.style.transform = 'translate3d(0px, 0px, 0px)';
    sliderList.classList.add('grab');

    sliderTrack.addEventListener('transitionend', () => allowSwipe = true);
    slider.addEventListener('touchstart', swipeStart);
    slider.addEventListener('mousedown', swipeStart);
});