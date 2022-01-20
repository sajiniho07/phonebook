package com.phonebook.service;

import com.phonebook.bean.GeneralResult;
import com.phonebook.bean.UserOwner;
import com.phonebook.dao.UserOwnerDao;
import com.phonebook.helper.AlertEnum;
import org.springframework.stereotype.Service;

@Service
public class UserOwnerService {

    public UserOwner login(String username, String password) {
        UserOwnerDao userOwnerDao = new UserOwnerDao();
        UserOwner userOwner = userOwnerDao.login(username, password);
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
        GeneralResult generalResult = newUserOwner.validateData();
        if (generalResult.getResultCode() > 0) {
            UserOwnerDao userOwnerDao = new UserOwnerDao();
            boolean isAlreadyLogin = userOwnerDao.isAlreadyLogin();
            if (isAlreadyLogin) {
                result = updateUser(newUserOwner, userOwnerDao);
            } else {
                result = signUp(newUserOwner, userOwnerDao);
            }
        } else {
            result = new UserOwner();
            result.setResultCode(generalResult.getResultCode());
            result.setResultText(generalResult.getResultText());
        }
        return result;
    }

    private UserOwner signUp(UserOwner newUserOwner, UserOwnerDao userOwnerDao) {
        UserOwner result;
        result = userOwnerDao.signUp(newUserOwner);
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

    private UserOwner updateUser(UserOwner newUserOwner, UserOwnerDao userOwnerDao) {
        UserOwner result;
        result = userOwnerDao.updateUser(newUserOwner);
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
        UserOwnerDao userOwnerDao = new UserOwnerDao();
        boolean alreadyLogin = userOwnerDao.isAlreadyLogin();
        GeneralResult generalResult;
        if (alreadyLogin) {
            generalResult = new GeneralResult(AlertEnum.SUCCESS.getId(), "User is Logged in.");
        } else {
            generalResult = new GeneralResult(AlertEnum.ERROR.getId(), "User is not Login.");
        }
        return generalResult;
    }

    public GeneralResult signOut() {
        GeneralResult generalResult = new GeneralResult(AlertEnum.SUCCESS.getId(), "User sign out successfully.");
        UserOwnerDao userOwnerDao = new UserOwnerDao();
        userOwnerDao.signOut();
        return generalResult;
    }

}