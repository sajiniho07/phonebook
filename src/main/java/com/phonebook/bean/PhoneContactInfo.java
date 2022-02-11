package com.phonebook.bean;

import com.phonebook.helper.AlertEnum;
import com.phonebook.helper.StringHelper;
import org.bson.Document;
import org.bson.types.ObjectId;

import java.util.Date;

public class PhoneContactInfo {
    private ObjectId id;
    private String name;
    private String email;
    private String phoneNumber;
    private String facebook;
    private String twitter;
    private String categoryName;
    private Boolean isMarked;
    private String photoData;
    private ObjectId createdBy;
    private Date createdAt;
    private ObjectId modifiedBy;
    private Date modifiedAt;

    public PhoneContactInfo() {
    }

    public PhoneContactInfo(Document doc) {
        this.id = doc.getObjectId("_id");
        this.name = doc.getString("name");
        this.email = doc.getString("email");
        this.phoneNumber = doc.getString("phoneNumber");
        this.facebook = doc.getString("facebook");
        this.twitter = doc.getString("twitter");
        this.categoryName = doc.getString("categoryName");
        this.isMarked = doc.getBoolean("isMarked");
        this.photoData = doc.getString("photoData");
        this.createdBy = doc.getObjectId("createdBy");
        this.createdAt = doc.getDate("createdAt");
        this.modifiedBy = doc.getObjectId("modifiedBy");
        this.modifiedAt = doc.getDate("modifiedAt");
    }

    public PhoneContactInfo(ObjectId id, String name, String email, String phoneNumber, String facebook, String twitter,
                            String categoryName, Boolean isMarked, String photoData) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.facebook = facebook;
        this.twitter = twitter;
        this.categoryName = categoryName;
        this.isMarked = isMarked;
        this.photoData = photoData;
    }

    public ObjectId getId() {
        return id;
    }

    public void setId(ObjectId id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public String getFacebook() {
        return facebook;
    }

    public void setFacebook(String facebook) {
        this.facebook = facebook;
    }

    public String getTwitter() {
        return twitter;
    }

    public void setTwitter(String twitter) {
        this.twitter = twitter;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public Boolean getMarked() {
        return isMarked;
    }

    public void setMarked(Boolean marked) {
        isMarked = marked;
    }

    public String getPhotoData() {
        return photoData;
    }

    public void setPhotoData(String photoData) {
        this.photoData = photoData;
    }

    public ObjectId getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(ObjectId createdBy) {
        this.createdBy = createdBy;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public ObjectId getModifiedBy() {
        return modifiedBy;
    }

    public void setModifiedBy(ObjectId modifiedBy) {
        this.modifiedBy = modifiedBy;
    }

    public Date getModifiedAt() {
        return modifiedAt;
    }

    public void setModifiedAt(Date modifiedAt) {
        this.modifiedAt = modifiedAt;
    }

    public GeneralResult validateData() {
        if (name == null || name.trim().isEmpty()) {
            return new GeneralResult(AlertEnum.ERROR.getId(), "Invalid name.");
        }
        if (email != null && !email.isEmpty() && !StringHelper.checkValidateEmail(email)) {
            return new GeneralResult(AlertEnum.ERROR.getId(), "Invalid email.");
        }
        if (!StringHelper.checkValidateNumber(phoneNumber)) {
            return new GeneralResult(AlertEnum.ERROR.getId(), "Invalid phoneNumber.");
        }
        return new GeneralResult(AlertEnum.SUCCESS.getId(), "Valid data.");
    }

    public Document generateDocument() {
        Document doc = new Document();
        doc.append("name", name);
        doc.append("email", email);
        doc.append("phoneNumber", phoneNumber);
        doc.append("facebook", facebook);
        doc.append("twitter", twitter);
        doc.append("categoryName", categoryName);
        doc.append(" isMarked",  isMarked);
        doc.append("photoData", photoData);
        doc.append("createdBy", createdBy);
        doc.append("createdAt", createdAt);
        doc.append("modifiedBy", modifiedBy);
        doc.append("modifiedAt", modifiedAt);
        return doc;
    }
}