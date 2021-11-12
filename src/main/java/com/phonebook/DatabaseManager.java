package com.phonebook;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import com.phonebook.bean.UserOwner;
import org.bson.Document;
import org.bson.types.ObjectId;

import static com.mongodb.client.model.Filters.*;

public class DatabaseManager {

    private static DatabaseManager instance;
    private MongoCollection<Document> userOwnerCollection;
    private static ObjectId currentUserId;

    private DatabaseManager() {
        MongoClient client = MongoClients.create("mongodb://localhost:27017");
        MongoDatabase database = client.getDatabase("phonebook");
        userOwnerCollection = database.getCollection("userOwner");
    }

    public static DatabaseManager getInstance() {
        if (instance == null) {
            instance = new DatabaseManager();
        }
        return instance;
    }

    public boolean isAlreadyLogin() {
        return currentUserId != null;
    }

    public boolean login(String username, String password) {
        Document document = userOwnerCollection.find(
                and(eq("username", username), eq("password", password))).first();
        if (document != null) {
            currentUserId = document.getObjectId("_id");
            return true;
        }
        return false;
    }

    // todo sign out , current user = null

    public long signUp(UserOwner userOwner) {
        long resultCode = -1;
        Document document = userOwnerCollection.find(or(
                eq("username", userOwner.getUsername()),
                eq("email", userOwner.getEmail()))).first();
        if (document == null) {
            userOwnerCollection.insertOne(userOwner.generateDocument());
            resultCode = 1;
        } else {

        }
        return resultCode;
    }
}