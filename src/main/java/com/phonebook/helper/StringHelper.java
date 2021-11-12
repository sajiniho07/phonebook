package com.phonebook.helper;

public class StringHelper {

    public static boolean checkValidatePassword(String password) {
        if (password == null) {
            return false;
        }
        String regex = "^(?=.*\\d)(?=.*[A-Za-z]).{6,20}$";
        return password.matches(regex);
    }

    public static boolean checkValidateEmail(String email) {
        if (email == null) {
            return false;
        }
        String regex = "\\b[\\w\\.-]+@[\\w\\.-]+\\.\\w{2,4}\\b";
        return email.matches(regex);
    }
}
