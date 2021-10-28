package com.phonebook.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

    @GetMapping("/")
    public String showLoginPage(){
        return "loginPage";
    }

    @GetMapping("/signUp")
    public String showSignUpPage(){
        return "signUp";
    }

    @GetMapping("/homePage")
    public String showHomePage(){
        return "homePage";
    }

}