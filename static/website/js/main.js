(function ($) {
    "use strict";


    
    
    // Initiate the wowjs
    new WOW().init();
    
    
   // Back to top button
   $(window).scroll(function () {

    if ($(this).scrollTop() > 300) {
        $('.back-to-top').fadeIn('slow');
    } else {
        $('.back-to-top').fadeOut('slow');
    }
    });
    $('.back-to-top').click(()=>{
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Team carousel
    $(".team-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: false,
        dots: false,
        loop: true,
        margin: 50,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });
    // Testimonial carousel



    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        center: true,
        dots: true,
        loop: true,
        margin: 0,
        nav : true,
        navText: false,
        responsiveClass: true,
        responsive: {
            0:{
                items:1
            },
            576:{
                items:1
            },
            768:{
                items:2
            },
            992:{
                items:3
            }
        }
    });


     // Fact Counter

     $(document).ready(function(){
        $('.counter-value').each(function(){
            $(this).prop('Counter',0).animate({
                Counter: $(this).text()
            },{
                duration: 2000,
                easing: 'easeInQuad',
                step: function (now){
                    $(this).text(Math.ceil(now));
                }
            });
        });
    });





    // if ($(window).width() < 768) {
    //     // Инициализация Owl Carousel для вашего слайдера
    //     $(".services-inner").owlCarousel({
    //         loop: true, // зацикленность карусели
    //         margin: 10, // отступ между слайдами
    //         responsiveClass: true,
    //         responsive: {
    //             0: {
    //                 items: 1, // отображать 1 элемент на мобильных устройствах
    //             },
    //             600: {
    //                 items: 2, // отображать 2 элемента при ширине экрана более 600px
    //             },
    //             1000: {
    //                 items: 3, // отображать 3 элемента при ширине экрана более 1000px
    //             },
    //         },
    //     });
    // }

    if ($(window).width() < 768) {
        $(".services-inner").owlCarousel({
            autoplay: true,
            smartSpeed: 1000,
            center: false,
            dots: false,
            loop: true,
            margin: 50,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1
                },
                768: {
                    items: 2
                },
                992: {
                    items: 3
                }
            }
        });
    }

    $(".partners-carusel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: false,
        dots: false,
        loop: true,
        margin: 50,
        responsiveClass: true,
        responsive: {
            0: {
                items: 3
            },
            768: {
                items: 5
            },
            992: {
                items: 6
            }
        }
    });


    $(".partners-cont").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        center: false,
        dots: false,
        loop: true,
        margin: 30,
        responsiveClass: true,
        responsive: {
            0: {
                items: 3
            },
            768: {
                items: 5
            },
            992: {
                items: 6
            },
            1200:{
                items: 8
            }
        }
    });


})(jQuery);

