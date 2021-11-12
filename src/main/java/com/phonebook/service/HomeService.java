package com.phonebook.service;

import com.phonebook.DatabaseManager;
import com.phonebook.helper.AlertEnum;
import com.phonebook.helper.GeneralResult;
import org.springframework.stereotype.Service;

@Service
public class HomeService {

    public GeneralResult login(String username, String password) {
        DatabaseManager databaseManager = DatabaseManager.getInstance();
        boolean isLogin = databaseManager.login(username, password);
        GeneralResult generalResult;
        if (isLogin) {
            generalResult = new GeneralResult(AlertEnum.SUCCESS.getId(), "");
        } else {
            generalResult = new GeneralResult(AlertEnum.ERROR.getId(), "Invalid username or password.");
        }
        return generalResult;
    }

    public GeneralResult signUp(String name, String username, String password, String email) {
        DatabaseManager databaseManager = DatabaseManager.getInstance();
        int resultCode = databaseManager.signUp(name, username, password, email);
        GeneralResult generalResult;
        if (resultCode > 0) {
            generalResult = new GeneralResult(AlertEnum.SUCCESS.getId(), "");
        } else {
            generalResult = new GeneralResult(AlertEnum.ERROR.getId(), "Invalid username or password.");
        }
        return generalResult;
    }

    public GeneralResult isAlreadyLogin() {
        DatabaseManager databaseManager = DatabaseManager.getInstance();
        boolean alreadyLogin = databaseManager.isAlreadyLogin();
        GeneralResult generalResult;
        if (alreadyLogin) {
            generalResult = new GeneralResult(AlertEnum.SUCCESS.getId(), "");
        } else {
            generalResult = new GeneralResult(AlertEnum.ERROR.getId(), "user is not Login.");
        }
        return generalResult;
    }
}