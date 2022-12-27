package com.example.back_end.util;

public interface EmailService {
    boolean sendEmail(String receiptEmail, String link);
}
