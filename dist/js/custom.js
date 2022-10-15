const nav = () => {
    const nav = document.querySelector('.js-nav');
    const navLinks = nav.querySelectorAll('.nav__item');
    const slideRect = nav.querySelector('.nav__slider-rect');
    const prices = document.querySelectorAll('.card__price--type');
    let priceType; 

    nav.addEventListener('click', (evt) => {
        if (!evt.target.classList.contains('nav__item')) {
            return;
        }
        evt.preventDefault();
 
        navLinks.forEach((item, index) => {
            item.classList.remove('active');
            console.log(index);
        });
 
 
        if (!evt.target.classList.contains('active')) {
            evt.target.classList.add('active');
            priceType = evt.target.getAttribute('data-type'); // Получаем имя таба, который нам нужен
            console.log(priceType);
            selectTabContent(priceType); // Запускаем функцию, чтобы показать выбранный таб
        }
        function selectTabContent(tab) {
            // Проходим по всем табам и проверяем есть ли у элемента класс, равный имени таба(переменной priceType). Если есть, то добавляем класс активного таба, если нет, то удаляем этот класс
            prices.forEach((item) => {
                let classList = item.classList;
                classList.contains(tab) ? classList.add('active') : classList.remove('active');
            });
        }

        slideRect.style.transform = `translateX(${evt.target.dataset.transform}%)`;
    });
};
nav();


// $(function() {
//     $('.js-preloader').preloadinator({
//         minTime: 2000,
//         afterRemovePreloader: function() {
//             $(this).remove();
//             $('body').removeClass('body-modal-open');
//         }
//     });
//     //menu
//     if(jQuery('.menu-toggle').length) {
//         var menu = $('.menu-toggle');
//         menu.on('click', function(){
//             $('.main-menu').toggleClass('active');
//             $('.menu-toggle').toggleClass('active');
//             $('body').toggleClass('body-modal-open');
//         });
//         $('.main-menu').mouseup(function (e){ // событие клика по веб-документу
//             var div = $(".main-menu ul"); // тут указываем ID элемента
//             var close = $('.menu-toggle');
//             if (close.is(e.target)) {
        
//             } else if (!div.is(e.target) // если клик был не по нашему блоку
//             && div.has(e.target).length === 0) { // и не по его дочерним элементам
//                 $('.main-menu').toggleClass('active');
//                 $('.menu-toggle').toggleClass('active');
//                 $('body').toggleClass('body-modal-open');
              
//             }
//         });
//     }

//     //popup
//     if(jQuery('.modal__wrap').length) {
//         let modalWrap = $('.modal__wrap');
//         //popup
//         $(".modal-open").click(function (e){
//           e.preventDefault();
//           var btn = $(this);
//           var numModal = btn.attr('href');
//           if(numModal == '#modalQuiz'){

//             $('.qa-del-discount').css('display', 'block');
//           }
//           var modal =  $(numModal);
//         //   modalWrap.removeClass('fadeOutUp');
//         //   modalWrap.addClass('fadeInDown');
//           modalWrap.removeClass('animated zoomOut');
//           modalWrap.addClass('animated zoomIn');
//           modal.removeClass('disabled');
//           modal.addClass('flex');
//           $('body').addClass('body-modal-open');
//           // body.addClass('body-modal');

//         });
//         $('.modal-close').click(function (){
//             if ( window.innerWidth < 750 || window.screen.width < 750) {
//                 $('.main-menu').removeClass('active');
//                 $('.menu-toggle').removeClass('active');
//             }
//             // modalWrap.removeClass('fadeInDown');
//             // modalWrap.addClass('fadeOutUp');
//             modalWrap.removeClass('animated zoomIn');
//             modalWrap.addClass('animated zoomOut');
//             setTimeout(function() {
//                 $('.modal').addClass('disabled');
//                 }, 700);
//             setTimeout(function() {
//                 $('.modal').removeClass('flex');
//                 $('body').removeClass('body-modal-open');
//                 }, 800);  
//         });
//         $('.modal').mouseup(function (e){ // событие клика по веб-документу
//           var div = $(".modal__body"); // тут указываем ID элемента
//           var close = $('.modal-close');
//           if (close.is(e.target)) {
//           } else if (!div.is(e.target) // если клик был не по нашему блоку
//           && div.has(e.target).length === 0) { // и не по его дочерним элементам
//                 $('.main-menu').removeClass('active');
//                 $('.menu-toggle').removeClass('active');
//                 var modalWrap = $('.modal__wrap');
//                 // modalWrap.removeClass('fadeInDown');
//                 // modalWrap.addClass('fadeOutUp');
//                 modalWrap.removeClass('animated zoomIn');
//                 modalWrap.addClass('animated zoomOut');
//                 setTimeout(function() {
//                     $('.modal').addClass('disabled');
//                 }, 700);
//                 setTimeout(function() {
//                     $('.modal').removeClass('flex');
//                     $('body').removeClass('body-modal-open');
//                 }, 800);
//           }
//         });
//     }

// });

