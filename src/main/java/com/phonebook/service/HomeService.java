package com.phonebook.service;

import com.phonebook.DatabaseManager;
import com.phonebook.helper.AlertEnum;
import com.phonebook.helper.AlertResult;
import org.springframework.stereotype.Service;

@Service
public class HomeService {

    public AlertResult login(String username, String password) {
        DatabaseManager databaseManager = DatabaseManager.getInstance();
        boolean isLogin = databaseManager.login(username, password);
        AlertResult alertResult;
        if (isLogin) {
            alertResult = new AlertResult(AlertEnum.SUCCESS, "");
        } else {
            alertResult = new AlertResult(AlertEnum.ERROR, "Invalid username or password.");
        }
        return alertResult;
    }

    public AlertResult signUp(String name, String username, String password, String email) {
        DatabaseManager databaseManager = DatabaseManager.getInstance();
        int resultCode = databaseManager.signUp(name, username, password, email);
        AlertResult alertResult;
        if (resultCode > 0) {
            alertResult = new AlertResult(AlertEnum.SUCCESS, "");
        } else {
            alertResult = new AlertResult(AlertEnum.ERROR, "Invalid username or password.");
        }
        return alertResult;
    }
}