package com.example.studentplacement.repository;

import com.example.studentplacement.model.Application;
import com.example.studentplacement.model.User;
import com.example.studentplacement.model.Job;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {
    List<Application> findByStudent(User student);
    List<Application> findByStudentId(Long studentId);
    List<Application> findByJob(Job job);
    Optional<Application> findByStudentAndJob(User student, Job job);
}
