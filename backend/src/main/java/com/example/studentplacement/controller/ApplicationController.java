package com.example.studentplacement.controller;

import com.example.studentplacement.model.Application;
import com.example.studentplacement.model.Job;
import com.example.studentplacement.model.User;
import com.example.studentplacement.service.ApplicationService;
import com.example.studentplacement.service.JobService;
import com.example.studentplacement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/applications")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    @Autowired
    private UserService userService;

    @Autowired
    private JobService jobService;

    @PostMapping(value = "/apply", consumes = {"multipart/form-data"})
    public ResponseEntity<Application> apply(
            @RequestParam("studentId") Long studentId,
            @RequestParam("jobId") Long jobId,
            @RequestParam("email") String email,
            @RequestParam("phoneNumber") String phoneNumber,
            @RequestParam("linkedinProfile") String linkedinProfile,
            @RequestParam(value = "portfolioUrl", required = false) String portfolioUrl,
            @RequestParam("resume") org.springframework.web.multipart.MultipartFile resume) {

        try {
            Optional<User> student = userService.findById(studentId);
            Optional<Job> job = jobService.getJobById(jobId);
    
            if (student.isPresent() && job.isPresent()) {
                byte[] resumeData = resume.getBytes();
                String resumeName = resume.getOriginalFilename();
                String resumeType = resume.getContentType();
    
                return ResponseEntity.ok(applicationService.apply(
                        student.get(), 
                        job.get(), 
                        email,
                        phoneNumber, 
                        linkedinProfile, 
                        portfolioUrl,
                        resumeName, 
                        resumeType, 
                        resumeData));
            } else {
                return ResponseEntity.status(400).body(null);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Application>> getByStudent(@PathVariable Long studentId) {
        return ResponseEntity.ok(applicationService.getStudentApplications(studentId));
    }

    @GetMapping
    public ResponseEntity<List<Application>> getAll() {
        return ResponseEntity.ok(applicationService.getAllApplications());
    }

    @PutMapping("/{id}/status")
    public ResponseEntity<Application> updateStatus(@PathVariable Long id, @RequestBody Map<String, String> request) {
        String status = request.get("status");
        return ResponseEntity.ok(applicationService.updateStatus(id, status));
    }

    @GetMapping("/{id}/resume")
    public ResponseEntity<byte[]> getResume(@PathVariable Long id) {
        Optional<Application> optApp = applicationService.getApplicationById(id);
        if (optApp.isEmpty() || optApp.get().getResumeData() == null) {
            return ResponseEntity.notFound().build();
        }
        Application app = optApp.get();
        String contentType = app.getResumeType() != null ? app.getResumeType() : "application/octet-stream";
        String filename = app.getResumeName() != null ? app.getResumeName() : "resume";

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename=\"" + filename + "\"")
                .header(HttpHeaders.ACCESS_CONTROL_EXPOSE_HEADERS, HttpHeaders.CONTENT_DISPOSITION)
                .contentType(MediaType.parseMediaType(contentType))
                .body(app.getResumeData());
    }
}
