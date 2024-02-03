const cats = document.querySelectorAll('.buttons__category');
const subcats = document.querySelectorAll('.buttons__filter');
const ACTIVE_SUBCAT = 'filter__active';
const ACTIVE_CAT = 'category__active';
const FILTER_BTN = 'buttons__filter';
const CAT_BTN = 'buttons__category';
let catsContainer = '';
let subcatsContainer = '';
const productContainer = document.querySelector('.inner-catalog-grid');

let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;

if (screenWidth <= 990) {
    catsContainer = document.querySelector('.mobile-cat-field');
    subcatsContainer = document.querySelector('.produkt__filter__phone');
} else {
    catsContainer = document.querySelector('.cat-field');
    subcatsContainer = document.querySelector('.subcats');
}

let data = undefined;

async function getProducts() {
    const apiCat = 'http://127.0.0.1:8000/api/cats/';
    const apiSubcat = 'http://127.0.0.1:8000/api/subcats/';
    const apiProduct = 'http://127.0.0.1:8000/api/products/';

    try {
        const [dataCats, dataSubcats, dataProducts] = await Promise.all([
            fetch(apiCat).then(response => response.json()),
            fetch(apiSubcat).then(response => response.json()),
            fetch(apiProduct).then(response => response.json())
        ]);

        return {
            cats: dataCats,
            subcats: dataSubcats,
            products: dataProducts
        };
    } catch (error) {
        console.error('Ошибка запроса:', error);
        throw error;
    }
}

async function getProductPhotos(productId) {
    const apiPhoto = `http://127.0.0.1:8000/api/photo/?product=${productId}`;
    try {
        const response = await fetch(apiPhoto);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Ошибка запроса фотографий продукта:', error);
        throw error;
    }
}

function createButton(buttonElement, classname, activeClass, isActive) {
    function toggleActiveClass(element) {
        let initClass = element.className;
        let elements = document.querySelectorAll(`.${initClass}`);
        let toggleAdded = element.classList.toggle(activeClass);

        if (initClass == 'buttons__category') {
            for (let el = 0; el < elements.length; el++) {
                if (elements[el] != element) {
                    elements[el].classList.remove(activeClass);
                }
            }
            if (screenWidth <= 990) {
                $('#dropdownMenuButton').text(element.innerText);
            }
            renderCatalog(element.value, [buttonElement.subcat[0]]);
        }
        if (initClass.includes('buttons__filter')) {
            let elements = document.querySelectorAll('.buttons__filter');
            let fillter = [];
            if (toggleAdded) {
                for (let el = 0; el < elements.length; el++) {
                    if (elements[el].classList.contains(activeClass)) {
                        fillter.push(elements[el].value);
                    }
                }
            } else {
                for (let el = 0; el < elements.length; el++) {
                    if (elements[el].classList.contains(activeClass)) {
                        fillter.push(elements[el].value);
                    }
                    if (elements[el].value == element.value) {
                        fillter.slice(el);
                    }
                }
            }
            function getActiveCategoryValue() {
                let button = document.querySelector('.buttons__category.category__active');
                return button ? button.value : null;
            }
            let activeCategoryValue = getActiveCategoryValue();

            renderCatalog(activeCategoryValue, fillter);
        }
    }

    const button = document.createElement('button');
    button.className = classname;
    button.textContent = buttonElement.title || 'Click me';
    button.value = buttonElement.id || '';
    if (isActive) {
        button.classList.add(activeClass);
    }
    if(classname == 'buttons__filter' && screenWidth <= 990){
        button.classList.add('filter__carts');
    }
    button.onclick = function () {
        toggleActiveClass(this);
        if (screenWidth <= 990) {
            $('#exampleModal').modal('hide');
        }
    };

    return button;
}

function hasSubcats(catId, data) {
    const cat = data.cats.find(c => c.id === catId);
    return cat && cat.subcat.length > 0;
}


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
            modal.carousel.appendChild(createNextItem("https://gmtcontrol.com/wp-content/uploads/2021/02/GMT-Kurumsal-e1614350380156.png", "product_image"));
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

function createProductCard(productName, productId) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card product-card-appear'; // Добавим класс анимации
    cardDiv.setAttribute('data-bs-target', '#productModal');
    cardDiv.setAttribute('data-bs-toggle', 'modal');
    cardDiv.style.width = '18rem';

    const imgElement = document.createElement('img');
    imgElement.className = 'card-img-top';
    imgElement.alt = 'Product Image';
    imgElement.src = ''; // Здесь мы используем переданное изображение

    const cardBodyDiv = document.createElement('div');
    cardBodyDiv.className = 'card-body';

    const cardTitle = document.createElement('h5');
    cardTitle.className = 'card-title';
    cardTitle.textContent = productName;

    cardBodyDiv.appendChild(cardTitle);

    cardDiv.appendChild(imgElement);
    cardDiv.appendChild(cardBodyDiv);
    cardDiv.setAttribute("data-card-id", productId);
    let test={
         "id": 7,
    "images": [
        {
            "id": 2,
            "images": "http://127.0.0.1:8000/media/products/fotka.jpg",
            "product": 7
        }
    ],
    "title": "GTC12S – Контроллер температуры",
    "documentation": "https://gmtcontrol.com/wp-content/uploads/2023/06/GTC12S_KULLANIM_KILAVUZU20230616TR.pdf",
    "description": "• Технология цифровой калибровки для входных измерений\r\n•  Поддержка различных термопар и термосопротивлений\r\n• Управление автоматической настройкой (AT)\r\n•  Монтаж на DIN-рейке\r\n• Удобный интерфейс управления\r\n• Его можно легко адаптировать к вашим панелям с питанием 24 В постоянного тока.\r\n• Расширенные возможности защиты от помех для работы в неблагоприятных промышленных условиях.",
    "cat": 17,
    "subcat": []
    }
    cardDiv.onclick = getModal;

    return cardDiv;
}

function cleanChilds(parentContainer) {
    while (parentContainer.firstChild) {
        parentContainer.removeChild(parentContainer.firstChild);
    }
}

async function renderProducts(subcats, products, parentContainer, activeCat = undefined) {
    cleanChilds(parentContainer);

    let productCards = [];

    if (subcats === undefined) {
        for (let p = 0; p < products.length; p++) {
            if (products[p].cat == activeCat.id) {
                const productCard = createProductCard(products[p].title, products[p].id);

                const photos = await getProductPhotos(products[p].id);
                if (photos.length > 0) {
                    productCard.querySelector('.card-img-top').src = photos[0].images;
                }

                // Добавим классы для анимации
                productCard.classList.add('product-card-appear');
                productCard.classList.add('active');

                productCards.push(productCard);
            }
        }
    } else {
        for (let s = 0; s < subcats.length; s++) {
            for (let p = 0; p < products.length; p++) {
                if (products[p].subcat && Array.isArray(products[p].subcat) && products[p].subcat.includes(subcats[s].id)) {
                    const productCard = createProductCard(products[p].title, products[p].id);

                    const photos = await getProductPhotos(products[p].id);
                    if (photos.length > 0) {
                        productCard.querySelector('.card-img-top').src = photos[0].images;
                    }

                    // Добавим классы для анимации
                    productCard.classList.add('product-button-appear');
                    productCard.classList.add('active');

                    productCards.push(productCard);
                }
            }
        }
    }

    // Добавим все карточки продуктов в родительский контейнер
    productCards.forEach((card) => {
        parentContainer.appendChild(card);

        // Добавим класс анимации кнопке
        const buttons = card.querySelectorAll('.your-button-selector'); // Замените 'your-button-selector' на ваш селектор кнопки
        buttons.forEach(button => {
            button.classList.add('product-button-appear');
        });
    });
}

function returnActiveElements(catId, subcatId, data) {
    let activeCat = null;
    let activeSubcat = [];

    if (data && data.cats && Array.isArray(data.cats)) {
        for (let i = 0; i < data.cats.length; i++) {
            if (catId == data.cats[i].id) {
                activeCat = data.cats[i];
                break;
            }
        }
    }

    if (data && data.subcats && Array.isArray(data.subcats) && Array.isArray(subcatId)) {
        for (let s = 0; s < data.subcats.length; s++) {
            for (let sId = 0; sId < subcatId.length; sId++) {
                if (subcatId[sId] == data.subcats[s].id) {
                    activeSubcat.push(data.subcats[s]);
                }
            }
        }
    }

    if (activeCat.subcat.length === 0) {
        activeSubcat = undefined;
    }
    return { activeCat: activeCat, activeSubcat: activeSubcat };
}

function renderCats(cats, active, parentContainer) {
    if (parentContainer.childNodes.length > 0) {

    } else {
        for (let i = 0; i < cats.length; i++) {
            if(cats[i].id == 18){

            }
            else{
                if (active.id == cats[i].id) {
                    parentContainer.appendChild(createButton(cats[i], CAT_BTN, ACTIVE_CAT, true));
                } else {
                    parentContainer.appendChild(createButton(cats[i], CAT_BTN, ACTIVE_CAT));
                }
            }
        }
    }
}

function renderSubcats(subcats, actives, parentContainer, activeCat) {
    while (parentContainer.firstChild) {
        parentContainer.removeChild(parentContainer.firstChild);
    }
    for (let i = 0; i < subcats.length; i++) {
        let render = true;
        if (activeCat.subcat.includes(subcats[i].id)) {
            for (let a = 0; a < actives.length; a++) {
                if (actives[a].id == subcats[i].id) {
                    subcatsContainer.appendChild(createButton(subcats[i], FILTER_BTN, ACTIVE_SUBCAT, true));
                    render = false;
                    break;
                }
            }
            if(render){
                subcatsContainer.appendChild(createButton(subcats[i], FILTER_BTN, ACTIVE_SUBCAT));
            }
        }
    }
}

async function renderCatalog(activeCat = 7, activeSubcat = [28,]) {
    try {
        if (data == undefined) {
            data = await getProducts();
        }
        let activeElements = returnActiveElements(activeCat, activeSubcat, data);
        if (catsContainer.childElementCount === 0) {
            renderCats(data.cats, activeElements.activeCat, catsContainer);
        }

        // Добавим проверку наличия и непустоты поля subcat у activeCat
        if (activeElements.activeCat.subcat.length === 0) {
            cleanChilds(subcatsContainer);
            resizeBlock();
            renderProducts(activeElements.activeSubcat, data.products, productContainer, activeElements.activeCat);
        } else {
            renderSubcats(data.subcats, activeElements.activeSubcat, subcatsContainer, activeElements.activeCat);

            // Добавим проверку наличия и непустоты поля subcat у activeCat
            if (activeElements.activeCat.subcat.length > 0) {
                resizeBlock();
                renderProducts(activeElements.activeSubcat, data.products, productContainer);
            } else {
                cleanChilds(subcatsContainer);
                resizeBlock();
                renderProducts([], data.products, productContainer, activeElements.activeCat);
            }
        }
    } catch (error) {
        console.error('Ошибка внешнего кода:', error);
    }
}


async function init() {
    try {
        data = await getProducts();
        renderCatalog();
    } catch (error) {
        console.error('Ошибка инициализации:', error);
    }
}

document.addEventListener('DOMContentLoaded', init);





function resizeBlock() {
            let blockA = document.querySelector('#filters_sidebar');
            let blockC = document.querySelector('#cats_sidebar');
            let blockB = document.querySelector('#main_blog');

            // Set the height of both blockA and blockB to the maximum height



            // Get the maximum height of blockA and blockC
            let maxHeight = Math.max(blockA.offsetHeight, blockC.offsetHeight);

            // Set the height of blockB to the maximum height
            blockA.style.height = maxHeight + 'px';
            blockC.style.height = maxHeight + 'px';
            blockB.style.height = maxHeight + 'px';
};


window.onload = resizeBlock