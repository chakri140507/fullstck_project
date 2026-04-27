package com.example.studentplacement.controller;

import com.example.studentplacement.model.User;
import com.example.studentplacement.service.UserService;
import com.example.studentplacement.service.OTPService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AuthController {

    @Autowired
    private UserService userService;

    @Autowired
    private OTPService otpService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");

        User user = userService.login(username, password);

        Map<String, Object> response = new HashMap<>();
        if (user != null) {
            response.put("message", "Login Successful");
            response.put("userId", user.getId());
            response.put("username", user.getUsername());
            response.put("role", user.getRole());
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Invalid Credentials or Pending Approval");
            return ResponseEntity.status(401).body(response);
        }
    }

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> register(@RequestBody Map<String, Object> registrationRequest) {
        Map<String, String> response = new HashMap<>();
        
        String username = (String) registrationRequest.get("username");
        String password = (String) registrationRequest.get("password");
        String role = (String) registrationRequest.get("role");
        String fullName = (String) registrationRequest.get("fullName");
        String otpCode = (String) registrationRequest.get("otp");

        try {
            // Verify OTP
            if (otpCode == null || !otpService.validateOTP(username, otpCode)) {
                response.put("message", "Invalid or expired verification code!");
                return ResponseEntity.status(400).body(response);
            }

            User user = new User();
            user.setUsername(username);
            user.setPassword(password);
            user.setRole(role);
            user.setFullName(fullName);
            
            userService.register(user);
            
            String successMessage = "STUDENT".equalsIgnoreCase(user.getRole()) 
                ? "User registered successfully! You can now log in." 
                : "User registered successfully! Please wait for admin approval.";
                
            response.put("message", successMessage);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            String errorMessage = e.getMessage();
            if (errorMessage.contains("Email already registered!")) {
                response.put("message", errorMessage);
                return ResponseEntity.status(400).body(response);
            }
            response.put("message", "Registration failed: " + errorMessage);
            return ResponseEntity.status(500).body(response);
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<Map<String, String>> resetPassword(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String otp = request.get("otp");
        String newPassword = request.get("newPassword");
        Map<String, String> response = new HashMap<>();

        try {
            if (email == null || otp == null || newPassword == null) {
                response.put("message", "All fields are required");
                return ResponseEntity.badRequest().body(response);
            }

            // Verify OTP
            if (!otpService.validateOTP(email, otp)) {
                response.put("message", "Invalid or expired verification code!");
                return ResponseEntity.status(400).body(response);
            }

            // Update Password
            String encodedPassword = passwordEncoder.encode(newPassword);
            userService.resetPassword(email, encodedPassword);

            response.put("message", "Password reset successful!");
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            e.printStackTrace();
            response.put("message", "Failed to reset password: " + e.getMessage());
            return ResponseEntity.status(500).body(response);
        }
    }
}
