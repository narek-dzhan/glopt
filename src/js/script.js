window.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.header__menu'),
    menuItem = document.querySelectorAll('.header__menu-item'),
    hamburger = document.querySelector('.header__hamburger'),
    price = document.querySelector('.price__wrapper');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('header__hamburger_active');
        menu.classList.toggle('header__menu_active');
    });

    menu.addEventListener('click', (event) => {
        if (!event.target.classList.contains("header__menu-link")) return;
        hamburger.classList.toggle('header__hamburger_active');
        menu.classList.toggle('header__menu_active');
    })

    price.addEventListener('click', (event) => {
        event.preventDefault();
        let general = event.target.closest('.price__item-content').querySelector('.price__item-content-general'),
        detail = event.target.closest('.price__item-content').querySelector('.price__item-content-detail');
        if (event.target.className == "price__item-content-detail-back" || event.target.closest('button') && event.target.closest('button').classList.contains('price__item-btn')) {
            general.classList.toggle('price__item-content-general_active');
            detail.classList.toggle('price__item-content-detail_active');
        }
    })
})

$(document).ready(function() {
    function validatingForms(form) {
        $(form).validate({
            rules: {
                name: 'required',
                email: {
                    required: true,
                    email: true
                },
                phone: {
                    required: true
                },
                text: {
                    required: true
                }
            },
            messages: {
                name: "Пожалуйста, введите свое имя",
                email: {
                  required: "Пожалуйста, введите адрес почты",
                  email: "Неправильно введен адрес почты"
                },
                phone: {
                    required: "Пожалуйста, введите номер телефона",
                    number: "Номер введен некорректно"
                },
                text: "Пожалуйста, опишите Ваш вопрос"
              }
        });
    }

    validatingForms($('.consultation__form'));
    validatingForms($('.questions__form'));
    validatingForms($('.modal__form'));

    $('.feedback__slider').slick({
        infinite: true,
        speed: 500,
        fade: true,
        slidesToShow: 1,
        prevArrow: '<button type="button" class="slick-prev"><img src="../icons/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="../icons/right.png"></button>',
    });

    $('input[name=phone]').mask("+7 (999) 999-99-99");

    $('.request').each(function() {
        $(this).on('click', function() {
            $('.overlay, #call').fadeIn('slow');
        })
    });

    $('.modal__close').on('click', function() {
        $('.overlay').fadeOut('slow');
    });

    $('form').submit(function(e) {
        e.preventDefault();
    
        if(!$(this).valid()) {
          return;
        };
    
        $.ajax({
          type: "POST",
          url: "mailer/smart.php",
          data: $(this).serialize()
        }).done(function() {
          $(this).find("input").val("");
          $('#consultation, #order').fadeOut();
          $('.overlay, #thanks').fadeIn('slow');
          $('form').trigger('reset');
        });
        return false;
      });
})