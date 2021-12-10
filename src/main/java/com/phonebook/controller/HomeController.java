package com.phonebook.controller;

import com.phonebook.bean.GeneralResult;
import com.phonebook.bean.UserOwner;
import com.phonebook.service.HomeService;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    private static final Logger logger = LogManager.getLogger(HomeController.class);

    @Autowired
    private HomeService homeService;

    @PostMapping("/signUp")
    public UserOwner signUp(@RequestParam("name") String name,
                            @RequestParam("username") String username,
                            @RequestParam("password") String password,
                            @RequestParam("email") String email) {
        UserOwner result = homeService.signUp(name, username, password, email);
        logger(Level.INFO, result, "signUp");
        return result;
    }

    @PostMapping("/signIn")
    public UserOwner loginPage(@RequestParam("username") String username,
                               @RequestParam("password") String password) {
        UserOwner result = homeService.login(username, password);
        logger(Level.INFO, result, "loginPage");
        return result;
    }

    @GetMapping("/signOut")
    public GeneralResult signOut() {
        GeneralResult result = homeService.signOut();
        logger(Level.INFO, result, "signOut");
        return result;
    }

    @GetMapping("/isAlreadyLogin")
    public GeneralResult isAlreadyLogin() {
        GeneralResult result = homeService.isAlreadyLogin();
        logger(Level.INFO, result, "isAlreadyLogin");
        return result;
    }

    private void logger(Level level, GeneralResult result, String methodName) {
        String logMessage = methodName + ", resultCode: " + result.getResultCode() +
                ", resultText: " + result.getResultText();
        logger.log(level, logMessage);
    }
}