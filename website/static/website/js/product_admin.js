document.addEventListener('DOMContentLoaded', function() {
    let subcats = {};
    let selected = []

    function presetForEdit(){
        const subcatSelect = document.getElementById('id_subcat');
        let selectedOptions = subcatSelect.selectedOptions;
        if(selectedOptions!=null){
            for (let i = 0; i < selectedOptions.length; i++) {
                let option = selectedOptions[i];
                selected.push(option.value);
            }
        }
    }
    presetForEdit();
    function updateSubcatChoices() {
        const catSelect = document.getElementById('id_cat');
        const subcatSelect = document.getElementById('id_subcat');

        const selectedCat = catSelect.value;

        // Очистка текущих вариантов subcat
        while (subcatSelect.options.length > 0) {
            subcatSelect.remove(0);
        }

        if (selectedCat in subcats) {
            subcats[selectedCat].forEach(subcat => {
                const option = new Option(subcat.title, subcat.id);
                for(let i=0; i<selected.length; i++){
                    if(subcat.id == selected[i]){
                        option.selected = true;
                    }
                }
                subcatSelect.add(option);
            });
        } else {
            console.log("Request sent");
            // Запрос на сервер для получения подкатегорий для выбранной категории
            const xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function() {
                if (xhr.readyState === XMLHttpRequest.DONE) {
                    if (xhr.status === 200) {
                        const data = JSON.parse(xhr.responseText);
                        subcats[selectedCat] = data;

                        // Обновление вариантов subcat
                        data.forEach(subcat => {
                            const option = new Option(subcat.title, subcat.id);
                            for(let i=0; i<selected.length; i++){
                                if(subcat.id == selected[i]){
                                    option.selected = true;
                                }
                            }
                            subcatSelect.add(option);
                        });
                    }
                }
            };

            xhr.open('GET', `/get_subcategories/?cat=${selectedCat}`, true);
            xhr.send();
        }
    }

    // При изменении cat вызвать функцию обновления subcat
    document.getElementById('id_cat').addEventListener('change', updateSubcatChoices);

    // Первоначальное обновление subcat при загрузке страницы
    updateSubcatChoices();
});
