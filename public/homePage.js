'use strict';

const logoutUser = new LogoutButton(); //выход из личного кабинета
logoutUser.action = () => {
    ApiConnector.logout(response => {
        if (response.success) {
            location.reload();
        }
    });
};

ApiConnector.current(response => { //получение информации о пользователе
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard(); //получение текущих курсов валюты
const getCourse = () => {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
};
getCourse();
setInterval(getCourse, 60000);

const moneyManagerUser = new MoneyManager(); //операции с деньгами
moneyManagerUser.addMoneyCallback = data => { //пополнение счёта
    ApiConnector.addMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManagerUser.setMessage(response.success, 'Счёт был успешно пополнен');
        }
        else {
            moneyManagerUser.setMessage(response.success, response.error);
        }
    });
};
moneyManagerUser.conversionMoneyCallback = data => { //конвертирование валюты
    ApiConnector.convertMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManagerUser.setMessage(response.success, 'Валюта была успешно конвертирована');
        }
        else {
            moneyManagerUser.setMessage(response.success, response.error);
        }
    });
};
moneyManagerUser.sendMoneyCallback = data => { //перевод валюты
    ApiConnector.transferMoney(data, response => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
            moneyManagerUser.setMessage(response.success, 'Перевод был успешно выполнен');
        }
        else {
            moneyManagerUser.setMessage(response.success, response.error);
        }
    });
};

const favoritesWidget = new FavoritesWidget(); //работа с избранным
const getFavorites = () => { //начальный список избранного
    ApiConnector.getFavorites(response => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManagerUser.updateUsersList(response.data);
        }
    });
};
getFavorites();
favoritesWidget.addUserCallback = data => { //добавления пользователя в список избранных
    ApiConnector.addUserToFavorites(data, response => {
        if (response.success) {
            moneyManagerUser.setMessage(response.success, 'Пользователь был успешно добавлен в список Избранное');
            getFavorites();
        }
        else {
            moneyManagerUser.setMessage(response.success, response.error);
        }
    });
};
favoritesWidget.removeUserCallback = data => { //удаление пользователя из избранного
    ApiConnector.removeUserFromFavorites(data, response => {
        if (response.success) {
            moneyManagerUser.setMessage(response.success, 'Пользователь был успешно удален из списка Избранное');
            getFavorites();
        }
        else {
            moneyManagerUser.setMessage(response.success, response.error);
        }
    });
};