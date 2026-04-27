package com.example.studentplacement.util;

import com.example.studentplacement.model.Job;
import com.example.studentplacement.model.User;
import com.example.studentplacement.repository.JobRepository;
import com.example.studentplacement.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.List;

@Component
public class DataLoader implements CommandLineRunner {

    private final JobRepository jobRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataLoader(JobRepository jobRepository, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.jobRepository = jobRepository;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        // 1. Seed Admin User if not exists
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setEmail("admin@portal.com");
            admin.setFullName("System Administrator");
            admin.setRole("ADMIN");
            admin.setApproved(true);
            admin.setAuthProvider("LOCAL");
            userRepository.save(admin);
            System.out.println("Seeded default Admin user (admin / admin123)");
        }

        // 2. Seed Jobs if empty
        if (jobRepository.count() > 0) {
            System.out.println("Job database already seeded. Skipping initialization.");
            return;
        }
        
        List<Job> jobs = Arrays.asList(
                createJob("Frontend Developer", "Meta", "React and JavaScript experts required for the Metaverse project.", "Menlo Park, CA", "$145,000 - $190,000"),
                createJob("Data Analyst", "Amazon", "Expertise in SQL, Python, and AWS Redshift needed for the logistics team.", "Seattle, WA", "$120,000 - $160,000"),
                createJob("Backend Developer", "Netflix", "Mastery of Java, Spring Boot, and Microservices for global streaming scale.", "Los Gatos, CA", "$165,000 - $210,000"),
                createJob("UX Designer", "Apple", "Create intuitive and beautiful interfaces for the next generation of iOS.", "Cupertino, CA", "$135,000 - $180,000"),
                createJob("Software Engineer", "Google", "Work on world-class search algorithms and large-scale distributed systems.", "Mountain View, CA", "$150,000 - $200,000"),
                createJob("AI Research Scientist", "OpenAI", "Direct contribution to GPT models and next-gen artificial intelligence.", "San Francisco, CA", "$180,000 - $250,000"),
                createJob("Cybersecurity Analyst", "Microsoft", "Secure Azure cloud infrastructure and defend against global threats.", "Redmond, WA", "$130,000 - $175,000"),
                createJob("Cloud Architect", "IBM", "Design enterprise hybrid cloud solutions for Fortune 500 clients.", "Austin, TX", "$140,000 - $185,000"),
                createJob("Product Manager", "Stripe", "Lead product development for the world's most innovative payment platform.", "San Francisco, CA", "$155,000 - $210,000"),
                createJob("Data Engineer", "Tesla", "Build high-scale data pipelines for the world's most advanced autonomous fleet.", "Austin, TX", "$140,000 - $180,000"),
                createJob("Mobile Developer", "Spotify", "Craft the next generation of audio experiences for millions of iOS and Android users.", "New York, NY", "$135,000 - $175,000"),
                createJob("Site Reliability Engineer", "Twitter", "Maintain the stability and resilience of one of the world's largest communication platforms.", "Boulder, CO", "$150,000 - $195,000"),
                createJob("Security Engineer", "Palo Alto Networks", "Defend global enterprise networks against emerging cyber threats.", "Santa Clara, CA", "$145,000 - $185,000"),
                createJob("Machine Learning Engineer", "NVIDIA", "Optimize deep learning models for the world's most advanced GPU architectures.", "Santa Clara, CA", "$160,000 - $220,000"),
                createJob("DevOps Engineer", "Docker", "Build and scale modern containerization and orchestration platforms.", "Remote", "$130,000 - $170,000")
            );
        jobRepository.saveAll(jobs);
        System.out.println("Seeded 15 initial jobs into the database.");
    }

    private Job createJob(String title, String company, String desc, String loc, String salary) {
        Job job = new Job();
        job.setTitle(title);
        job.setCompany(company);
        job.setDescription(desc);
        job.setLocation(loc);
        job.setSalary(salary);
        job.setActive(true);
        return job;
    }
}
