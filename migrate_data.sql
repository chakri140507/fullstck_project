SET FOREIGN_KEY_CHECKS = 0;

TRUNCATE TABLE student_placement.applications;
TRUNCATE TABLE student_placement.jobs;
TRUNCATE TABLE student_placement.users;

-- Migrate Admins
INSERT INTO student_placement.users (id, username, password, role)
SELECT id, name, password, 'ADMIN' FROM placement_system.admins;

-- Migrate Employees (Officers)
INSERT INTO student_placement.users (id, username, password, role)
SELECT id + 1000, email, password, 'OFFICER' FROM placement_system.employees;

-- Migrate Students
INSERT INTO student_placement.users (id, username, password, role)
SELECT id + 2000, email, password, 'STUDENT' FROM placement_system.students;

-- Migrate Jobs
INSERT INTO student_placement.jobs (id, title, company, location, salary, description, active)
SELECT id, title, companyName, location, salary, description, 1 FROM placement_system.jobs;

-- Migrate Applications
INSERT INTO student_placement.applications (id, student_id, job_id, status, applied_date)
SELECT id, studentId + 2000, jobId, UPPER(status), createdAt FROM placement_system.applications;

SET FOREIGN_KEY_CHECKS = 1;
