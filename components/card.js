const initialCards = [
    {
      name: "Архыз",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
      name: "Челябинская область",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
      name: "Иваново",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
      name: "Камчатка",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
      name: "Холмогорский район",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
      name: "Байкал",
      link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    }
];

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

  // Добавляем обработчик для открытия поп-апа с изображением
  cardImage.addEventListener('click', function() {
      imagePopupImage.src = cardData.link; 
      imagePopupImage.alt = cardData.name; 
      imagePopupTitle.textContent = cardData.name; 
      openModal(imagePopup); // Открываем поп-ап
  });

  console.log("Карточка создана:", cardElement);

  // Возвращаем готовую карточку
  return cardElement;
}

// Функция для заполнения карточки
function fillFormCard() {
  // Оставим поля пустыми, чтобы пользователь мог вводить новые данные
  cardName.value = ''; 
  cardUrl.value = '';

  // Открытие попапа
  openModal(cardPopup);
}

// ПОП-АП ДОБАВЛЕНИЕ КАРТОЧЕК
const editButtonCard = document.querySelector('.profile__add-button');
const closeButtonCard = cardPopup.querySelector('.popup__close');

// Сохранение данных и закрытие поп-апа карточки
const cardFormElement = cardPopup.querySelector('.popup__form'); 

// Функция для обработки отправки формы карточки
function handleCardFormSubmit(evt) {
    evt.preventDefault(); 

    // Получение значений полей cardName и cardUrl из свойства value
    const n = cardName.value;
    const l = cardUrl.value;

    // Оформляем данные для подачи в функцию
    const cardData = {
        name: n,
        link: l,
    };

    // Создаем новую карточку
    const card = createCard(cardData);
    
    // Добавляем карточку в начало контейнера
    placesList.prepend(card); // Используем prepend для добавления в начало

    // Закрываем попап после сохранения
    closeModal(cardPopup);
}

// Обработчик события отправки формы карточки
cardFormElement.addEventListener('submit', handleCardFormSubmit);