package com.example.studentplacement.service;

import com.example.studentplacement.model.Application;
import com.example.studentplacement.model.Job;
import com.example.studentplacement.model.User;
import com.example.studentplacement.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    public Application apply(User student, Job job, String email, String phoneNumber, String linkedinProfile, String portfolioUrl, String resumeName, String resumeType, byte[] resumeData) {
        // If student already applied for this job, return existing or null to prevent duplicates
        Optional<Application> existing = applicationRepository.findByStudentAndJob(student, job);
        if (existing.isPresent()) {
            return existing.get();
        }

        Application application = new Application();
        application.setStudent(student);
        application.setJob(job);
        application.setEmail(email);
        application.setStatus("APPLIED"); // Default status
        application.setPhoneNumber(phoneNumber);
        application.setLinkedinProfile(linkedinProfile);
        application.setPortfolioUrl(portfolioUrl);
        application.setResumeName(resumeName);
        application.setResumeType(resumeType);
        application.setResumeData(resumeData);

        return applicationRepository.save(application);
    }

    public List<Application> getStudentApplications(User student) {
        return applicationRepository.findByStudent(student);
    }

    public List<Application> getStudentApplications(Long studentId) {
        return applicationRepository.findByStudentId(studentId);
    }

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    public Optional<Application> getApplicationById(Long id) {
        return applicationRepository.findById(id);
    }

    public Application updateStatus(Long applicationId, String status) {
        Optional<Application> applicationOptional = applicationRepository.findById(applicationId);
        if (applicationOptional.isPresent()) {
            Application application = applicationOptional.get();
            application.setStatus(status);
            return applicationRepository.save(application);
        }
        return null;
    }
}
