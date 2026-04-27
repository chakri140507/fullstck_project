package com.example.studentplacement.service;

import com.example.studentplacement.model.User;
import com.example.studentplacement.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    public User login(String username, String password) {
        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Supports both BCrypt and plain-text (for initial admin)
            if (passwordEncoder.matches(password, user.getPassword()) || user.getPassword().equals(password)) {
                if (user.isApproved()) {
                    return user;
                }
            }
        }
        return null;
    }

    public User register(User user) {
        // Check if username already exists
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("Email already registered!");
        }

        // Encode password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        // Auto-approve students, others (Officers) need approval
        if ("STUDENT".equalsIgnoreCase(user.getRole())) {
            user.setApproved(true);
        } else {
            user.setApproved(false);
        }
        
        User savedUser = userRepository.save(user);
        
        // Send confirmation email
        emailService.sendRegistrationEmail(savedUser.getUsername(), savedUser.getFullName());
        
        return savedUser;
    }

    public List<User> getPendingUsers() {
        return userRepository.findByApprovedAndRole(false, "OFFICER");
    }

    public boolean approveUser(Long id) {
        Optional<User> userOptional = userRepository.findById(id);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setApproved(true);
            userRepository.save(user);
            return true;
        }
        return false;
    }

    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }

    public boolean isEmailRegistered(String email) {
        return userRepository.findByUsername(email).isPresent();
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public User findOrCreateSocialUser(String email, String fullName, String authProvider, String providerId, String selectedRole) {
        // Try to find by provider info first
        Optional<User> existingUser = userRepository.findByAuthProviderAndProviderId(authProvider, providerId);
        if (existingUser.isPresent()) {
            return existingUser.get();
        }

        // Then try to find by email (to link accounts)
        existingUser = userRepository.findByEmail(email);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setAuthProvider(authProvider);
            user.setProviderId(providerId);
            return userRepository.save(user);
        }

        // Create new user if not found
        User newUser = new User();
        newUser.setUsername(email); // Use email as username
        newUser.setEmail(email);
        newUser.setFullName(fullName);
        
        // Normalize role for backend (STUDENT, OFFICER, ADMIN)
        String backendRole = "STUDENT";
        if ("Officer".equalsIgnoreCase(selectedRole)) backendRole = "OFFICER";
        if ("Admin".equalsIgnoreCase(selectedRole)) backendRole = "ADMIN";
        
        newUser.setRole(backendRole);
        
        // Auto-approve students, others need approval
        if ("STUDENT".equalsIgnoreCase(backendRole)) {
            newUser.setApproved(true);
        } else {
            newUser.setApproved(false);
        }

        newUser.setAuthProvider(authProvider);
        newUser.setProviderId(providerId);
        
        // No password for social users
        return userRepository.save(newUser);
    }

    public void resetPassword(String email, String encodedPassword) {
        Optional<User> userOptional = userRepository.findByUsername(email);
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(encodedPassword);
            userRepository.save(user);
        } else {
            throw new RuntimeException("User not found with email: " + email);
        }
    }

    public User save(User user) {
        return userRepository.save(user);
    }
}
