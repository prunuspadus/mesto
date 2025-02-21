document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM полностью загружен и разобран");

    // Инициализируем переменные для поп-апов
    const profilePopup = document.querySelector('.popup_type_edit');
    const cardPopup = document.querySelector('.popup_type_new-card');
    const imagePopup = document.querySelector('.popup_type_image');
        
    //добавляем каждому поп-апу плавность
    profilePopup.classList.add('popup_is-animated');
    cardPopup.classList.add('popup_is-animated');
    imagePopup.classList.add('popup_is-animated');


    // Элементы для поп-апа изображения
    const imagePopupImage = imagePopup.querySelector('.popup__image');
    const imagePopupTitle = imagePopup.querySelector('.popup__caption');

    // Поля формы профиля
    const nameInput = profilePopup.querySelector('.popup__input_type_name');
    const aboutInput = profilePopup.querySelector('.popup__input_type_description');

    // Поля формы карточки
    const cardName = cardPopup.querySelector('.popup__input_type_card-name');
    const cardUrl = cardPopup.querySelector('.popup__input_type_url');


    // Общие функции (закрытие/открытие окна)
    function openModal(popup) {
        popup.classList.add('popup_is-opened');
    }

    function closeModal(popup) {
        popup.classList.remove('popup_is-opened');

    }

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

    // Получаем контейнер для карточек
    const placesList = document.querySelector('.places__list');
    console.log("Контейнер для карточек найден:", placesList);

    // Перебираем массив и добавляем карточки в разметку
    initialCards.forEach(cardData => {
        const card = createCard(cardData);
        placesList.append(card);
        console.log("Карточка добавлена в контейнер:", card);
    });

    console.log("Все карточки добавлены в контейнер.");

    // Закрытие поп-апа для изображения
    const closeButtonImage = imagePopup.querySelector('.popup__close');

    closeButtonImage.addEventListener('click', function() {
        closeModal(imagePopup);
    });

    // Функция для заполнения профиля
    function fillFormProfile() {
        const userName = document.querySelector('.profile__title').textContent;
        const userAbout = document.querySelector('.profile__description').textContent;

        // Заполнение полей формы
        nameInput.value = userName;
        aboutInput.value = userAbout;

        // Открытие попапа
        openModal(profilePopup);
    }

    // Функция для заполнения карточки
    function fillFormCard() {
        // Оставим поля пустыми, чтобы пользователь мог вводить новые данные
        cardName.value = ''; 
        cardUrl.value = '';

        // Открытие попапа
        openModal(cardPopup);
    }

    // ПОП-АП РЕДАКТИРОВАНИЯ ПРОФИЛЯ
    const editButtonProfile = document.querySelector('.profile__edit-button');
    const closeButtonProfile = profilePopup.querySelector('.popup__close');

    // Открытие поп-апа с заполнением формы
    editButtonProfile.addEventListener('click', fillFormProfile);

    // Закрытие поп-апа
    closeButtonProfile.addEventListener('click', function() {
        closeModal(profilePopup);
    });

    // Сохранение данных и закрытие поп-апа профиля
    const profileFormElement = profilePopup.querySelector('.popup__form'); 

    // Находим поля формы в DOM
    const newName = profilePopup.querySelector('.popup__input_type_name');
    const newJob = profilePopup.querySelector('.popup__input_type_description');

    function handleProfileFormSubmit(evt) {
        evt.preventDefault(); 

        // Получите значение полей newName и newJob из свойства value
        const n = newName.value;
        const j = newJob.value;

        // Находим элементы, куда должны быть вставлены новые значения
        const userNameElement = document.querySelector('.profile__title');
        const userJobElement = document.querySelector('.profile__description');

        // Вставьте новые значения с помощью textContent
        userNameElement.textContent = n; // Обновляем имя профиля
        userJobElement.textContent = j; // Обновляем описание профиля

        // Закрываем попап после сохранения
        closeModal(profilePopup);
    }

    // Обработчик события отправки формы профиля
    profileFormElement.addEventListener('submit', handleProfileFormSubmit);

    // ПОП-АП ДОБАВЛЕНИЕ КАРТОЧЕК
    const editButtonCard = document.querySelector('.profile__add-button');
    const closeButtonCard = cardPopup.querySelector('.popup__close');

    // Открытие поп-апа с заполнением формы
    editButtonCard.addEventListener('click', fillFormCard);

    // Закрытие поп-апа
    closeButtonCard.addEventListener('click', function() {
        closeModal(cardPopup);
    });

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
});
