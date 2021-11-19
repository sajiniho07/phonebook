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

    public UserOwner login(String username, String password) {
        Document document = userOwnerCollection.find(
                and(eq("username", username), eq("password", password))).first();
        if (document != null) {
            this.currentUserId = document.getObjectId("_id");
            UserOwner userOwner = new UserOwner(document);
            return userOwner;
        }
        return null;
    }

    // todo sign out , current user = null

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
        this.currentUserId = null;
    }
}