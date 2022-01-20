package com.phonebook.dao;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;
import com.mongodb.client.MongoCollection;
import com.mongodb.client.MongoDatabase;
import org.bson.Document;

public class DatabaseManager {

    protected MongoCollection<Document> userOwnerCollection;
    protected MongoCollection<Document> phoneContactCollection;

    protected DatabaseManager() {
        MongoClient client = MongoClients.create("mongodb://localhost:27017");
        MongoDatabase database = client.getDatabase("phonebook");
        userOwnerCollection = database.getCollection("userOwner");
        phoneContactCollection = database.getCollection("phoneContact");
    }

}