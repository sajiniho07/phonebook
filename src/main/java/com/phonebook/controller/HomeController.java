package com.phonebook.controller;

import com.phonebook.helper.AlertResult;
import com.phonebook.service.HomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class HomeController {

    @Autowired
    private HomeService homeService;

    @GetMapping("/")
    public String showLoginPage() {
        return "loginPage";
    }

    @GetMapping("/signUpPage")
    public String showSignUpPage() {
        return "signUp";
    }

    @GetMapping("/homePage")
    public String showHomePage() {
        return "homePage";
    }

    @PostMapping("/signUp")
    public ModelAndView signUp(@RequestParam("name") String name,
                               @RequestParam("username") String username,
                               @RequestParam("password") String password,
                               @RequestParam("email") String email) {
        ModelAndView mav = new ModelAndView();
        AlertResult result = homeService.signUp(name, username, password, email);
        switch (result.getAlertEnum()) {
            case ERROR:
            default:
                mav.setViewName("");
                mav.addObject("Error", result.getAlertTxt());
                break;
            case SUCCESS:
                mav.setViewName("homePage");
                break;
        }
        return mav;
    }

    @PostMapping("/")
    public ModelAndView loginPage(@RequestParam("username") String username,
                                  @RequestParam("password") String password) {
        ModelAndView mav = new ModelAndView();
        AlertResult result = homeService.login(username, password);
        switch (result.getAlertEnum()) {
            case ERROR:
            default:
                mav.setViewName("");
                mav.addObject("Error", result.getAlertTxt());
                break;
            case SUCCESS:
                mav.setViewName("homePage");
                break;
        }
        return mav;
    }
}