package com.phonebook.controller;

import com.phonebook.bean.GeneralResult;
import com.phonebook.bean.PhoneContactInfo;
import com.phonebook.helper.CommonLogger;
import com.phonebook.service.PhoneContactService;
import org.apache.logging.log4j.Level;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class PhoneContactController {

    private static final Logger logger = LogManager.getLogger(PhoneContactController.class);

    @Autowired
    private PhoneContactService phoneContactService;

    @PostMapping("/contactInsertOrUpdate")
    public GeneralResult contactInsertOrUpdate(@RequestParam("contactId") String contactId,
                                               @RequestParam("name") String name,
                                               @RequestParam("email") String email,
                                               @RequestParam("phoneNumber") String phoneNumber,
                                               @RequestParam("facebook") String facebook,
                                               @RequestParam("twitter") String twitter,
                                               @RequestParam("categoryName") String categoryName,
                                               @RequestParam("isMarked") Boolean isMarked,
                                               @RequestParam("photoData") String photoData) {
        GeneralResult result = phoneContactService.contactInsertOrUpdate(contactId, name, email, phoneNumber,
                facebook, twitter, categoryName, isMarked, photoData);
        CommonLogger.log(logger, Level.INFO, ", resultCode: " + result.getResultCode() +
                ", resultText: " + result.getResultText());
        return result;
    }

    @PostMapping("/getContacts")
    public List<PhoneContactInfo> getContacts(@RequestParam("searchContent") String searchContent,
                                              @RequestParam("orderBy") Integer orderBy,
                                              @RequestParam("filterTypeId") Integer filterTypeId,
                                              @RequestParam("categoryName") String categoryName) {
        List<PhoneContactInfo> result = phoneContactService.getContacts(searchContent, orderBy, filterTypeId, categoryName);
        CommonLogger.log(logger, Level.INFO, ", result size: " + result.size());
        return result;
    }
}