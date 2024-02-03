function closeProductModal() {
    // Закрываем модальное окно
    $('#productModal').modal('hide');
}

function createNextItem(imageSrc, imageAlt) {
    // Создаем новый элемент div
    var newItem = document.createElement('div');

    // Устанавливаем классы и атрибуты
    newItem.className = 'item animated fadeIn';
    newItem.innerHTML = '<img src="' + imageSrc + '" alt="' + imageAlt + '">';

    return newItem;
}

function getModal(event){
    let productModal = document.querySelector('#productModal');
    let modal = {
        carousel: document.getElementById('productCarousel'),
        title: document.getElementById('productModalTitle'),
        description: document.getElementById('productDescription'),
        descriptionList: document.querySelector('ul'),
        doc: document.querySelector('#documentationLink')
    }



    product_id = event.delegateTarget.getAttribute('data-card-id');

    $('#productModal').modal('show');

    let productId = product_id;
    // асинхронный запрос для получения данных о продукте
    fetch('http://127.0.0.1:8000/products/' + productId + '/')
        .then(response => response.json())
        .then(data => {
            modal.title.innerText = data.title;
            modal.description.innerText = data.description;
            modal.doc.href = data.documentation;
            modal.doc.target = 'blank';
            modal.carousel.classList.remove('owl-hidden');
            cleanChilds(modal.carousel);
            for(let i=0; i<data.images.length; i++){
                    modal.carousel.appendChild(createNextItem(data.images[i].images, "product_image"));
            }
            if(document.querySelector(".container-fluid.catalog-container.cumark")){
                modal.carousel.appendChild(createNextItem("/static/website/img/cumark_logo.png", "product_image"));
            }
            else{
                modal.carousel.appendChild(createNextItem("https://gmtcontrol.com/wp-content/uploads/2021/02/GMT-Kurumsal-e1614350380156.png", "product_image"));
            }
            $('#productCarousel').owlCarousel('destroy'); // Уничтожьте текущую карусель
            $('#productCarousel').owlCarousel({
                // Ваши настройки для Owl Carousel
                autoplay: true,
                smartSpeed: 1500,
                center: true,
                dots: false,
                loop: true,
                margin: 0,
                nav : true,
                navText: false,
                items: 1,
                // Добавьте другие настройки по необходимости
            });
            $('#productCarousel').on('mousewheel', '.owl-stage', function (e) {
                e.preventDefault();
                if (e.originalEvent.deltaY > 0) {
                    $('#productCarousel').trigger('next.owl');
                } else {
                    $('#productCarousel').trigger('prev.owl');
                }
            });
            let modalBody = document.querySelector(".modal-body");
            }
        )
        .catch(error => console.error('Ошибка запроса:', error));
}
function cleanChilds(parentContainer) {
    while (parentContainer.firstChild) {
        parentContainer.removeChild(parentContainer.firstChild);
    }
}

let cards = document.querySelectorAll('.card');
for(let i=0; i<cards.length; i++){
    cards[i].addEventListener("click", getModal);
}