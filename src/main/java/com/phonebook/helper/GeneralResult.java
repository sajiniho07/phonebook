package com.phonebook.helper;

public class GeneralResult {

    private long resultCode;
    private String resultText;

    public GeneralResult() {
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
