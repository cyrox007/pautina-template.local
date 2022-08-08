document.addEventListener("DOMContentLoaded", ()=>{
    let url = window.location.pathname;
    let links = document.querySelectorAll('.header__link');
    
    links.forEach(element => {
        if (element.getAttribute('href') == url) {
            element.classList.toggle('active')
        }
    });

    let mobileNav = document.querySelector('.header__mobile-nav');
    let mobileBtn = document.querySelector('.header__mobile-btn');
    mobileBtn.addEventListener('click', ()=>{
        mobileBtn.classList.toggle('active');
        mobileNav.classList.toggle('visible');
    });
});