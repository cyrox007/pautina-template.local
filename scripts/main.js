document.addEventListener("DOMContentLoaded", ()=>{
    let url = window.location.pathname;
    let url1 = url.substring(1);

    let links = document.querySelectorAll('.header__link');
    
    links.forEach(element => {
        if (element.getAttribute('href') == url1) {
            element.classList.toggle('active')
        }
    });

    let mobileNav = document.querySelector('.header__mobile-nav');
    let mobileBtn = document.querySelector('.header__mobile-btn');
    mobileBtn.addEventListener('click', ()=>{
        mobileBtn.classList.toggle('active');
        mobileNav.classList.toggle('visible');
    });

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
});