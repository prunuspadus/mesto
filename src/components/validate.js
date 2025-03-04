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

const setEventListeners = (formElement, settings) => {
  const inputList = Array.from(formElement.querySelectorAll(settings.inputSelector));
  const buttonElement = formElement.querySelector(settings.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, settings);
  inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
          checkInputValidity(formElement, inputElement, settings);
          toggleButtonState(inputList, buttonElement, settings);
      });
  });
};

const enableValidation = (settings) => {
  const formList = Array.from(document.querySelectorAll(settings.formSelector));
  formList.forEach((formElement) => {
      formElement.addEventListener('submit', function (evt) {
          evt.preventDefault();
      });
      const fieldsetList = Array.from(formElement.querySelectorAll(settings.fieldsetSelector));
      fieldsetList.forEach((fieldset) => {
          setEventListeners(fieldset, settings);
      });
  });
};

export {showInputError, hideInputError, checkInputValidity, hasInvalidInput, toggleButtonState, setEventListeners, enableValidation};