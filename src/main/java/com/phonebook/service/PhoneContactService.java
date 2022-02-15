package com.phonebook.service;

import com.phonebook.bean.GeneralResult;
import com.phonebook.bean.PhoneContactInfo;
import com.phonebook.dao.PhoneContactDao;
import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PhoneContactService {

    public GeneralResult contactInsertOrUpdate(String contactId, String name, String email, String phoneNumber,
                                               String facebook, String twitter, String categoryName, Boolean isMarked,
                                               String photoData) {
        GeneralResult generalResult;
        ObjectId id = null;
        if (contactId != null && !contactId.trim().isEmpty()) {
            id = new ObjectId(contactId.trim());
        }
        PhoneContactInfo phoneContactInfo = new PhoneContactInfo(id, name, email, phoneNumber,
                facebook, twitter, categoryName, isMarked, photoData);
        generalResult = phoneContactInfo.validateData();
        if (generalResult.getResultCode() > 0) {
            PhoneContactDao phoneContactDao = new PhoneContactDao();
            generalResult = phoneContactDao.contactInsertOrUpdate(phoneContactInfo);
        }
        return generalResult;
    }

    public List<PhoneContactInfo> getContacts(String searchContent, Integer orderBy, Integer filterTypeId, String categoryName) {
        PhoneContactDao phoneContactDao = new PhoneContactDao();
        orderBy = (orderBy == null ? 1 : orderBy);
        List<PhoneContactInfo> result = phoneContactDao.getContacts(searchContent, orderBy, filterTypeId, categoryName);
        return result;
    }
}