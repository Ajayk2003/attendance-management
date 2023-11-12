/* This represents the schema of the database used here */

CREATE TABLE students (
    reg_no VARCHAR(8) NOT NULL PRIMARY KEY,
    student_name VARCHAR(20),
    department VARCHAR(100),
    degree VARCHAR(20),
    year INT
);

CREATE TABLE working_days (
    dates DATE NOT NULL PRIMARY KEY
);

CREATE TABLE staffs (
    staff_id VARCHAR(8) NOT NULL PRIMARY KEY,
    staff_name VARCHAR(20),
    department VARCHAR(20)
);

CREATE TABLE users (
    staff_id VARCHAR(255) NOT NULL,
    username VARCHAR(255) NOT NULL PRIMARY KEY,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) NOT NULL
    CONSTRAINT fk_staff_id FOREIGN KEY (staff_id) REFERENCES staffs(staff_id)
);

CREATE TABLE attendance (
    reg_no VARCHAR(8) NOT NULL,
    date DATE,
    p1 VARCHAR(2),
    p2 VARCHAR(2),
    p3 VARCHAR(2),
    p4 VARCHAR(2),
    p5 VARCHAR(2),
    changed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    changed_by VARCHAR(255) NOT NULL,
    PRIMARY KEY (reg_no, date),
    CONSTRAINT fk_reg_no FOREIGN KEY (reg_no) REFERENCES students(reg_no),
    CONSTRAINT fk_changed_by FOREIGN KEY (changed_by) REFERENCES users(username)
    CONSTRAINT fk_date FOREIGN KEY (date) REFERENCES working_days(dates)
);

