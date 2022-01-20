package com.phonebook.dao;

import com.phonebook.bean.UserOwner;
import org.bson.Document;
import org.bson.types.ObjectId;

import static com.mongodb.client.model.Filters.*;

public class UserOwnerDao extends DatabaseManager {

    private static ObjectId currentUserId;

    public UserOwnerDao() {
        super();
    }

    public static ObjectId getCurrentUserId() {
        return currentUserId;
    }

    public boolean isAlreadyLogin() {
        return currentUserId != null;
    }

    public UserOwner login(String username, String password) {
        Document document = userOwnerCollection.find(
                and(eq("username", username), eq("password", password))).first();
        if (document != null) {
            currentUserId = document.getObjectId("_id");
            UserOwner userOwner = new UserOwner(document);
            return userOwner;
        }
        return null;
    }

    public UserOwner signUp(UserOwner newUserOwner) {
        UserOwner userOwner = null;
        Document document = userOwnerCollection.find(or(
                eq("username", newUserOwner.getUsername()),
                eq("email", newUserOwner.getEmail()))).first();
        if (document == null) {
            userOwnerCollection.insertOne(newUserOwner.generateDocument());
            userOwner = login(newUserOwner.getUsername(), newUserOwner.getPassword());
        }
        return userOwner;
    }

    public void signOut() {
        currentUserId = null;
    }

    public UserOwner updateUser(UserOwner newUserOwner) {
        UserOwner userOwner = null;
        Document document = userOwnerCollection.findOneAndReplace(eq("_id", currentUserId), newUserOwner.generateDocument());
        if (document != null) {
            userOwner = login(newUserOwner.getUsername(), newUserOwner.getPassword());
        }
        return userOwner;
    }
}
