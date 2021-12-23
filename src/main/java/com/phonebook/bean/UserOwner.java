package com.phonebook.bean;

import com.phonebook.helper.AlertEnum;
import com.phonebook.helper.StringHelper;
import org.bson.Document;
import org.bson.types.ObjectId;

public class UserOwner extends GeneralResult {
    private ObjectId id;
    private String name;
    private String username;
    private String password;
    private String email;

    public UserOwner() {
    }

    public UserOwner(Document doc) {
        this.id = doc.getObjectId("_id");
        this.name = doc.getString("name");
        this.username = doc.getString("username");
        this.email = doc.getString("email");
    }

    public UserOwner(String name, String username, String password, String email) {
        this.id = null;
        this.name = name;
        this.username = username;
        this.password = password;
        this.email = email;
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

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public GeneralResult getGeneralResult() {
        if (name == null || name.trim().isEmpty()) {
            return new GeneralResult(AlertEnum.ERROR.getId(), "Invalid name.");
        }
        if (username == null || username.trim().isEmpty()) {
            return new GeneralResult(AlertEnum.ERROR.getId(), "Invalid username.");
        }
        if (!StringHelper.checkValidateEmail(email)) {
            return new GeneralResult(AlertEnum.ERROR.getId(), "Invalid email.");
        }
        if (!StringHelper.checkValidatePassword(password)) {
            return new GeneralResult(AlertEnum.ERROR.getId(), "Invalid Password.");
        }
        return new GeneralResult(AlertEnum.SUCCESS.getId(), "Valid data.");
    }

    public Document generateDocument() {
        Document doc = new Document();
        doc.append("name", name);
        doc.append("username", username);
        doc.append("password", password);
        doc.append("email", email);
        return doc;
    }
}