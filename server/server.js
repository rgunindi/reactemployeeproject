const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const connection = require('./db');
const { json } = require('body-parser');
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.get('/workareas', (req, res) => {
    const GetQuery = `SELECT * FROM employees`;
    connection.query(GetQuery, (err, results) => {
        if (err) {
            return res.send(err);
        }
        return res.json({
            data: results
        });
    });
})
app.get('/admins', (req, res) => {
    if (true) {//token will also be checked
        const AdminQUERY = `
        SELECT employees.employee_id,first_name, last_name, salary,department_id,hire_date,to_date
        FROM employees, salaries
        WHERE employees.employee_id = salaries.employee_id 
        GROUP BY salaries.employee_id`;
        connection.query(AdminQUERY, (err, results) => {
            if (err) {
                return res.send(err);
            }
            return res.json({
                data: results
            });
        });
    }else{
        res.send('You are not admin :)');
    }
})

app.post('/addEmployee', (req, res) => {
    const values = JSON.parse(JSON.stringify(req.body.data));
    let first_name, last_name, employee_id, department_id, hire_date, salary, to_date, title;
    values.forEach((k, el) => {
        first_name = k.first_name;
        last_name = k.last_name;
        employee_id = k.employee_id;
        department_id = k.department_id;
        hire_date = k.hire_date;
        salary = k.salary;
        to_date = k.to_date;
        title = k.title;
    });
    /*-------------SQL QUERIES----------------*/ 
    //#region SQL QUERIES
    const InsertQueryEmp = `INSERT INTO employees (first_name, last_name, employee_id, department_id, hire_date) VALUES ('${first_name}', '${last_name}', '${employee_id}', '${department_id}', '${hire_date}')`;
    const InsertQuerySal = `INSERT INTO salaries (employee_id, salary, from_date,to_date) VALUES ('${employee_id}', '${salary}', '${hire_date}', '${to_date}')`;
    const InsertQuerydept_emp = `INSERT INTO dept_emp (employee_id,department_id, from_date,to_date) VALUES ('${employee_id}','${department_id}', '${hire_date}', '${to_date}')`;
    const InsertQuerydept_manager = `INSERT INTO dept_manager (employee_id,department_id, from_date,to_date) VALUES ('${employee_id}','${department_id}', '${hire_date}', '${to_date}')`;
    const InsertQueryTitle = `INSERT INTO titles (employee_id,title) VALUES ('${employee_id}','${title}')`;
    /*-------------SQL QUERIES----------------*/

    const query = [InsertQueryEmp, InsertQuerySal, InsertQuerydept_emp, InsertQuerydept_manager, InsertQueryTitle];
    //#endregion
    query.forEach(async (el, i) => {
        connection.query(el, (err, results) => {
            if (err) {
                return res.send(err);
            }
            if (i === query.length - 1) {
                return res.json({
                    data: results
                });
            }
        });

    }
    )
});

app.get('/token', (req, res) => {
        return res.json({
            data: 'hdh82dhj2j9jd'
        });
})
app.get('/deleteEmployee', (req, res) => {
    //If we want to delete employee? we can do it by employee_id
})
app.listen(4000, () => {
    console.log('Server started at port 4000');
})