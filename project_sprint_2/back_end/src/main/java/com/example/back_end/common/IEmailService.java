package com.example.back_end.common;

public interface IEmailService {
    boolean sendEmail(String receiptEmail, String link);
}
