package com.phonebook.helper;

public enum AlertEnum {
    SUCCESS(1l, "success"), ERROR(-1l, "error");

    private long id;
    private String name;

    AlertEnum(long id, String name) {
        this.id = id;
        this.name = name;
    }

    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }
}
