package com.example.studentplacement.controller;

import com.example.studentplacement.repository.ApplicationRepository;
import com.example.studentplacement.repository.JobRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/student/dashboard")
public class StudentDashboardController {

    @Autowired
    private ApplicationRepository applicationRepository;

    @Autowired
    private JobRepository jobRepository;

    @GetMapping("/stats/{studentId}")
    public ResponseEntity<Map<String, Long>> getStats(@PathVariable Long studentId) {
        long appliedCount = applicationRepository.findByStudentId(studentId).size();
        long totalActiveJobs = jobRepository.findByActiveTrue().size();
        
        Map<String, Long> stats = new HashMap<>();
        stats.put("appliedJobs", appliedCount);
        stats.put("availableJobs", (totalActiveJobs - appliedCount) > 0 ? (totalActiveJobs - appliedCount) : 0);

        return ResponseEntity.ok(stats);
    }
}
