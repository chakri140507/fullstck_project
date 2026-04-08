package com.example.studentplacement.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "applications")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Application {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(length = 100)
    private String email;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private User student;

    @ManyToOne
    @JoinColumn(name = "job_id", nullable = false)
    private Job job;

    @Column(nullable = false, length = 20)
    private String status = "APPLIED"; // APPLIED, PENDING, ACCEPTED, REJECTED

    @Column(nullable = false)
    private LocalDateTime appliedDate = LocalDateTime.now();

    @Column(length = 20)
    private String phoneNumber;

    @Column(length = 255)
    private String linkedinProfile;

    @Column(length = 255)
    private String portfolioUrl;

    private String resumeName;
    private String resumeType;

    @Lob
    @Column(columnDefinition = "LONGBLOB")
    private byte[] resumeData;
}
