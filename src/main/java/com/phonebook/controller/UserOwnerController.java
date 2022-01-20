package com.phonebook.controller;

import com.phonebook.bean.GeneralResult;
import com.phonebook.bean.UserOwner;
import com.phonebook.helper.CommonLogger;
import com.phonebook.service.UserOwnerService;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserOwnerController {

    private static final Logger logger = LogManager.getLogger(UserOwnerController.class);

    @Autowired
    private UserOwnerService userOwnerService;

    @PostMapping("/signUp")
    public UserOwner signUp(@RequestParam("name") String name,
                            @RequestParam("username") String username,
                            @RequestParam("password") String password,
                            @RequestParam("email") String email) {
        UserOwner result = userOwnerService.signUp(name, username, password, email);
        CommonLogger.log(logger, Level.INFO, ", resultCode: " + result.getResultCode() +
                ", resultText: " + result.getResultText());
        return result;
    }

    @PostMapping("/signIn")
    public UserOwner loginPage(@RequestParam("username") String username,
                               @RequestParam("password") String password) {
        UserOwner result = userOwnerService.login(username, password);
        CommonLogger.log(logger, Level.INFO, ", resultCode: " + result.getResultCode() +
                ", resultText: " + result.getResultText());
        return result;
    }

    @GetMapping("/signOut")
    public GeneralResult signOut() {
        GeneralResult result = userOwnerService.signOut();
        CommonLogger.log(logger, Level.INFO, ", resultCode: " + result.getResultCode() +
                ", resultText: " + result.getResultText());
        return result;
    }

    @GetMapping("/isAlreadyLogin")
    public GeneralResult isAlreadyLogin() {
        GeneralResult result = userOwnerService.isAlreadyLogin();
        CommonLogger.log(logger, Level.INFO, ", resultCode: " + result.getResultCode() +
                ", resultText: " + result.getResultText());
        return result;
    }
}