const nav = () => {
    const nav = document.querySelector(".js-nav");
    const navLinks = nav.querySelectorAll(".nav__item");
    const slideRect = nav.querySelector(".nav__slider-rect");
    const prices = document.querySelectorAll('.card__price--type');
    let priceType; 

    nav.addEventListener("click", (evt) => {
       if (!evt.target.classList.contains("nav__item")) {
          return;
       }
       evt.preventDefault();
 
       navLinks.forEach((item, index) => {
          item.classList.remove("active");
          console.log(index);
       });
 
 
       if (!evt.target.classList.contains("active")) {
          evt.target.classList.add("active");
          priceType = evt.target.getAttribute('data-type');
          selectTabContent(priceType); 
       }
       function selectTabContent(tab) {
         prices.forEach((item) => {
             let classList = item.classList;
             classList.contains(tab) ? classList.add('active') : classList.remove('active');
         });
      }

       slideRect.style.transform = `translateX(${evt.target.dataset.transform}%)`;
    });
 };
 nav();