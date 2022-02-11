package com.phonebook.dao;

import com.mongodb.client.MongoCursor;
import com.phonebook.bean.GeneralResult;
import com.phonebook.bean.PhoneContactInfo;
import com.phonebook.helper.AlertEnum;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static com.mongodb.client.model.Filters.eq;

public class PhoneContactDao extends DatabaseManager {

    public PhoneContactDao() {
        super();
    }

    public GeneralResult contactInsertOrUpdate(PhoneContactInfo phoneContactInfo) {
        GeneralResult result = new GeneralResult();
        ObjectId currentUserId = UserOwnerDao.getCurrentUserId();
        if (currentUserId == null) {
            result.setResultText("Modifier user is null.");
            return result;
        }
        Date serverDate = new Date();
        if (phoneContactInfo.getId() != null) {
            phoneContactInfo.setModifiedAt(serverDate);
            phoneContactInfo.setModifiedBy(currentUserId);
            ObjectId contactId = phoneContactInfo.getId();
            phoneContactCollection.findOneAndReplace(eq("_id", contactId), phoneContactInfo.generateDocument());
            result.setResultCode(AlertEnum.SUCCESS.getId());
            result.setResultText("Contact updated successfully.");
        } else {
            phoneContactInfo.setCreatedAt(serverDate);
            phoneContactInfo.setCreatedBy(currentUserId);
            phoneContactCollection.insertOne(phoneContactInfo.generateDocument());
            result.setResultCode(AlertEnum.SUCCESS.getId());
            result.setResultText("Contact created successfully.");
        }
        return result;
    }

    public List<PhoneContactInfo> getContacts(String searchContent, Integer orderBy, Integer filterTypeId, String categoryName) {
        List<PhoneContactInfo> result = new ArrayList<>();
        MongoCursor<Document> iterator;
        iterator = phoneContactCollection.find().iterator();
        try {
            while (iterator.hasNext()) {
                result.add(new PhoneContactInfo(iterator.next()));
            }
        } finally {
            iterator.close();
        }
        return result;
    }
}
