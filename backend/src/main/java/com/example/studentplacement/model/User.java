package com.example.studentplacement.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 50, unique = true)
    private String username;

    @Column(length = 100, unique = true)
    private String email;

    @Column(nullable = true, length = 100)
    private String password;

    @Column(nullable = false, length = 20)
    private String role; // STUDENT, ADMIN, OFFICER

    @Column(nullable = false, length = 100)
    private String fullName;

    @Column(length = 255)
    private String resumeUrl;

    @Column(nullable = false)
    private boolean approved = false;

    @Column(length = 20)
    private String authProvider; // LOCAL, GOOGLE, FACEBOOK

    @Column(length = 100)
    private String providerId;
}
