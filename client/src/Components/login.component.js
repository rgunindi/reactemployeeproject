import React, { Component } from 'react'
import AccountPage from './AccountPage';
import axios from 'axios';
export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tc: '',
      password: '',
      flag: false,
      login: false,
      isAdmin: false
    };
  }
  componentDidMount() {
    try {
    this.setState({
        login: localStorage.length>0 ? localStorage.getItem('login').replace(/\"/g, "")?true:false : false
      });     
    }
    catch (err) {console.log(err)}  
    try {
      this.setState({
        isAdmin: localStorage.length > 0 ? localStorage.getItem('isAdmin').replace(/\"/g, "") ? true : false : false
      });
    }
    catch (err) { console.log(err) }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { tc, password } = this.state;
    if (!tc || !password) {
      this.setState({
        flag: true,
        login: false
      });
    }
    else {
      const employeTc = localStorage.getItem('employeTc').replace(/\"/g, "");
      const pwd = localStorage.getItem('password').replace(/\"/g, "");
      if (tc === employeTc && pwd === password) {
        this.setState({
          login: true,
        });
        localStorage.setItem('login', true)
       // window.location.reload();
        window.location.replace("http://localhost:3000/");
      }else {
        this.setState({
          flag: true,
          login: false
        });
      }
    }
  }
  render() {
    return (
      <>
        {this.state.isAdmin?(<AccountPage isAdmin={true} />) : (
      this.state.login ? (<AccountPage/>):(
      <form>
        <h3>Sign In</h3>
        <div className="mb-3">
          <label>User Employe Id</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Id"
            onChange={(e) => this.setState({tc:e.target.value})}
          />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => this.setState({password:e.target.value})}
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
          {/* <button type="submit" className="btn btn-primary"
          onClick={(e)=>this.handleSubmit(e)}>
            Submit
          </button> */}
          <a href="/" className="btn btn-primary"
                onClick={(e) => this.handleSubmit(e)}>Sign In</a>
        </div>
        <p className="forgot-password text-right">
          Forgot <a href="#">password?</a>
        </p>
        {this.state.flag &&(
          <div className="alert alert-warning" role="alert">
            EmployeId or Password is wrong
          </div>
        )}
      </form> ))}
      </>
    )
  }
}