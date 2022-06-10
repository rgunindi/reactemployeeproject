import React, { Component } from 'react'
import DetailPage from './DetailPage';
import axios from 'axios';
export default class AccountPage extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      name: '',
      lastName: '',
      tc: '', //employee_id
      department: '', //dept_id
      hire_date: '',
      salary: '',
      title: '',
      from_date: '',
      to_date: '',
      allEmployees: [],
      isAdmin: props.isAdmin
    };
    this.getWorker = this.getWorker.bind(this);
  }

  componentDidMount() { this.getWorker();}
 
  getWorker = () => {
    if (!this.state.isAdmin) {
      this.state.tc = localStorage.getItem('employeTc').replace(/\"/g, "");
      this.state.department = localStorage.getItem('department').replace(/\"/g, "");
      axios.get('http://localhost:4000/workareas')
        .then((response) => response.data).then(response => { this.setState({ allEmployees: response.data }) })
        .catch(function (error) { console.log(error); })
    } else {
      axios.get(('http://localhost:4000/admins'), {
        token: localStorage.getItem('token')})
        .then((response) => response.data).then(response => { this.setState({ allEmployees: response.data }) })
        .catch(function (error) { console.log(error); })
    }
  }
  render() {
    var v;
    if (this.state.isAdmin) {
      v = this.state.allEmployees.map(worker => { return worker }).filter(worker => worker != null);
    } else {
      v = this.state.allEmployees.map(worker => { return (worker.department_id == this.state.department) ? worker : null }).filter(worker => worker != null);
    }
    return (
      <>
        {v.length > 0 ? <DetailPage data={v} isAdmin={this.state.isAdmin} /> : <div>No Data</div>}
      </>
    )
  }
}