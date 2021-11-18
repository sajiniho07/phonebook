package com.phonebook.controller;

import com.phonebook.helper.GeneralResult;
import com.phonebook.service.HomeService;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class HomeController {

    private static final Logger logger = LogManager.getLogger(HomeController.class);

    @Autowired
    private HomeService homeService;

    @PostMapping("/signUp")
    public GeneralResult signUp(@RequestParam("name") String name,
                                @RequestParam("username") String username,
                                @RequestParam("password") String password,
                                @RequestParam("email") String email) {
        GeneralResult result = homeService.signUp(name, username, password, email);
        logger(Level.INFO, result, "signUp");
        return result;
    }

    @PostMapping("/")
    public GeneralResult loginPage(@RequestParam("username") String username,
                                   @RequestParam("password") String password) {
        GeneralResult result = homeService.login(username, password);
        return result;
    }

    @GetMapping("/isAlreadyLogin")
    public GeneralResult isAlreadyLogin() {
        GeneralResult result = homeService.isAlreadyLogin();
        logger(Level.INFO, result, "isAlreadyLogin");
        return result;
    }

    private void logger(Level level, GeneralResult result, String methodName) {
        String logMessage = methodName + ", resultCode: "+ result.getResultCode() +
                ", resultText: " + result.getResultText();
        logger.log(level, logMessage);
    }
}