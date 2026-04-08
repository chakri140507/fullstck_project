package com.example.studentplacement.service;

import com.example.studentplacement.model.Job;
import com.example.studentplacement.model.Application;
import com.example.studentplacement.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class JobService {

    @Autowired
    private JobRepository jobRepository;

    public List<Job> getAllActiveJobs() {
        return jobRepository.findByActiveTrue();
    }

    public Job createJob(Job job) {
        return jobRepository.save(job);
    }

    public Optional<Job> getJobById(Long id) {
        return jobRepository.findById(id);
    }

    public List<Job> getAvailableJobs(Long studentId, ApplicationService applicationService) {
        List<Job> allActiveJobs = getAllActiveJobs();
        List<Application> studentApplications = applicationService.getStudentApplications(studentId);
        List<Long> appliedJobIds = studentApplications.stream()
                .map(application -> application.getJob().getId())
                .collect(Collectors.toList());

        return allActiveJobs.stream()
                .filter(job -> !appliedJobIds.contains(job.getId()))
                .collect(Collectors.toList());
    }
}
