'use strict';

const userForm = new UserForm();

userForm.loginFormCallback = data => {
    ApiConnector.login(data, response => {
        if (!response.success) {
            throw userForm.setLoginErrorMessage(response.error);
        } else {
            location.reload();
        }
    });
};

userForm.registerFormCallback = data => {
    ApiConnector.register(data, response => {
        console.log(response);
        if (!response.success) {
            throw userForm.setRegisterErrorMessage(response.error);
        } else {
            location.reload();
        }
    })
};