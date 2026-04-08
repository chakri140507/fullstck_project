package com.example.studentplacement.controller;

import com.example.studentplacement.model.User;
import com.example.studentplacement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/student/profile")
public class UserProfileController {

    @Autowired
    private UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<User> getProfile(@PathVariable Long id) {
        return userService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> updateProfile(@PathVariable Long id, @RequestBody User profileUpdate) {
        Optional<User> userOpt = userService.findById(id);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setFullName(profileUpdate.getFullName());
            // Other fields can be added here
            return ResponseEntity.ok(userService.save(user));
        }
        return ResponseEntity.notFound().build();
    }

    @PostMapping("/{id}/upload-resume")
    public ResponseEntity<Map<String, String>> uploadResume(@PathVariable Long id, @RequestParam("file") MultipartFile file) {
        Optional<User> userOpt = userService.findById(id);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            
            // Simulating file upload to a storage service
            // In a real app, you'd save the file to S3 or a local directory
            String fileName = file.getOriginalFilename();
            String mockUrl = "https://placement-portal-storage.com/resumes/" + id + "_" + fileName;
            
            user.setResumeUrl(mockUrl);
            userService.save(user);

            Map<String, String> response = new HashMap<>();
            response.put("resumeUrl", mockUrl);
            response.put("message", "Resume uploaded successfully!");
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.notFound().build();
    }
}
