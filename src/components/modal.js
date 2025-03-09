//     // Общие функции (закрытие/открытие окна)
//     function openPopup(popup) {
//         popup.classList.add('popup_opened');
//          // Добавляем слушатель на document
//         document.addEventListener('keydown', closeByEsc);
//     }

//     function closePopup(popup) {
//         if (popup) {
//             popup.classList.remove('popup_opened');
//             // Удаляем слушатель с document
//             document.removeEventListener('keydown', closeByEsc);
//         }
//     }

//     // Функция для закрытия поп-апа кликом на оверлей
//     function closeOnOverlayClick(popup) {
//         const overlay = popup.querySelector('.popup__overlay'); // Замените '.popup__overlay' на ваш селектор оверлея
//         overlay.addEventListener('click', () => closePopup(popup));
//     }

//     // Функция для закрытия поп-апа клавищей Esc
//     function closeByEsc(evt) {
//         if (evt.key === "Escape"){
//             const openedPopup = document.querySelector('.popup_opened');
//             closePopup(openedPopup);      
//         } 
//     }


// Общие функции (закрытие/открытие окна)
function isKeyEscape(evt) {
    const popup = document.querySelector('.popup_is-opened');
    if (evt.key == 'Escape' && popup) {
        popup.classList.remove('popup_is-opened');
    }
}

function isOverlay(evt) {
    if (evt.currentTarget == evt.target) {
        evt.target.classList.remove('popup_is-opened');
    }
}

export function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', isKeyEscape);
    popup.addEventListener('click', isOverlay);
    // Инициализация валидации при открытии поп-апа
    if (popup === profilePopup) {
        initValidation(profilePopup); // Передаем форму профиля
    } else if (popup === cardPopup) {
        initValidation(cardPopup); // Передаем форму карточки
    }
}

export function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', isKeyEscape);
    popup.removeEventListener('click', isOverlay);

}
// export {openPopup, closePopup};