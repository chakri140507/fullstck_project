package com.example.studentplacement.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendRegistrationEmail(String toEmail, String fullName) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("chakradharraddy6@gmail.com");
            message.setTo(toEmail);
            message.setSubject("Registration Successful - Bridge Placement Portal");
            message.setText("Dear " + fullName + ",\n\n" +
                    "Your registration on the Bridge Student Placement Portal was successful!\n\n" +
                    "Please note that your account is currently pending admin approval. " +
                    "Once approved, you will be able to log in and access all portal features.\n\n" +
                    "Best Regards,\n" +
                    "The Bridge Team");

            mailSender.send(message);
            System.out.println("Registration email sent successfully to: " + toEmail);
        } catch (Exception e) {
            System.err.println("Failed to send email to: " + toEmail + ". Error: " + e.getMessage());
            // We catch but don't rethrow to avoid blocking registration if SMTP is not configured
        }
    }

    public void sendOTPEmail(String toEmail, String otp) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom("chakradharraddy6@gmail.com");
            message.setTo(toEmail);
            message.setSubject("OTP Verification Code - Bridge Placement Portal");
            message.setText("Dear User,\n\n" +
                    "Your verification code for Bridge Placement Portal is: " + otp + "\n\n" +
                    "This code will expire in 5 minutes. Please do not share this code with anyone.\n\n" +
                    "Best Regards,\n" +
                    "The Bridge Team");

            mailSender.send(message);
            System.out.println("--------------------------------------------------");
            System.out.println("OTP SENT TO EMAIL: " + toEmail);
            System.out.println("CODE: " + otp);
            System.out.println("--------------------------------------------------");
        } catch (Exception e) {
            System.err.println("Failed to send OTP email to: " + toEmail + ". Error: " + e.getMessage());
            System.out.println("FALLBACK: OTP FOR " + toEmail + " IS: " + otp);
        }
    }
}
