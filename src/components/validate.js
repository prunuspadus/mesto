export function initValidation(popupElement) {
  // Получаем элементы формы и кнопки
  const formElement = popupElement.querySelector('.popup__form');
  const inputList = Array.from(formElement.querySelectorAll('.popup__input'));
  const buttonElement = formElement.querySelector('.popup__button');


  const showInputError = (formElement, inputElement, errorMessage, settings) => {

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(settings.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(settings.errorActiveClass);
  };

  const hideInputError = (formElement, inputElement, settings) => {

    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(settings.inputErrorClass);
    errorElement.classList.remove(settings.errorActiveClass);
    errorElement.textContent = '';
  };

  const checkInputValidity = (formElement, inputElement, settings) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, settings);
    } else {
        hideInputError(formElement, inputElement, settings);
    }
  };

  const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
  };

  const toggleButtonState = (inputList, buttonElement, settings) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add(settings.inactiveButtonClass);
    } else {
        buttonElement.classList.remove(settings.inactiveButtonClass);
    }
  };

  // Устанавливаем обработчики событий для каждого элемента ввода
  inputList.forEach(inputElement => {
    inputElement.addEventListener('input', () => {
        checkInputValidity(inputElement);
        toggleButtonState();
    });
});

// Обрабатываем отправку формы
formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
    // Здесь можно добавить логику для обработки данных формы, если необходимо
});

// Проверяем состояние кнопки при загрузке страницы
toggleButtonState(); // Проверка состояния кнопки
  };