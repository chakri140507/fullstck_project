package com.example.studentplacement.repository;

import com.example.studentplacement.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<User> findByAuthProviderAndProviderId(String authProvider, String providerId);
    List<User> findByApproved(boolean approved);
    List<User> findByApprovedAndRole(boolean approved, String role);
}
