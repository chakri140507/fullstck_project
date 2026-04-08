package com.example.studentplacement.controller;

import com.example.studentplacement.model.User;
import com.example.studentplacement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class SocialAuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/social-login")
    public ResponseEntity<Map<String, Object>> socialLogin(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        String fullName = request.get("fullName");
        String provider = request.get("provider"); // GOOGLE or FACEBOOK
        String providerId = request.get("providerId");
        String selectedRole = request.get("role");

        // NOTE: In a production environment, you should verify the integrity 
        // of the token/providerId using Google/Facebook SDKs/APIs.
        
        User user = userService.findOrCreateSocialUser(email, fullName, provider, providerId, selectedRole);

        Map<String, Object> response = new HashMap<>();
        if (user != null) {
            response.put("message", "Login Successful");
            response.put("userId", user.getId());
            response.put("username", user.getUsername());
            response.put("role", user.getRole());
            return ResponseEntity.ok(response);
        } else {
            response.put("message", "Authentication Failed");
            return ResponseEntity.status(401).body(response);
        }
    }
}
