import '../pages/index.css';
import { initialCards } from '../components/cards.js';
import { createCard } from '../components/card.js';
import { openPopup, closePopup, profilePopup, cardPopup, imagePopup } from '../components/modal.js';
import { enableValidation } from './validate.js'; // Убедитесь, что вы импортируете валидацию

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM полностью загружен и разобран");

    // Добавляем каждому поп-апу плавность
    profilePopup.classList.add('popup_is-animated');
    cardPopup.classList.add('popup_is-animated');
    imagePopup.classList.add('popup_is-animated');

    // Поля формы профиля
    const nameInput = profilePopup.querySelector('.popup__input_type_name');
    const aboutInput = profilePopup.querySelector('.popup__input_type_description');

    // Поля формы карточки
    const cardName = cardPopup.querySelector('.popup__input_type_card-name');
    const cardUrl = cardPopup.querySelector('.popup__input_type_url');

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
        closePopup(imagePopup, validationSettings);
    });

    // Функция для заполнения профиля
    function fillFormProfile() {
        const userName = document.querySelector('.profile__title').textContent;
        const userAbout = document.querySelector('.profile__description').textContent;

        // Заполнение полей формы
        nameInput.value = userName;
        aboutInput.value = userAbout;

        // Открытие попапа
        openPopup(profilePopup);
    }

    // Функция для заполнения карточки
    function fillFormCard() {
        // Оставим поля пустыми, чтобы пользователь мог вводить новые данные
        cardName.value = ''; 
        cardUrl.value = '';

        // Открытие попапа
        openPopup(cardPopup);
    }

    // ПОП-АП РЕДАКТИРОВАНИЯ ПРОФИЛЯ
    const editButtonProfile = document.querySelector('.profile__edit-button');
    const closeButtonProfile = profilePopup.querySelector('.popup__close');

    // Открытие поп-апа с заполнением формы
    editButtonProfile.addEventListener('click', fillFormProfile);

    // Закрытие поп-апа
    closeButtonProfile.addEventListener('click', function() {
        closePopup(profilePopup, validationSettings);
    });

    // Сохранение данных и закрытие поп-апа профиля
    const profileFormElement = profilePopup.querySelector('.popup__form'); 

    function handleProfileFormSubmit(evt) {
        evt.preventDefault(); 

        // Получите значение полей newName и newJob из свойства value
        const n = nameInput.value;
        const j = aboutInput.value;

        // Находим элементы, куда должны быть вставлены новые значения
        const userNameElement = document.querySelector('.profile__title');
        const userJobElement = document.querySelector('.profile__description');

        // Вставьте новые значения с помощью textContent
        userNameElement.textContent = n; // Обновляем имя профиля
        userJobElement.textContent = j; // Обновляем описание профиля

        // Закрываем попап после сохранения
        closePopup(profilePopup, validationSettings);
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
        closePopup(cardPopup, validationSettings);
    });

    // Сохранение данных и закрытие поп-апа карточки
    const cardFormElement = cardPopup.querySelector('.popup__form'); 

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
        closePopup(cardPopup, validationSettings);
    }

    // Обработчик события отправки формы карточки
    cardFormElement.addEventListener('submit', handleCardFormSubmit);
});

const validationSettings = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active'
}

enableValidation(validationSettings);