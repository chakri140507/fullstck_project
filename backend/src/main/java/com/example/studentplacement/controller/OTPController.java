package com.example.studentplacement.controller;

import com.example.studentplacement.service.EmailService;
import com.example.studentplacement.service.OTPService;
import com.example.studentplacement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/otp")
public class OTPController {

    @Autowired
    private OTPService otpService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserService userService;

    @PostMapping("/send")
    public ResponseEntity<Map<String, String>> sendOTP(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        Map<String, String> response = new HashMap<>();

        try {
            if (email == null || email.isEmpty()) {
                response.put("message", "Email is required");
                return ResponseEntity.badRequest().body(response);
            }

            // Check if email already exists in DB
            if (userService.isEmailRegistered(email)) {
                 response.put("message", "Email already registered!");
                 return ResponseEntity.badRequest().body(response);
            }

            String otp = otpService.generateOTP(email);
            emailService.sendOTPEmail(email, otp);

            response.put("message", "Verification code sent to " + email);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("message", "Internal Server Error: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }

    @PostMapping("/send-forgot-password")
    public ResponseEntity<Map<String, String>> sendForgotPasswordOTP(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        Map<String, String> response = new HashMap<>();

        try {
            if (email == null || email.isEmpty()) {
                response.put("message", "Email is required");
                return ResponseEntity.badRequest().body(response);
            }

            // Check if email exists in DB
            if (!userService.isEmailRegistered(email)) {
                 response.put("message", "Email not found! Please check and try again.");
                 return ResponseEntity.status(404).body(response);
            }

            String otp = otpService.generateOTP(email);
            emailService.sendOTPEmail(email, otp);

            response.put("message", "Verification code sent to " + email);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("message", "Internal Server Error: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
}
