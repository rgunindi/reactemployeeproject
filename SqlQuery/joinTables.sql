-- Joind with FKey employees and salaries tables
USE Workers;
SELECT employees.employee_id,first_name, last_name, salary,department_id,hire_date,to_date
FROM employees, salaries
WHERE employees.employee_id = salaries.employee_id 
GROUP BY salaries.employee_id
