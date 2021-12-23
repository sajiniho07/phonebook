package com.phonebook.service;

import com.phonebook.DatabaseManager;
import com.phonebook.bean.UserOwner;
import com.phonebook.helper.AlertEnum;
import com.phonebook.bean.GeneralResult;
import org.springframework.stereotype.Service;

@Service
public class HomeService {

    public UserOwner login(String username, String password) {
        DatabaseManager databaseManager = DatabaseManager.getInstance();
        UserOwner userOwner = databaseManager.login(username, password);
        if (userOwner != null) {
            userOwner.setResultCode(AlertEnum.SUCCESS.getId());
            userOwner.setResultText("username: " + username + ", logged in successfully.");
        } else {
            userOwner = new UserOwner();
            userOwner.setResultCode(AlertEnum.ERROR.getId());
            userOwner.setResultText("Invalid username or password.");
        }
        return userOwner;
    }

    public UserOwner signUp(String name, String username, String password, String email) {
        UserOwner result;
        UserOwner newUserOwner = new UserOwner(name, username, password, email);
        GeneralResult generalResult = newUserOwner.getGeneralResult();
        if (generalResult.getResultCode() > 0) {
            DatabaseManager databaseManager = DatabaseManager.getInstance();
            boolean isAlreadyLogin = databaseManager.isAlreadyLogin();
            if (isAlreadyLogin) {
                result = updateUser(newUserOwner, databaseManager);
            } else {
                result = signUp(newUserOwner, databaseManager);
            }
        } else {
            result = new UserOwner();
            result.setResultCode(generalResult.getResultCode());
            result.setResultText(generalResult.getResultText());
        }
        return result;
    }

    private UserOwner signUp(UserOwner newUserOwner, DatabaseManager databaseManager) {
        UserOwner result;
        result = databaseManager.signUp(newUserOwner);
        if (result != null) {
            result.setResultCode(AlertEnum.SUCCESS.getId());
            result.setResultText("username: " + newUserOwner.getUsername() + ", created in successfully.");
        } else {
            result = new UserOwner();
            result.setResultCode(AlertEnum.ERROR.getId());
            result.setResultText("This user submitted before.");
        }
        return result;
    }

    private UserOwner updateUser(UserOwner newUserOwner, DatabaseManager databaseManager) {
        UserOwner result;
        result = databaseManager.updateUser(newUserOwner);
        if (result != null) {
            result.setResultCode(AlertEnum.SUCCESS.getId());
            result.setResultText("User updated successfully.");
        } else {
            result = new UserOwner();
            result.setResultCode(AlertEnum.ERROR.getId());
            result.setResultText("User not found.");
        }
        return result;
    }

    public GeneralResult isAlreadyLogin() {
        DatabaseManager databaseManager = DatabaseManager.getInstance();
        boolean alreadyLogin = databaseManager.isAlreadyLogin();
        GeneralResult generalResult;
        if (alreadyLogin) {
            generalResult = new GeneralResult(AlertEnum.SUCCESS.getId(), "User is Logged in.");
        } else {
            generalResult = new GeneralResult(AlertEnum.ERROR.getId(), "User is not Login.");
        }
        return generalResult;
    }

    public GeneralResult signOut() {
        DatabaseManager databaseManager = DatabaseManager.getInstance();
        databaseManager.signOut();
        GeneralResult generalResult = new GeneralResult(AlertEnum.SUCCESS.getId(), "User sign out successfully.");
        return generalResult;
    }

}