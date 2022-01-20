package com.phonebook.bean;

import com.phonebook.helper.AlertEnum;

public class GeneralResult {

    private long resultCode;
    private String resultText;

    public GeneralResult() {
        this(AlertEnum.ERROR.getId(), "The process failed.");
    }

    public GeneralResult(long resultCode, String resultText) {
        this.resultCode = resultCode;
        this.resultText = resultText;
    }

    public long getResultCode() {
        return resultCode;
    }

    public void setResultCode(long resultCode) {
        this.resultCode = resultCode;
    }

    public String getResultText() {
        return resultText;
    }

    public void setResultText(String resultText) {
        this.resultText = resultText;
    }

    @Override
    public String toString() {
        return "GeneralResult{" +
                "resultCode=" + resultCode +
                ", alertTxt='" + resultText + '\'' +
                '}';
    }
}
