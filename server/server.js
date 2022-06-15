const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connection = require("./db");
const axios = require("axios");
const app = express();
app.use(cors());
app.use(bodyParser.json());
const token="hdh82dhj2j9jd";
const tokenVerify="1851sd818s8d8a12!@3#4";
let closeControl=false;
app.get("/workareas", (req, res) => {
  if (req.headers.token==token+tokenVerify) {   
    const GetQuery = `SELECT * FROM employees`;
    connection.query(GetQuery, (err, results) => {
      if (err) {
        return res.send(err);
      }
      return res.json({
        data: results,
      });
    });
  }else {res.send("Unauthorized Area")}
});

app.get("/firstDB", (req, res) => {
  if (closeControl) {    
    const GetQuery = `SELECT * FROM departments`;
    connection.query(GetQuery, (err, results) => {
      if (err) {
        return res.send(err);
      }
      return res.json({
        data: results,
      });
    });
  }else {res.send("Unauthorized Area");}
  closeControl=false;
});
app.get("/admins", (req, res) => {
  if (req.headers.token==token+tokenVerify) {   
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
        data: results,
      });
    });
  } else {
    res.send("You are not admin :)");
  }
});
var FIRSTDB = { data: null };
app.post("/addEmployee", (req, res) => {
  if (req.headers.token==token+tokenVerify) {   
  const values = req.body;
  let first_name,
    last_name,
    employee_id,
    department_id,
    hire_date,
    salary,
    to_date,
    title;
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

  //#region SQL QUERIES
  /*-------------SQL QUERIES----------------*/
  const InsertQueryEmp = `INSERT INTO employees (first_name, last_name, employee_id, department_id, hire_date) VALUES ('${first_name}', '${last_name}', '${employee_id}', '${department_id}', '${hire_date}')`;
  const InsertQuerySal = `INSERT INTO salaries (employee_id, salary, from_date,to_date) VALUES ('${employee_id}', '${salary}', '${hire_date}', '${to_date}')`;
  const InsertQuerydept_emp = `INSERT INTO dept_emp (employee_id,department_id, from_date,to_date) VALUES ('${employee_id}','${department_id}', '${hire_date}', '${to_date}')`;
  const InsertQuerydept_manager = `INSERT INTO dept_manager (employee_id,department_id, from_date,to_date) VALUES ('${employee_id}','${department_id}', '${hire_date}', '${to_date}')`;
  const InsertQueryTitle = `INSERT INTO titles (employee_id,title) VALUES ('${employee_id}','${title}')`;
  /*-------------SQL QUERIES----------------*/

  const queries = [
    InsertQueryEmp,
    InsertQuerySal,
    InsertQuerydept_emp,
    InsertQuerydept_manager,
    InsertQueryTitle,
  ];
  //#endregion
  getInfoFirstDb();
  setTimeout(() => {
    if (
      FIRSTDB.data === null ||
      FIRSTDB.data === undefined ||
      FIRSTDB.data === 0
    ) {
      firstDbCreate(queries, res);
    } else {
      executeQuery(queries, res);
    }
  }, 100);
}else {res.send("Unauthorized Area")}
});
function getInfoFirstDb() {
  closeControl=true;
  axios
    .get("http://localhost:4000/firstDB")
    .then((response) => response.data)
    .then((response) => {
      info(JSON.parse(JSON.stringify(response)).data.length);
    })
    .catch(function (error) {
      console.log(error);
    });
}
function info(x) {
  FIRSTDB.data = x;
}
function firstDbCreate(queries, res) {
  let errr,
    result = null;
  console.log("First Department Db Table Must have created");
  const GetQuery = `INSERT INTO departments (department_id,dept_no, dept_name) VALUES ('1','A', 'IT'),('2','B', 'Front End'),('3','C', 'Back End');`;
  connection.query(GetQuery, (err, results) => {
    if (err) {
      errr = err;
      return res.send(err);
    }
    result = results;
  });
  if (
    errr === null ||
    result !== null ||
    result !== undefined ||
    result !== 0
  ) {
    executeQuery(queries, res);
  }
}
function executeQuery(queries, res) {
  let count = 1;
  console.log(`execution!: Add data !`);

  queries.forEach(async (el, i) => {
   await execute(el, i); 
  });
  async function execute (query, i) {
    console.log(`execution!: '${i + 1}. query' !`);
     setTimeout(()=>{
       ++count;
      connection.query(query, (err, results) => {
        if (err) {
          return res.send(err);
        }
        if (i === queries.length - 1) {
          return res.json({
            data: results,
          });
        }
      })
  },count * 300);
  }
}

app.get("/token", (req, res) => {
  return res.json({
    data: token,
  });
});

app.get("/deleteEmployee", (req, res) => {
  //If we want to delete employee? we can do it by employee_id
});
app.listen(4000, () => {
  console.log("Server started at port 4000");
});
