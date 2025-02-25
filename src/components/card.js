// Функция для создания карточки
function createCard(cardData) {
    console.log("Создаем карточку для:", cardData);
    
    // Получаем шаблон
    const cardTemplate = document.getElementById('card-template').content;
    // Клонируем содержимое шаблона
    const cardElement = cardTemplate.cloneNode(true);
    
    // Находим элементы карточки
    const cardImage = cardElement.querySelector('.card__image');
    const cardTitle = cardElement.querySelector('.card__title');
    const likeButton = cardElement.querySelector('.card__like-button');
    const deleteButton = cardElement.querySelector('.card__delete-button');
  
    // Заполняем карточку данными
    cardImage.src = cardData.link;
    cardImage.alt = cardData.name;
    cardTitle.textContent = cardData.name;
  
    // Настраиваем кнопку лайка
    likeButton.addEventListener('click', function() {
        likeButton.classList.toggle('card__like-button_is-active'); 
    });
  
    // Настраиваем кнопку удаления
    deleteButton.addEventListener('click', function() {
        const card = deleteButton.closest('.card'); 
        card.remove(); 
    });
}

export {createCard};