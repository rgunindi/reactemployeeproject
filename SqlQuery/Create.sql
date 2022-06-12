CREATE DATABASE workers;
USE workers;
CREATE TABLE departments (
	department_id INT AUTO_INCREMENT PRIMARY KEY,
    dept_no char(4) unique not null,
	dept_name VARCHAR (40) NOT NULL
);

CREATE TABLE employees (
	emp_id INT AUTO_INCREMENT  PRIMARY KEY,
	employee_id bigint unique,
	first_name VARCHAR (20) DEFAULT NULL,
	last_name VARCHAR (25) NOT NULL,
	hire_date DATE NOT NULL,
	department_id INT (11) DEFAULT NULL,
	FOREIGN KEY (department_id) REFERENCES departments (department_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE dept_manager (
	dept_manager_id INT (11) AUTO_INCREMENT PRIMARY KEY,
	employee_id bigint DEFAULT NULL,
	department_id INT (11) DEFAULT NULL,
     from_date DATE NOT NULL,
    to_date DATE NOT NULL,
	FOREIGN KEY (department_id) REFERENCES departments (department_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES employees (employee_id) ON DELETE CASCADE ON UPDATE CASCADE
);
CREATE TABLE dept_emp (
	dept_emp_id INT (11) AUTO_INCREMENT PRIMARY KEY,
	employee_id bigint DEFAULT NULL,
	department_id INT (11) DEFAULT NULL,
     from_date DATE NOT NULL,
    to_date DATE NOT NULL,
	FOREIGN KEY (department_id) REFERENCES departments (department_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (employee_id) REFERENCES employees (employee_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE salaries (
	salary_id INT (11) AUTO_INCREMENT PRIMARY KEY,
	salary DECIMAL (8, 2) DEFAULT NULL,
	employee_id bigint DEFAULT NULL,
    from_date DATE NOT NULL,
    to_date DATE NOT NULL,
	FOREIGN KEY (employee_id) REFERENCES employees (employee_id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE titles (
	title_id INT (11) AUTO_INCREMENT PRIMARY KEY,
	title VARCHAR (50) NOT NULL,
	employee_id bigint DEFAULT NULL,
	FOREIGN KEY (employee_id) REFERENCES employees (employee_id) ON DELETE CASCADE ON UPDATE CASCADE
);


