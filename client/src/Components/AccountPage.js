import React, { Component } from "react";
import DetailPage from "./DetailPage";
import axios from "axios";
import Authorized from "./Utils/Authorized";

export default class AccountPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      lastName: "",
      tc: "", //employee_id
      department: "", //dept_id
      hire_date: "",
      salary: "",
      title: "",
      from_date: "",
      to_date: "",
      allEmployees: [],
      isAdmin: props.isAdmin
    };
    this.getWorker = this.getWorker.bind(this);
  }
  componentDidMount() {
    this.getWorker();
  }
  getWorker = () => {
    if (!this.state.isAdmin) {
      this.state.tc = localStorage.getItem("employeTc").replace(/\"/g, "");
      this.state.department = localStorage
        .getItem("department")
        .replace(/\"/g, "");
        const veri=Authorized(axios,"workareas",'GET');
        veri.then(result=>this.setState({ allEmployees: result }));
    } else {
      const veri=Authorized(axios,"admins",'GET');
        veri.then(result=>this.setState({ allEmployees: result }));
    }
  };
  render() {
    var v;
    if (this.state.isAdmin) {
      v =
        this.state.allEmployees &&
        this.state.allEmployees
          .map((worker) => {
            return worker;
          })
          .filter((worker) => worker != null);
    } else {
      v =
        this.state.allEmployees &&
        this.state.allEmployees
          .map((worker) => {
            return worker.department_id == this.state.department
              ? worker
              : null;
          })
          .filter((worker) => worker != null);
    }
    return (
      <>
        {v && v.length > 0 ? (
          <DetailPage data={v} isAdmin={this.state.isAdmin} />
        ) : (
          <div className="no-data">No Data</div>
        )}
      </>
    );
  }
}
