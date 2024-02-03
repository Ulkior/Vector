function toggleActiveClass(clickedButton) {
    if (clickedButton.classList.contains('buttons__filter')){
        const filtercategory = document.querySelectorAll(".buttons__filter");
        filtercategory.forEach(function (i) {
            i.classList.remove("filter__active");
        });
        clickedButton.classList.add("filter__active");
    }
    if (clickedButton.classList.contains('buttons__category')){
        const filtercategory = document.querySelectorAll(".buttons__category");
        filtercategory.forEach(function (i) {
            i.classList.remove("category__active");
        });
        clickedButton.classList.add("category__active");
    }
}

    let productCarousel = $('#productCarousel');
    productCarousel.owlCarousel({
        loop: true,
        margin: 10,
        responsive:{
            0:{
                items: 1
            },
            600:{
                items: 1
            },
            1000:{
                items: 1
            }
        },
        autoplay: true, // Включение автоматического воспроизведения
        autoplayTimeout: 3000 // Интервал между слайдами в миллисекундах
    });


function catOpen(){
    if($('.cat-list').hasClass('active')){
        $('.cat-list').removeClass('active');
        $('.fa-chevron-down').removeClass('active');
    }
    else{
        $('.cat-list').addClass('active');
        $('.fa-chevron-down').addClass('active');
    }
}


document.addEventListener("DOMContentLoaded", function () {
    setTimeout(()=>{
        // Hide preloader
        let preloader = document.getElementById("preloader");
        preloader.classList.add("hide");

        let content = document.querySelector('#root');
        content.classList.add("show");


        // Show content
    }, 2000); // Adjust the time according to your needs
});





$('#dropdownMenuButton').click(()=>{
    $('#exampleModal').modal('show');
})