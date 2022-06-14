import React,{useEffect} from 'react';
import axios from 'axios';

export default function AddEmployee() {
    const [employee_id, setEmployee_id] = React.useState('');
    const [first_name, setFirstName] = React.useState("");
    const [last_name, setLastName] = React.useState("");
    const [salary, setSalary] = React.useState("");
    const [department_id, setDepartment_id] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [hire_date, setHire_date] = React.useState("");
    const [to_date, setTo_date] = React.useState("");
    const [employeeData, setEmployeeData] = React.useState([]);
    function handleClick(event) {
        if (employee_id && first_name && last_name && salary && title && department_id && hire_date) {
            event.preventDefault();
            var d = new Date();
            const day = d.getDate() < 9 ? 0 + d.getDate().toString() : d.getDate();
            const month = d.getMonth() < 9 ? 0 + (d.getMonth() + 1).toString() : d.getMonth() + 1;
            const year = d.getFullYear();
            const date = `${year}-${month}-${day}`;
            setTo_date(date);
            setEmployeeData(() => [{ employee_id, first_name, last_name, salary, title, department_id, hire_date, to_date }]);
            addEmp();
            freeState();
        }
        else { alert("Please fill all the fields"); }
    }
    useEffect(() => { addEmp();}, [employeeData]);
    function freeState() {
        setTimeout(() => { 
            setEmployee_id(""); setFirstName(""); setLastName(""); setSalary(""); setTitle(""); setDepartment_id(""); setHire_date(""); setTo_date("");
        }, 1500);
    }
    function addEmp() {
        setTimeout(() => { 
        if (employeeData.length > 0) {
            const options = {
                url: 'http://localhost:4000/addEmployee',
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json;charset=UTF-8'
                  },
                data: employeeData
              };
              axios(options)
                .then(response => {
                  console.log(response.status);
                });
            setEmployeeData(() => []);
        }}, 1000);
    }
    return (
        <>
            <div className="auto-inner-table">
                <table id="my_table_1" data-toggle="table" data-sort-stable="true">
                    <thead>
                        <tr>
                            <th data-sortable="true">Employe Id</th>
                            <th data-sortable="true">First Name</th>
                            <th data-sortable="true">Last Name</th>
                            <th data-sortable="true">Salary $</th>
                            <th data-sortable="true">Title</th>
                            <th data-sortable="true">Hire Date</th>
                            <th data-sortable="true">Department</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><input type="number" value={employee_id}
                                onChange={(e) => setEmployee_id(e.target.value)} /></td>

                            <td><input type="text" value={first_name}
                                onChange={(e) => setFirstName(e.target.value)} /></td>
                            <td><input type="text" value={last_name}
                                onChange={(e) => setLastName(e.target.value)} /></td>

                            <td><input type="number" value={salary}
                                onChange={(e) => setSalary(e.target.value)} /></td>
                            <td><input type="text" value={title}
                                onChange={(e) => setTitle(e.target.value)} /></td>
                            <td><input type="date" data-date-inline-picker="true"
                                value={hire_date}
                                onChange={(e) => setHire_date(e.target.value)} /></td>
                            <td><select
                                className="form-control" id="sel1"
                                value={department_id}
                                onChange={(e) => setDepartment_id(e.target.value)} >
                                <option value={null}>-------</option>
                                <option value="1">IT</option>
                                <option value="2">Front-End</option>
                                <option value="3">Back-End</option>
                            </select>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <input type="submit" className="btn btn-primary" onClick={(e) => { handleClick(e) }} value="Add Employee" />
            </div>
        </>
    )
}
