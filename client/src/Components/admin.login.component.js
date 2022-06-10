import React, { Component } from 'react'
import AccountPage from './AccountPage';
const hash = require('object-hash');
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      admin: '',
      password: '',
      adminPass: 'e329ecc28d8de4e7ed94ba5d0a3407c3',
      flag: false,
      isAdmin: false
    };
  }
  componentDidMount() {
    try {
      this.setState({
        isAdmin: localStorage.length > 0 ? localStorage.getItem('isAdmin').replace(/\"/g, "") ? true : false : false
      });
    }
    catch (err) { console.log(err) }

  }
  handleSubmit = (e) => {
    console.log(hash.MD5("P@ssword123"));
    e.preventDefault();
    const { admin, password } = this.state;
    if (!admin || !password) {
      this.setState({
        flag: true,
      });
    }
    else {
      const adminUsername = "root"; //admin username
      const pwd = this.state.adminPass; //admin pass
      if (admin === adminUsername && pwd === hash.MD5(password)) {
       /*"Admin Login SUCCESS */
        this.setState({
          isAdmin: true,
        });
        localStorage.setItem('isAdmin', true)
        window.location.replace("http://localhost:3000/");
      } else {
        this.setState({
          flag: true,
          isAdmin: false
        });
      }
    }
  }
  render() {
    return (
      <>
        {this.state.isAdmin ? (<AccountPage isAdmin={true} />) : (
          <form onSubmit={(e) => this.handleSubmit(e)}>
            <h3>Sign In</h3>
            <div className="mb-3">
              <label>Admin username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter administrator username"
                onChange={(e) => this.setState({ admin: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
                onChange={(e) => this.setState({ password: e.target.value })}
              />
            </div>
            <div className="mb-3">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Remember me
                </label>
              </div>
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
            <p className="forgot-password text-right">
              Forgot <a href="#">password?</a>
            </p>
          </form>)}
      </>
    )
  }
}