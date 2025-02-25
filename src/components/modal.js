    // Общие функции (закрытие/открытие окна)
    function openPopup(popup) {
        popup.classList.add('popup_is-opened');
         // Добавляем слушатель на document
        document.addEventListener('keydown', closeByEsc);
    }

    function closePopup(popup) {
        if (popup) {
            popup.classList.remove('popup_is-opened');
            // Удаляем слушатель с document
            document.removeEventListener('keydown', closeByEsc);
        }
    }

    // Функция для закрытия поп-апа кликом на оверлей
    function closeOnOverlayClick(popup) {
        const overlay = popup.querySelector('.popup__overlay'); // Замените '.popup__overlay' на ваш селектор оверлея
        overlay.addEventListener('click', () => closePopup(popup));
    }

    // Функция для закрытия поп-апа клавищей Esc
    function closeByEsc(evt) {
        if (evt.key === "Escape"){
            const openedPopup = document.querySelector('.popup_opened');
            closePopup(openedPopup);      
        } 
    }

export {openPopup, closePopup, closeOnOverlayClick, closeByEsc};