CREATE DATABASE IF NOT EXISTS student_placement;
USE student_placement;

-- Ensure users table has correct columns
CREATE TABLE IF NOT EXISTS users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(100),
    role VARCHAR(20) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    resume_url VARCHAR(255),
    approved BIT(1) DEFAULT 0,
    auth_provider VARCHAR(20),
    provider_id VARCHAR(100)
);

-- Ensure jobs table has correct columns
CREATE TABLE IF NOT EXISTS jobs (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    company VARCHAR(100) NOT NULL,
    location VARCHAR(100) NOT NULL,
    salary VARCHAR(50) NOT NULL,
    description TEXT,
    posted_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    active BOOLEAN DEFAULT TRUE
);

-- Ensure applications table has all required columns matching Application.java
CREATE TABLE IF NOT EXISTS applications (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    student_id BIGINT NOT NULL,
    job_id BIGINT NOT NULL,
    email VARCHAR(100),
    phone_number VARCHAR(20),
    linkedin_profile VARCHAR(255),
    portfolio_url VARCHAR(255),
    resume_name VARCHAR(255),
    resume_type VARCHAR(255),
    resume_data LONGBLOB,
    status VARCHAR(20) DEFAULT 'APPLIED',
    applied_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES users(id),
    FOREIGN KEY (job_id) REFERENCES jobs(id)
);

-- Conditional Alter Table for Existing Data persistence
-- Note: MySQL doesn't have an easy IF NOT EXISTS for columns, but Hibernate ddl-auto=update handles it.
-- This script is primarily for the initial creation if the tables don't exist.
